import Router from '@koa/router';

import UserController from '../Controller/userController';

const userRoutes = new Router()
  .get('/', UserController.getUserInfo)
  .put('/update', UserController.updateUserInfo);

export { userRoutes };
