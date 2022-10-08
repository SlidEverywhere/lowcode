if (process.env.NODE_ENV !== 'dev') require('module-alias/register');
import path from 'path';
import dotenv from 'dotenv';
import Koa from 'koa';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import { createConnection } from 'typeorm';
import jwt from 'koa-jwt';
import 'reflect-metadata';
import { protectedRouter, unprotectedRouter } from '@/router';
import logger from '@/MiddleWare/logger';
import errorHandler from '@/MiddleWare/errorHandler';
import PlayServices from '@/Services/playServices';

dotenv.config({ path: '.env' });

createConnection()
  .then(async () => {
    await PlayServices.stopAll();
  })
  .then(() => {
    new Koa()
      .use(errorHandler)
      .use(logger())
      .use(
        cors({
          origin: ctx => {
            //设置允许来自指定域名请求
            const whiteList = [
              'http://localhost:3000',
              'https://slideverywhere.xav1er.com',
              'https://slideverywhere-play.xav1er.com'
            ];
            const origin = ctx.header.referer.match(
              /https?:\/\/[\w,\.,\:]+\//
            )[0];
            const url = origin.substring(0, origin.length - 1);
            return whiteList.includes(url) ? url : 'http://localhost:3000';
          },
          credentials: true
        })
      )
      .use(koaStatic(path.resolve(__dirname, '../../public')))
      .use(
        koaBody({
          multipart: true,
          formidable: {
            uploadDir: path.resolve(__dirname, '../../public/uploads'),
            keepExtensions: true
          }
        })
      )
      .use(unprotectedRouter.routes())
      .use(jwt({ secret: process.env.SECRET }).unless({ path: [/\..+$/] }))
      .use(protectedRouter.routes())
      .listen(8002, () => {
        console.log('Koa server is running at http://localhost:8002/');
      });
  })
  .catch((err: string) => console.log('TypeORM connection error:', err));
