import Router from '@koa/router';
import playController from '../Controller/playController';

export const playRoutes = new Router().post('/', playController.startPlay);
