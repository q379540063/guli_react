import React, { Component } from 'react'
import {Card,Button,Table,Modal, message} from 'antd'
import LinkButton from '../../components/link-button';
import {reqUserList,reqAddOrUpdateUser,reqDelUser} from '../../api'
import {PAGE_SIZE} from '../../util/constant'
import { formateDate } from '../../util/dateUtil';
import UserForm from './user-form';
export default class User extends Component {
  userModal = React.createRef();
  state = {
    users:[],
    modalOpen:false,
    roles:[],
    curUser:{}
  }
  roleObj = {}
  UNSAFE_componentWillMount(){
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render:formateDate,
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render:(id)=>{
          console.log(this.roleObj,id);
          return this.roleObj[id];
        }
      },
      {
        title: '操作',
        width:200,
        render: (role)=>{
          return (
            <span>
              <LinkButton onClick={()=>{this.updateUser(role)}}>修改</LinkButton>
              <LinkButton onClick={()=>{this.deleteUser(role)}}>删除</LinkButton>
            </span>
          )
        }
      }
    ];
  }

  componentDidMount (){
    this.getUserList();
  }
  getUserList = async()=>{
    const data = await reqUserList()
    if(data.status == 0){
      const {roles,users} = data.data;
      this.roleObj = roles.reduce((pre,obj)=>{
        pre[obj._id] = obj.name;
        return pre;
      },{})
      this.setState({
        users,
        roles,
      })
    }
  }
  updateUser = (role)=>{
    this.setState({
      curUser:role,
      modalOpen:true,
    })
  }
  deleteUser = async(role)=>{
    const data = await reqDelUser(role._id);
    if(data.status == 0){
      this.getUserList();
      message.success('删除成功')
    }
  }
  endEdit = async()=>{
    const values = this.userModal.current.form.current.getFieldsValue(true);
    const data = await reqAddOrUpdateUser(values);
    if(data.status == 0){
      this.getUserList();
      this.setState({modalOpen:false})
      message.success('新增成功')
    }
  }
  render() {
    const {curUser,roles,modalOpen,users} = this.state;
    const title = (
      <span>
        <Button type='primary' onClick={()=>{this.setState({modalOpen:true,curUser:{}})}}>创建用户</Button>
      </span>);

    return (
      <Card title={title}>
        <Table 
          dataSource={users} 
          bordered 
          columns={this.columns} 
          rowKey='_id'
          pagination = {
            {
              defaultPageSize:PAGE_SIZE
            }
          }
          />
        <Modal title={curUser._id ? "编辑用户":"新增用户"} open={modalOpen} onOk={this.endEdit} onCancel={()=>{this.setState({modalOpen:false})}}>
          <UserForm ref={this.userModal} roles={roles || []} curUser = {curUser}/>
        </Modal>
      </Card>
    )
  }
}
