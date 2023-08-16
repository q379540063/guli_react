import React, { Component } from 'react'
import {Card,Table,Button,Modal} from 'antd'
import {reqGetCategory,reqAddCategory,reqUpdateCategory} from '../../../api'

import {
  PlusOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import LinkButton from '../../../components/link-button';

import AddForm from './add-form.jsx';
import UpdateFrom from './update-form.jsx'
export default class Category extends Component {
  state = {
    categoryList:[],
    modalOpen:0,
    loading:false,

    parentId:'0',//当前要展示的 分类列表的parentId
    parentName:'',//当前要展示的 分类列表名称
    subCategoryList:[],

    updateCategory:{},//要修改的分类
  }
  addModal = React.createRef();
  updateModal = React.createRef();
  modalCategory = React.createRef();
  componentWillMount(){
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: '',
        width:300,
        key: 'ma',
        render: (category)=>(
          <span>
            <LinkButton onClick = { ()=>{this.updateCategory(category)}}>修改分类</LinkButton>
            {this.state.parentId == '0' ? <LinkButton onClick = {()=>{this.showSubCategorys(category)}}>查看子分类</LinkButton> : null}
            
          </span>
        )
      }
    ];
  }
  componentDidMount(){
    this.getCategoryList();
  }
  showSubCategorys = (category)=>{
    this.setState({
      parentId:category._id,
      parentName:category.name,
    },()=>{this.getCategoryList()})
  }
  goBack = ()=>{
    this.setState({
      parentId:'0',
      parentName:'',
      subCategoryList:[]
    })
  }
  getCategoryList = async (parentId)=>{
    parentId =  parentId || this.state.parentId;
    if(parentId == this.state.parentId || parentId == 0){
      this.setState({loading:true})
      const data = await reqGetCategory(parentId)
      if(data.status == 0){
        this.setState({
          [this.state.parentId == '0'? 'categoryList' :'subCategoryList']:data.data,
        })
      }
      this.setState({loading:false})
    }
  }
  handleAddOk = async ()=>{
    this.addModal.current.form.current.validateFields().then(async values=>{
      // this.addModal.current.form.current.resetFields();
      this.setState({modalOpen:0})
      const date = await reqAddCategory(values.parentId,values.categoryName);
      if(date.status == 0){
        this.getCategoryList(values.parentId);
      }
    }).catch(e=>{})
  }
  handleUpdateOk = ()=>{
    this.updateModal.current.form.current.validateFields().then(async values=>{
      this.setState({modalOpen:0})
      const date = await reqUpdateCategory(this.state.updateCategory._id,values.categoryName);
      if(date.status == 0){
        this.getCategoryList(values.parentId);
      }
      // this.updateModal.current.form.current.resetFields();
    }).catch(e=>{})
  }
  handleCancel = ()=>{
    // this.addModal.current && this.addModal.current.form.current.resetFields();
    // this.updateModal.current && this.updateModal.current.form.current.resetFields();
    this.setState({modalOpen:0})
  }
  handleAdd = ()=>{
    this.setState({
      modalOpen: 1
    })
  }
  updateCategory = (category)=>{
    this.setState({
      modalOpen:2,
      updateCategory:category
    })
  }
  render() {
    const {categoryList,subCategoryList,parentId,parentName} = this.state;
    const title = parentId == '0'? ' 一级分类列表': (
      <span>
        <LinkButton onClick={this.goBack}>一级分类列表</LinkButton>
        <ArrowRightOutlined />
        &nbsp;&nbsp;
        <span style={{fontSize:'14px'}}>{parentName}</span>
      </span>);
    const extra = (
      <Button type='primary' onClick={this.handleAdd}>
        <PlusOutlined />
        添加
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table 
          dataSource={parentId == '0' ? categoryList : subCategoryList} 
          bordered 
          columns={this.columns} 
          rowKey='_id'
          pagination = {{defaultPageSize:5}}
          loading = {this.state.loading}
          />
        <Modal title="添加分类" open={this.state.modalOpen == 1} onOk={this.handleAddOk} onCancel={this.handleCancel}>
          <AddForm ref={this.addModal} categoryList = {this.state.categoryList} parentId={this.state.parentId}/>
        </Modal>
        <Modal title="编辑分类" open={this.state.modalOpen == 2} onOk={this.handleUpdateOk} onCancel={this.handleCancel}>
          <UpdateFrom ref={this.updateModal} categoryName={this.state.updateCategory.name}/>
        </Modal>
      </Card>
    )
  }
}
