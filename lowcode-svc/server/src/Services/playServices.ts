import { Code } from '@/code';
import { broadcast } from '@/WebSocket';
import { actions } from '@/types/play';
import { getManager } from 'typeorm';
import Slide from '@/entity/slide';
import Session from '@/entity/session';

export default class PlayServices {
  public static async startPlay(id: string, currentPage = 0) {
    const slide = await getManager()
      .getRepository(Slide)
      .createQueryBuilder('slide')
      .leftJoinAndSelect('slide.session', 'session')
      .where('slide.id = :id', { id })
      .addSelect('slide.content')
      .getOne();

    if (!slide) {
      return {
        code: Code.SLIDE_NOT_FOUND,
        message: '幻灯片不存在'
      };
    }

    // 如果幻灯片已经在放映，返回现有的 sessionId
    if (slide.isOnPlay) {
      return {
        code: Code.PLAY_ALREADY_STARTED,
        message: '放映不得重复开启'
      };
    }

    // 如果幻灯片不在放映，创建新的 session
    slide.isOnPlay = true;
    const session = Object.assign(new Session(), {
      slide,
      currentPage
    });
    await getManager().getRepository(Session).save(session);
    return {
      code: Code.SUCCESS,
      message: '已开启放映',
      data: {
        sessionId: session.sessionId,
        slide
      }
    };
  }

  public static async joinPlay(id: string) {
    const session = await getManager()
      .getRepository(Session)
      .createQueryBuilder('session')
      .where('session.slide.id = :id', { id })
      .getOne();

    if (!session) {
      return {
        code: Code.SESSION_EXPIRED,
        message: '会话已过期'
      };
    }

    const slide = await getManager()
      .getRepository(Slide)
      .createQueryBuilder('slide')
      .where('slide.id = :id', { id })
      .addSelect('slide.content')
      .getOne();

    return {
      code: Code.SUCCESS,
      message: '已加入放映',
      data: {
        sessionId: session.sessionId,
        currentPage: session.currentPage,
        slide
      }
    };
  }

  public static async control(
    sessionId: string,
    action: actions,
    payload?: number
  ) {
    const SessionRepository = getManager().getRepository(Session);
    const session = await SessionRepository.createQueryBuilder('session')
      .leftJoinAndSelect('session.slide', 'slide')
      .where('session.sessionId = :sessionId', { sessionId })
      .getOne();

    if (!session) {
      return {
        code: Code.SESSION_EXPIRED,
        message: '会话已过期'
      };
    }

    const slide = await getManager()
      .getRepository(Slide)
      .createQueryBuilder('slide')
      .where('slide.id = :id', { id: session.slide.id })
      .addSelect('slide.content')
      .getOne();

    switch (action) {
      case 'NEXT':
        if (session.currentPage < slide.content.length - 1) {
          session.currentPage += 1;
          await SessionRepository.save(session);
          broadcast<{ action: actions; currentPage: number }>(
            { action, currentPage: session.currentPage },
            sessionId
          );
          return {
            code: Code.SUCCESS,
            message: '已切换到下一页'
          };
        }
        return {
          code: Code.PAGE_OUT_OF_RANGE,
          message: '已经是最后一页'
        };
      case 'PREV':
        if (session.currentPage > 0) {
          session.currentPage -= 1;
          await SessionRepository.save(session);
          broadcast<{ action: actions; currentPage: number }>(
            { action, currentPage: session.currentPage },
            sessionId
          );
          return {
            code: Code.SUCCESS,
            message: '已切换到上一页'
          };
        }
        return {
          code: Code.PAGE_OUT_OF_RANGE,
          message: '已经是第一页'
        };
      case 'GOTO':
        if (
          payload !== undefined &&
          payload >= 0 &&
          payload < slide.content.length
        ) {
          session.currentPage = payload;
          await SessionRepository.save(session);
          broadcast<{ action: actions; currentPage: number }>(
            { action, currentPage: session.currentPage },
            sessionId
          );
          return {
            code: Code.SUCCESS,
            message: `已切换到第 ${payload} 页`
          };
        }
        return {
          code: Code.PAGE_OUT_OF_RANGE,
          message: '页码超出范围'
        };
      default:
        return {
          code: Code.ACTION_INVALID,
          message: '无效的操作'
        };
    }
  }

  public static async stopPlay(id: string) {
    const sessionRepository = getManager().getRepository(Session);
    const session = await sessionRepository
      .createQueryBuilder('session')
      .where('session.slide.id = :id', { id })
      .getOne();

    if (!session) {
      return {
        code: Code.SESSION_EXPIRED,
        message: '会话已过期'
      };
    }
    const slideRepository = getManager().getRepository(Slide);
    const slide = await slideRepository.findOne(id);
    slide.isOnPlay = false;
    await slideRepository.save(slide);
    await sessionRepository.remove(session);

    return {
      code: Code.SUCCESS,
      message: '已结束放映'
    };
  }
}
