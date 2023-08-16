import React, { Component } from 'react'
import {Card,Select,Input,Button,Table} from 'antd'
import LinkButton from '../../../components/link-button';
import {
  PlusOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import {reqGetProductList,reqAdddProduct,reqSearchProductList,reqUpdateProductStatus} from '../../../api'
import {PAGE_SIZE} from '../../../util/constant'
const {Option} = Select

export default class ProductHome extends Component {
  state = {
    loading:false,
    products:[{name:'手机',desc:'华为新品',price:'9999',status:'1','_id':'1009'}],
    total:1,
    searchName:'',
    searchType:'productName',
  }
  UNSAFE_componentWillMount(){
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        width:200,
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        width:100,
        render:(price)=> '¥' + price
      },
      {
        title: '状态',
        // dataIndex: 'status',
        width:100,
        render : ({status,_id})=>{
          return (
            <span>
              <Button type='primary' onClick={()=>{this.updateProductStatus(_id,status)}}>{status == 1 ?'下架':'上架'}</Button>
              <span>{status == 1 ?'在售':'已下架'}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width:100,
        render: (product)=>{
          return (
            <span>
              <LinkButton onClick={()=>{this.props.history.push('/product/detail',{product})}}>详情</LinkButton>
              <LinkButton onClick={()=>{this.props.history.push('/product/addUpdate',{product})}}>修改</LinkButton>
            </span>
          )
        }
      }
    ];
  }
  componentDidMount(){
    this.getProductList(1);
  }
  updateProductStatus = async(productId,status)=>{
    const data = await reqUpdateProductStatus(productId,status == 1?2:1)
    if(data.status == 0){
      this.getProductList(this.pageNum)
    }
  }
  getProductList = async(pageNum,pageSize = PAGE_SIZE)=>{
    this.pageNum = pageNum;
    this.setState({loading:true})
    const {searchName,searchType} = this.state;
    let result = null
    if(searchName.length == 0){
      result = await reqGetProductList({pageNum,pageSize})
    }else{
      result = await reqSearchProductList({
        [this.state.searchType]:this.state.searchName,
        pageNum:1,
        pageSize:PAGE_SIZE,
      })
    }
    this.setState({loading:false})
    if(result.status == 0){
      const {list,total} = result.data;
      this.setState({
        products:list,
        total
      })
    }
  }
  render() {
    const title = (
      <span>
        <Select value={this.state.searchType} onChange={(searchType)=>{this.setState({searchType})}}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width:200,margin:'0 15px'}} onChange={(e)=>{this.setState({searchName:e.target.value})}}/>
        <Button type='primary' onClick={()=>{this.getProductList(1)}}>搜索</Button>
      </span>);
    const extra = (
      <Button type='primary' onClick={()=>{this.props.history.push('/product/addUpdate')}}>
        <PlusOutlined />
        添加商品
      </Button>
    );
    return (
      <Card title={title} extra={extra}>
        <Table 
          dataSource={this.state.products} 
          bordered 
          columns={this.columns} 
          rowKey='_id'
          pagination = {
            {
              total:this.state.total,
              defaultPageSize:PAGE_SIZE
            }
          }
          onChange={({current})=>{this.getProductList(current)}}
          loading = {this.state.loading}
          />
      </Card>
    )
  }
}
