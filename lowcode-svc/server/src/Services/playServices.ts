import { Code } from '@/code';
import { broadcast } from '@/WebSocket';
import { v4 as uuidv4 } from 'uuid';
import { actions } from '@/types/play';
import { getManager } from 'typeorm';
import Slide from '@/entity/slide';
import { findKey } from '@/utils/play';
export default class PlayServices {
  public static SessionMap = new Map<string, string>();

  public static async startPlay(id: string, currentPage = 0) {
    const SlideRepository = getManager().getRepository(Slide);
    const slide = await SlideRepository.createQueryBuilder()
      .where({ id })
      .getOne();
    if (slide) {
      if (slide.isOnPlay) PlayServices.SessionMap.delete(id);
      const sessionId = uuidv4();
      PlayServices.SessionMap.set(id, sessionId);
      slide.isOnPlay = true;
      slide.currentPage = currentPage;
      await SlideRepository.save(slide);
      return {
        code: Code.SUCCESS,
        message: '已开启放映',
        data: {
          sessionId,
          slide
        }
      };
    }
    return {
      code: Code.SLIDE_NOT_FOUND,
      message: '幻灯片不存在'
    };
  }

  public static async joinPlay(id: string) {
    const SlideRepository = getManager().getRepository(Slide);
    const slide = await SlideRepository.createQueryBuilder()
      .where({ id })
      .getOne();
    if (!slide) {
      return {
        code: Code.SLIDE_NOT_FOUND,
        message: '幻灯片不存在'
      };
    }
    if (!slide.isOnPlay) {
      return {
        code: Code.PLAY_NOT_FOUND,
        message: '未开启放映'
      };
    }
    const sessionId = PlayServices.SessionMap.get(id);
    if (sessionId) {
      return {
        code: Code.SUCCESS,
        message: '已加入放映',
        data: {
          sessionId,
          slide
        }
      };
    }
    return {
      code: Code.PLAY_NOT_FOUND,
      message: '会话已销毁'
    };
  }

  public static async control(
    sessionId: string,
    action: actions,
    payload?: number
  ) {
    const id = findKey(PlayServices.SessionMap, sessionId);
    if (!id) {
      return {
        code: Code.SESSION_EXPIRED,
        message: '会话已过期'
      };
    }
    const SlideRepository = getManager().getRepository(Slide);
    const slide = await SlideRepository.createQueryBuilder()
      .where({ id })
      .getOne();
    if (!slide) {
      return {
        code: Code.SLIDE_NOT_FOUND,
        message: '幻灯片不存在'
      };
    }
    if (!slide.isOnPlay) {
      return {
        code: Code.PLAY_NOT_FOUND,
        message: '未开启放映'
      };
    }
    if (action === 'NEXT') slide.currentPage += 1;
    if (action === 'PREV') slide.currentPage -= 1;
    if (action === 'GOTO') {
      if (payload) slide.currentPage = payload;
    }
    await SlideRepository.save(slide);
    broadcast<{ action: actions; currentPage: number }>(
      { action, currentPage: slide.currentPage },
      sessionId
    );
    return {
      code: Code.SUCCESS,
      message: '已发送指令'
    };
  }

  public static async stopPlay(id: string) {
    const SlideRepository = getManager().getRepository(Slide);
    const slide = await SlideRepository.createQueryBuilder()
      .where({ id })
      .getOne();
    if (!slide) {
      return {
        code: Code.SLIDE_NOT_FOUND,
        message: '幻灯片不存在'
      };
    }
    const sessionId = PlayServices.SessionMap.get(id);
    if (sessionId) {
      broadcast<{ action: actions }>({ action: 'STOP' }, sessionId);
      PlayServices.SessionMap.delete(id);
      slide.isOnPlay = false;
      await SlideRepository.save(slide);
      return {
        code: Code.SUCCESS,
        message: '已关闭放映'
      };
    }
    return {
      code: Code.PLAY_NOT_FOUND,
      message: '未开启放映'
    };
  }
}
