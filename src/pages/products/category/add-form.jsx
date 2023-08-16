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
                initialValues={{parentId:this.props.parentId}}
                scrollToFirstError
                ref={this.form}
            >
                <Form.Item
                    name="parentId"
                    label="分类"
                    rules={[
                        {
                            required: true,
                            message: '请选择分类',
                        },
                    ]}
                >
                    <Select>
                        <Option value="0">一级分类</Option>
                        {this.props.categoryList.map(e=>{
                            return (<Option key={e._id} value={e._id}>{e.name}</Option>)
                        })}
                    </Select>
                </Form.Item>
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
