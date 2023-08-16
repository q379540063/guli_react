import React, { Component } from 'react'
import {Card,Select,Input,Button,List} from 'antd'
import {reqCategory} from '../../../api'
import LinkButton from '../../../components/link-button';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import {BASE_IMG_URL} from '../../../util/constant'
import './product.less'
const Item = List.Item

export default class ProductDetail extends Component {
  state = {
    cName1:'',//一级分类名称
    cName2:'',//二级分类名称
  }
  async componentDidMount(){
    const {pCategoryId,categoryId} = this.props.location.state.product;
    if(pCategoryId == 0){
      const result = await reqCategory(categoryId);
      const cName1 = result.data.name;
      this.setState({cName1})
    }else{
      let result1 = reqCategory(pCategoryId);
      let result2 = reqCategory(categoryId);
      [result1,result2] = await Promise.all([result1,result2])
      const cName1 = result1.data ? result1.data.name : '';
      const cName2 = result2.data ? result2.data.name : '';
      this.setState({cName1,cName2})
    }
  }


  render() {
    const {name,desc,price,detail,imgs} = this.props.location.state.product
    const {cName1,cName2} = this.state;
    const title = (
      <span>
        <LinkButton onClick={()=>{this.props.history.goBack()}}>
          <ArrowLeftOutlined style={{marginRight:10,fontSize:16}}/>
        </LinkButton>
        <span>商品详情</span>
      </span>);
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className='left'>商品名称</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className='left'>商品描述</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className='left'>商品价格</span>
            <span>¥{price}</span>
          </Item>
          <Item>
            <span className='left'>所属分类</span>
            <span>{cName1}{cName2?('--->'+cName2):''}</span>
          </Item>
          <Item>
            <span className='left'>商品图片</span>
            
            {imgs.map(e=>{
              return <img key={e} src={BASE_IMG_URL + e} alt='img' className='product-img'></img>
            })}
          </Item>
          <Item>
            <span className='left'>商品详情</span>
            <span dangerouslySetInnerHTML={{__html:detail}}></span>
          </Item>
        </List>
       
      </Card>
    )
  }
}
