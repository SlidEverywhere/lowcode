import config from './hostConfig'
import axios from 'axios'
import {RequestConfig} from '@/types/request'
export class request {
    private config
    constructor (command :RequestConfig){
        this.config = {...config,...command}
    }
    public createRequest(){
        const service =  axios.create({
            baseURL:`${this.config.http}://${this.config.host}:${this.config.port}/${this.config.path}/`,
            timeout:1000*6,
            headers:{}
        })
        // 请求拦截器
        service.interceptors.request.use(
            (config)=>{
                // 通行
                return config;
            },
            error=>{
                return Promise.reject(error)
            });
        service.interceptors.response.use(
            response =>{

                // 返回响应
                return response;
            },
            error=>{
                // 可加入一个弹出框 服务端异常
                return Promise.reject(error);
            }
        )
    }
}