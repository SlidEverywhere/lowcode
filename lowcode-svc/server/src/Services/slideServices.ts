import { getManager } from 'typeorm';
import Slide from '@/entity/slide';
import { Code } from '../code';
import { ISlideInfo } from '@/types/slide';
import User from '@/entity/user';

export default class SlideServices {
  public static async getSlideList(uid: string) {
    const SlideRepository = getManager().getRepository(Slide);
    const slides = await SlideRepository.createQueryBuilder()
      .where({ user: uid })
      .getMany();

    return {
      code: Code.SUCCESS,
      message: '拉取成功',
      data: {
        slides
      }
    };
  }

  public static async getSlide(id: string) {
    const SlideRepository = getManager().getRepository(Slide);
    const slide = await SlideRepository.createQueryBuilder('slide')
      .where('slide.id = :id', { id })
      .addSelect('slide.content')
      .getOne();

    if (slide) {
      return {
        code: Code.SUCCESS,
        message: '拉取成功',
        data: {
          slide
        }
      };
    }
    return {
      code: Code.SLIDE_NOT_FOUND,
      message: '未找到该幻灯片'
    };
  }

  public static async addNewSlide(slideInfo: ISlideInfo, uid: string) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({ uid });
    const SlideRepository = getManager().getRepository(Slide);
    const newSlide = Object.assign(new Slide(), {
      name: slideInfo.name,
      content: slideInfo.content,
      cover: slideInfo.content[0].image || '',
      user
    });
    const slide = await SlideRepository.save(newSlide);
    delete slide.user;
    return {
      code: Code.SUCCESS,
      message: '添加成功',
      data: {
        slide: newSlide
      }
    };
  }

  public static async deleteSlide(id: string) {
    const SlideRepository = getManager().getRepository(Slide);
    const slide = await SlideRepository.findOne({ id });
    if (slide) {
      await SlideRepository.remove(slide);
      return {
        code: Code.SUCCESS,
        message: '删除成功'
      };
    }
    return {
      code: Code.SLIDE_NOT_FOUND,
      message: '未找到该幻灯片'
    };
  }

  public static async updateSlide(id: string, slideInfo: ISlideInfo) {
    const SlideRepository = getManager().getRepository(Slide);
    const slide = await SlideRepository.createQueryBuilder('slide')
      .where('slide.id = :id', { id })
      .addSelect('slide.content')
      .getOne();

    if (slide) {
      Object.assign(slide, {
        cover: slideInfo.content[0].image || '',
        name: slideInfo.name,
        content: slideInfo.content
      });
      await SlideRepository.save(slide);
      return {
        code: Code.SUCCESS,
        message: '更新成功',
        data: {
          slide
        }
      };
    }

    return {
      code: Code.SLIDE_NOT_FOUND,
      message: '未找到该幻灯片'
    };
  }

  public static async publishSlide(id: string, uid: string, status: boolean) {
    const SlideRepository = getManager().getRepository(Slide);
    const slide = await SlideRepository.findOne({ id });
    if (slide) {
      if (slide.user.uid !== uid) {
        return {
          code: Code.PERMISSION_DENIED,
          message: '权限不足'
        };
      }
      Object.assign(slide, {
        isPublished: status
      });
      return {
        code: Code.SUCCESS,
        message: '设置成功'
      };
    }
    return {
      code: Code.SLIDE_NOT_FOUND,
      message: '未找到该幻灯片'
    };
  }
}
