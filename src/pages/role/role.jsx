import React, { Component } from 'react'
import {Card,Table,Modal,Button,Radio, message} from 'antd'
import {reqGetRoles,reqAddRole,reqUpdateRole} from '../../api'
import AddForm from './add-form.jsx';
import UpdateFrom from './update-form.jsx'
import MemeoryUtils from '../../util/memeoryUtils'
import StorageUtils from '../../util/storageUtils';
import { formateDate } from '../../util/dateUtil';
export default class Role extends Component {
  addModal = React.createRef();
  updateModal = React.createRef();
  state = {
    roles:[],
    role:{},
    showAdd:false,
    showUpdate:false,
  }
  UNSAFE_componentWillMount(){
    this.columns = [
      {
        title: '',
        width:70,
        render:(role)=>{
          return <Radio checked={role==this.state.role}></Radio>
        }
      },
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        width:300,
        render:formateDate,
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        width:300,
        render:formateDate,
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        width:300,
      },
    ]
  }
  componentDidMount(){
    this.getRoles()
  }
  getRoles = async()=>{
    const result = await reqGetRoles()
    if(result.status == 0){
      this.setState({
        roles:result.data
      })
    }
  }
  onSelect = (role)=>{
    this.setState({role})
  }

  showAdd = ()=>{
    this.setState({
      showAdd:true
    })
  }
  handleAddOk = ()=>{
    this.addModal.current.form.current.validateFields().then(async values=>{
      this.handleCancel();
      const result = await reqAddRole(values.roleName);
      if(result.status == 0){
        message.success('添加成功')
        this.setState({
          roles:[...this.state.roles,result.data]
        })
      }
    }).catch(e=>{})
  } 
  handleCancel = ()=>{
    this.setState({showAdd:false,showUpdate:false})
  }

  showUpdate = ()=>{
    this.setState({
      showUpdate:true
    })
  }
  handleUpdateOk = async()=>{
    const checkedKeys = this.updateModal.current.getCheckedKeys();
    //更新失败会显示错误
    this.state.role.menus = checkedKeys;
    this.state.role.auth_name = MemeoryUtils.user.username;
    this.state.role.auth_time = Date.now();
    this.handleCancel();
    const result = await reqUpdateRole(this.state.role);
    if(result.status == 0){
      if(this.state.role._id == MemeoryUtils.user.role_id){
        MemeoryUtils.user = {};
        StorageUtils.removeUser();
        this.props.history.replace('/login');
        message.success('更新成功,请重新登陆')
      }else{
        message.success('更新成功')
        this.setState({
          roles:[...this.state.roles]
        })
      }
      
    }
  } 
  render() {
    const {roles,role} = this.state;
    const title =(
      <span>
        <Button type="primary" onClick={this.showAdd}>创建角色</Button>
        &nbsp;&nbsp;
        <Button type="primary" disabled={!role._id} onClick={this.showUpdate}>设置角色权限</Button>
      </span>);
    
    return (
      <Card title={title}>
        <Table 
          dataSource={roles} 
          bordered 
          columns={this.columns} 
          rowKey='_id'
          pagination = {{defaultPageSize:3}}
          onRow={(record) => {
            return {
              onClick: () => {this.onSelect(record)}, // 点击行
            };
          }}
          />
        <Modal title="创建角色" open={this.state.showAdd} onOk={this.handleAddOk} onCancel={this.handleCancel}>
          <AddForm ref={this.addModal}/>
        </Modal>
        <Modal title="设置角色权限" open={this.state.showUpdate} onOk={this.handleUpdateOk} onCancel={this.handleCancel}>
          <UpdateFrom ref={this.updateModal} role={role}/>
        </Modal>
      </Card>
    )
  }
}
