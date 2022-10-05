import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';
import User from '@/entity/user';
import { compare, encrypt } from '@/utils/crypto';
import { Code } from '../code';

export default class AuthServices {
  public static async login(username: string, password: string) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository
      .createQueryBuilder()
      .where({ username })
      .addSelect('User.password')
      .getOne();
    // 如果没有查询到对应用户
    if (!user) return { code: Code.USER_NOT_FOUND, message: '用户名不存在' };
    // 密码正确，签发token
    else if (compare(password, user.password))
      return {
        code: Code.SUCCESS,
        message: '登录成功',
        data: { token: jwt.sign({ uid: user.uid }, process.env.SECRET) }
      };
    // 密码错误，拒绝登录
    else return { code: Code.PASSWORD_ERROR, message: '密码错误' };
  }

  public static async register(username: string, password: string) {
    const userRepository = getManager().getRepository(User);
    const userInside = await userRepository
      .createQueryBuilder()
      .where({ username })
      .getOne();
    if (userInside)
      return { code: Code.USER_ALREADY_EXIST, message: '当前用户名已被注册' };
    const newUser = Object.assign(new User(), {
      username,
      password: encrypt(password),
      nickname: '新用户' + username,
      avatar:
        'http://slideverywhere-api.xav1er.com/uploads/867dcacd1c968baed759d3e00.JPG'
    });
    // 保存到数据库
    const user = await userRepository.save(newUser);
    return {
      code: Code.SUCCESS,
      message: '注册成功',
      data: { token: jwt.sign({ uid: user.uid }, process.env.SECRET) }
    };
  }

  public static async tokenValidate(uid: string) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(uid);
    // 查询到user
    if (user)
      return {
        code: Code.SUCCESS,
        message: 'token合法',
        data: { user }
      };
    // 查询不到user
    else
      return {
        code: Code.TOKEN_INVALID,
        message: 'token不合法或持有者已注销'
      };
  }
}
