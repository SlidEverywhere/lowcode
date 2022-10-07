import { Context } from 'koa';
import PlayServices from '@/Services/playServices';

export default class playController {
  public static async startPlay(ctx: Context) {
    const data = ctx.request.body;
    const uid = ctx.state.user.uid;
    const result = await PlayServices.startPlay(data, uid);
    ctx.body = result;
  }
}
