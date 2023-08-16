//返回promise
import axios from "axios"
import { message } from 'antd';
const HOST = ""
// 统一处理错误
export default function ajax(url,data = {},type="GET"){
    console.log(url,data);
    return new Promise((resolve,reject)=>{
        let promise;
        if(type === 'GET'){
            promise = axios.get(HOST + url,{params:data})
        }else{
            promise = axios.post(HOST + url,data)
        }
        promise.then(v=>{
            resolve(v.data);
        }).catch(e=>{
            // reject(e);
            message.error(e.message);
        })
    })
}