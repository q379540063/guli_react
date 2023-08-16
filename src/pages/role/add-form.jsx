import React, { Component } from 'react'
import {
    Form,
    Input,
} from 'antd';

export default class AddForm extends Component {
    form = React.createRef();
    componentDidUpdate(){
        this.form.current.resetFields();
    }
    render() {
        return (
            <Form
                style={{maxWidth: 600}}
                ref={this.form}
            >
                <Form.Item
                    name="roleName"
                    label="名称"
                    rules={[
                        {
                            required: true,
                            message: '请输入分类名称',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        )
    }
}
