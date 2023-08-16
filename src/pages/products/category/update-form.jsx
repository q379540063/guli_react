import React, { Component } from 'react'
import {
    Form,
    Input,
    Select,
} from 'antd';
const { Option } = Select;

export default class AddForm extends Component {
    form = React.createRef();
    componentDidUpdate(){
        this.form.current.resetFields();
    }
    render() {
        return (
            <Form
                style={{
                    maxWidth: 600,
                }}
                initialValues={{categoryName:this.props.categoryName}}
                scrollToFirstError
                ref={this.form}
            >
                <Form.Item
                    name="categoryName"
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
