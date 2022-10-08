import { request } from './config';

// 新增PPT
export const addPPT = (data: any) => {
  return request.post('/slide/add', data);
};

// 获取单个PPT
export const getPPT = (id: any) => {
  return request.get(`/slide/${id}`);
};
