import Router from '@koa/router';
import playController from '@/Controller/playController';

export const playRoutes = new Router()
  .post('/start/:id', playController.startPlay)
  .post('/join/:id', playController.joinPlay)
  .post('/control/:sessionId', playController.control)
  .post('/stop/:id', playController.stopPlay);
