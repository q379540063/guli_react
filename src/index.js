import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import { ConfigProvider } from 'antd';
import { BrowserRouter} from "react-router-dom";
import storageUtils from "./util/storageUtils";
import memeoryUtils from "./util/memeoryUtils";
memeoryUtils.user = storageUtils.getUser();
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ConfigProvider theme={{ token: { colorPrimary: '#1DA57A' } }}>
            <App/>
        </ConfigProvider>
     </BrowserRouter>
    )


    /*
    jsonp解决 ajax跨域问题
    只能 解决 get请求
    本质不是 ajax请求，是普通get请求
    jsonp 通过 浏览器端动态生成 <script> 标签发送的请求 src就是接口的url
    定义好 用于接受相应数据的函数，并将函数名通过 请求参数提交给后台 如  callback=fn callback=__jp0
    服务器
     接收到请求处理产生结果数据后，返回一个函数调用的js代码，并将结果数据作为实参 传入函数调用
    浏览器端
        收到相应自动执行函数调用的js代码，也就是执行了提前定义好的回调函数，并得到了需要的结果数据
    script 是请求js代码的
    浏览器准备一个 处理相应的函数  callback=__jp0
    服务器返回 一段js代码 __jp0()  方法内部是要接受的json数据

    */