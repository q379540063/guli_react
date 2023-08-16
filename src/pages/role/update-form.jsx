import React, { Component } from 'react'
import {
    Form,
    Input,
    Tree
} from 'antd';
import menuConfig from '../../config/menuConfig';
const treeData =  menuConfig.map(e=>{
    const obj = {title:e.label,key:e.key}
    if(e.children){
        obj.children = e.children.map(e2=>{
            const obj2 = {title:e2.label,key:e2.key}
            return obj2;
        })
    }
    return obj;
})
export default class AddForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkedKeys:props.role.menus,
        }
    }
    getCheckedKeys = ()=>{
        return this.state.checkedKeys;
    }
    componentDidUpdate(){
        console.log('componentDidUpdate')
    }
    componentWillReceiveProps(nextProps){
        this.state.checkedKeys = nextProps.role.menus;
    }
    onCheck = (checkedKeys)=>{
        this.setState({checkedKeys:[...checkedKeys]});
    }
    render() {
        const {checkedKeys} = this.state;
        return (
            <Form
                style={{maxWidth: 600}}
            >
                <Form.Item
                    label="名称"
                >
                    <Input value={this.props.role.name} disabled/>
                </Form.Item>
                <Tree
                    checkable
                    onCheck={this.onCheck}
                    defaultExpandAll={true}
                    treeData={treeData}
                    checkedKeys={checkedKeys}
                    />
            </Form>
        )
    }
}
