import React, { Component } from 'react'
import {Card,Select,Input,Button,Form,Upload,Cascader,message} from 'antd'
import {reqGetCategory} from '../../../api'
import LinkButton from '../../../components/link-button';
import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import PictureWall from './picture-wall';
import {reqAddOrUpdateProduct} from '../../../api'
import RichTextEditor from './rich-text-editor';
const Item = Form.Item

export default class ProductAddUpdate extends Component {
  state = {
    options:[],
  }
  form = React.createRef();
  pic = React.createRef();
  richTextArea = React.createRef();

  UNSAFE_componentWillMount(){
    const {product} = this.props.location.state || {};
    this.product =  product;
  }
  componentDidMount(){
    this.getCategoryList('0');
  }
  //获取一级或者二级分类列表
  getCategoryList = async (parentId)=>{
      const data = await reqGetCategory(parentId)
      if(data.status == 0){
        const categorys = data.data;
        if(parentId == '0'){
          this.initOptions(categorys)
        }else{
          return categorys;
        }
      }
  }
  initOptions = async(categorys)=>{
    const options = categorys.map(c=>({
      value:c._id,
      label:c.name,
      isLeaf:false,
    }))
    if(this.product && this.product.pCategoryId){
      const subcategorys = await this.getCategoryList(this.product.pCategoryId);
      const cOptions = subcategorys.map(c=>({
        value:c._id,
        label:c.name,
        isLeaf:true,
      }))
      options.forEach(e=>{
        if(e.value == this.product.pCategoryId){
          e.children = cOptions;
        }
      })
    }
    this.setState({
      options
    })
  }
  //用于加载下一级的方法
  loadData = async(data)=>{
    data = data[0];
    if(!data.isLeaf && !data.children){
      
      const categorys = await this.getCategoryList(data.value);
      if(categorys.length == 0){
        data.isLeaf = true
      }else{
        const cOptions = categorys.map(c=>({
          value:c._id,
          label:c.name,
          isLeaf:true,
        }))
        data.children = cOptions;
      }
      this.setState({
        options:[...this.state.options],
      })
    }
  }
  submit = ()=>{
    console.log('0000')
    this.form.current.validateFields().then(async values=>{
      const {category,name,desc,price} = values;
      const pro = {
        categoryId:category.length == 2 ? category[1] : '',
        pCategoryId:category[0],
        name,
        desc,
        price,
        detail:this.richTextArea.current.getDetail(),
        imgs:this.pic.current.getImgs(),
        // 
      };
      if(this.product){
        pro._id = this.product._id;
      }
      console.log(pro);
      let data = await reqAddOrUpdateProduct(pro);
      if(data.status == 0){
        message.success('添加成功');
        this.props.history.goBack();
      }
    }).catch(e=>{console.log('1111',e)});
  }
  render() {
    const title = (
      <span>
        <LinkButton onClick={()=>{this.props.history.goBack()}}>
          <ArrowLeftOutlined style={{marginRight:10,fontSize:16}}/>
        </LinkButton>
        <span>添加商品</span>
      </span>); 
    const formItemLaout = {
      labelCol:{span:2},
      wrapperCol:{span:8}
    }
    const {name,desc,price,pCategoryId,categoryId,detail} = this.product || {};
    const category =  pCategoryId ? [pCategoryId,categoryId] : []
    return (
      <Card title={title}>
        <Form initialValues ={{name,desc,price,category}} {...formItemLaout} ref={this.form}>
          <Item 
            label='商品名称'
            name="name"
            rules={[
                {
                    required: true,
                    message: '请输入商品名称',
                },
            ]}
            >
            <Input placeholder='请输入商品名称'/>
          </Item>
          <Item 
          label='商品描述'
          name="desc"
          rules={[
              {
                  required: true,
                  message: '请输入商品描述',
              },
          ]}
          >
            <TextArea placeholder='请输入商品描述' autosize={{minRow:2,maxRow:6}}/>
          </Item>
          <Item 
          label='商品价格'
          name="price"
          rules={[
              {
                  required: true,
                  message: '请输入商品价格',
              },
              {validator:(rule,value)=>{
                if(value * 1 >= 1){
                  return Promise.resolve('Success');
                }else{
                  return Promise.reject('金额必须大于1');
                }
                
              }}
          ]}
          >
            <Input placeholder='请输入商品价格' type='number' addonAfter='元'/>
          </Item>
          <Item 
          label='商品分类'
          name="category"
          rules={[
              {
                  required: true,
                  message: '请选择分类',
              },
          ]}
          >
            <Cascader 
              // initialValues={[this.product.pCategoryId,this.product.categoryId]}
              placeholder='请指定商品分类'
              options={this.state.options}
              loadData={this.loadData}
            />
          </Item>
          <Item 
          label='商品图片'
          >
            <PictureWall ref={this.pic} imgs={this.product && this.product.imgs}/>
          </Item>
          <Item 
          label='商品详情'
          labelCol ={{span:2}}
          wrapperCol={{span:20}}
          >
            <RichTextEditor ref={this.richTextArea} detail={detail}/>
          </Item>
          <Item>
            <Button type='primary' onClick={this.submit}>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
