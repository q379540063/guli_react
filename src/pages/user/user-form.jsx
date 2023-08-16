import React, { Component } from 'react'
import {
    Form,
    Input,
    Select,
} from 'antd';
const { Option } = Select;

export default class UserForm extends Component {
    form = React.createRef();
    componentDidUpdate(){
        this.form.current.resetFields();
    }
    render() {
        const formItemLaout ={
            labelCol:{span:3},
        }
        const {roles,curUser} = this.props;
        return (
            <Form
                style={{
                    maxWidth: 600,
                }}
                initialValues={{...curUser}}
                scrollToFirstError
                ref={this.form}
                {...formItemLaout}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                >
                    <Input />
                </Form.Item>

                {curUser._id ?null :(<Form.Item
                    name="password"
                    label="密码"
                >
                    <Input />
                </Form.Item>)}

                <Form.Item
                    name="phone"
                    label="手机号"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="邮箱"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="role_id"
                    label="角色"
                >
                    <Select placeholder="请选择角色" >
                        {roles.map(e=>{
                            return <Option key = {e._id} value={e._id}>{e.name}</Option>
                        })}
                        
                    </Select>
                </Form.Item>
                
            </Form>
        )
    }
}
