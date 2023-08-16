import React, { Component } from 'react'
import './login.less'
import login from '../../assets/images/logo.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../api';
import memeoryUtils from '../../util/memeoryUtils';
import storageUtils from '../../util/storageUtils';
export default class Login extends Component {
  
  onFinish = async (form)=>{
      const result = await reqLogin(form);
      if(result.status === 0){//登陆成功
        message.success('登陆成功');
        const user = result.data;
        memeoryUtils.user = user;
        storageUtils.saveUser(user);
        this.props.history.replace('/')
      }else{//登陆成功
        message.error(result.msg);
      }
  }
  render() {
    const user = memeoryUtils.user;
    if(user._id){
      return <Redirect to='/'></Redirect>
    }
    return (
        <div className='login'>
            <header className='login_header'>
              <img src={login} alt="logo" />
                <h1>React项目:后台管理系统</h1>
            </header>
            <section className='login_content'>
                <h2>用户登陆</h2>
                <div>
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ username: 'admin' }}
                  onFinish={this.onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' },
                    {max:12, message:"用户名最多12位"},
                    {min:2, message:"用户名最少2位"},
                    {pattern:/^[a-zA-Z0-9_]+/,message:"用户名必须为英文、数字、下划线"}
                  ]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" style={{color:'rgba(0,0,0,.25)'}}/>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" style={{color:'rgba(0,0,0,.25)'}}/>}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      登陆
                    </Button>
                  </Form.Item>
                </Form>
                </div>
            </section>
        </div>
    )
  }
}
/*
高阶函数
  入参或者返回值为 函数
高阶组件
  本质是一个函数
  接受一个被包装的组件，返回一个新的组件，被包装组件会接收到传入的特定属性
  作用，扩展组件的功能
  高阶组件也是高阶函数，接受一个组件函数，返回一个新的组件函数
*/ 
