import { getManager } from 'typeorm';
import User from '@/entity/user';
import { Code } from '../code';
import send from '../WebSocket';

export default class PlayServices {
  public static async startPlay(data: Object, uid: string) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(uid);
    send({
      type: 'startPlay',
      data,
      user
    });
    return {
      code: Code.SUCCESS,
      message: '已开启放映'
    };
  }
}
