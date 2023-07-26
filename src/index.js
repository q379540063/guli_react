import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import { ConfigProvider } from 'antd';
import { BrowserRouter} from "react-router-dom";
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ConfigProvider theme={{ token: { colorPrimary: '#1DA57A' } }}>
            <App/>
        </ConfigProvider>
     </BrowserRouter>
    )
