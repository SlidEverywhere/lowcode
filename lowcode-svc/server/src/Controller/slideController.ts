import SlideServices from '@/Services/slideServices';
import { Context } from 'koa';

export default class SlideController {
  public static async getSlideList(ctx: Context) {
    const result = await SlideServices.getSlideList(ctx.state.user.uid);
    ctx.body = result;
  }

  public static async getSlide(ctx: Context) {
    const id = ctx.params.id;
    const result = await SlideServices.getSlide(id);
    ctx.body = result;
  }

  public static async addNewSlide(ctx: Context) {
    const uid = ctx.state.user.uid;
    const slideInfo = ctx.request.body;
    const result = await SlideServices.addNewSlide(slideInfo, uid);
    ctx.body = result;
  }

  public static async deleteSlide(ctx: Context) {
    const id = ctx.params.id;
    const result = await SlideServices.deleteSlide(id);
    ctx.body = result;
  }

  public static async updateSlide(ctx: Context) {
    const id = ctx.params.id;
    const slideInfo = ctx.request.body;
    const uid = ctx.state.user.uid;
    const result = await SlideServices.updateSlide(id, slideInfo, uid);
    ctx.body = result;
  }

  public static async publishSlide(ctx: Context) {
    const id = ctx.params.id;
    const uid = ctx.state.user.uid;
    const status = ctx.request.body.status;
    const result = await SlideServices.publishSlide(id, uid, status);
    ctx.body = result;
  }
}
