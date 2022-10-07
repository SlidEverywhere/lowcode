import Router from '@koa/router';
import SlideController from '../Controller/slideController';

export const slideRoutes = new Router()
  .get('/list', SlideController.getSlideList)
  .get('/:id', SlideController.getSlide)
  .post('/add', SlideController.addNewSlide)
  .delete('/delete/:id', SlideController.deleteSlide)
  .put('/update/:id', SlideController.updateSlide)
  .post('/publish/:id', SlideController.publishSlide);

export const publishedRoutes = new Router().get(
  '/published/:id',
  SlideController.getSlide
);
