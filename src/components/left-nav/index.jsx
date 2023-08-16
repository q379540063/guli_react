import React, { Component } from 'react'
import { Link ,withRouter} from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Menu } from 'antd';
import menuConfig from '../../config/menuConfig';
import memeoryUtils from '../../util/memeoryUtils';

const isHaveChild = (key)=>{
  const {user} = memeoryUtils;
  const {role} = user || {};
  let {menus} = role || {}
  menus = menus || []
  if(key.isPublic || user.username == 'admin' || menus.indexOf(key.key) !== -1){
    return true
  }else if(key.children){
    return key.children.find(e=>(menus.indexOf(e.key) !== -1))
  }
  return false;
}

const getConfig = (config) => {
  const list = [];
  config.map(item=>{
    if(isHaveChild(item)){
      const obj = {label:item.label,key:item.key}
      if(item.children){
        obj.children = getConfig(item.children);
      }
      list.push(obj);
    }
  });
  return list;
}
const getOpenKeys = (config,path,list) => {
  for(let i = 0 ;i < config.length; i++){
    let item = config[i];
    if(item.key == path){
      return true;
    }else{
      if(item.children){
        list.push(item.key);
        if(getOpenKeys(item.children,path,list)){
          return true;
        }else{
          list.pop();
        }
      }
    }
  }
  return false;
}

class LeftNav extends Component {
  onSelect = (obj)=>{
    this.props.history.push('/'+obj.key)
  }
  render() {  
    const items = getConfig(menuConfig);
    let path = this.props.location.pathname;
    path = path.split('/').filter(e=>e.length > 0)[0]
    const selectedKeys = [path];
    const openKeys = [];
    getOpenKeys(menuConfig,path,openKeys);
    console.log(selectedKeys,items);

    return (
        <div className='left-nav'>
          <Link to='/' className='left-nav-header'>
            <img src={logo} alt="" />
            <h1>商品后台</h1>
          </Link>
          <Menu
              selectedKeys={selectedKeys}
              defaultOpenKeys={openKeys}
              mode="inline"
              theme="dark"
              items={items}
              onSelect={this.onSelect}
          />
      </div> 
    )
  }
}

export default withRouter(LeftNav)
