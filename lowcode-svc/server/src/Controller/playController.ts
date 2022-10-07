import { Context } from 'koa';
import PlayServices from '@/Services/playServices';

export default class playController {
  public static async startPlay(ctx: Context) {
    const id = ctx.params.id;
    const result = await PlayServices.startPlay(id);
    ctx.body = result;
  }

  public static async joinPlay(ctx: Context) {
    const id = ctx.params.id;
    const result = await PlayServices.joinPlay(id);
    ctx.body = result;
  }

  public static async control(ctx: Context) {
    const sessionId = ctx.params.sessionId;
    const { action } = ctx.request.body;
    const result = await PlayServices.control(sessionId, action);
    ctx.body = result;
  }

  public static async stopPlay(ctx: Context) {
    const id = ctx.params.id;
    const result = await PlayServices.stopPlay(id);
    ctx.body = result;
  }
}
