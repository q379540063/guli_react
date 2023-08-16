import React, { Component } from 'react'
import {Redirect, Route,Switch} from 'react-router-dom'
import memeoryUtils from '../../util/memeoryUtils';
import './admin.less'
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Home from '../home/home'
import Category from '../products/category'
import Product from '../products/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

export default class Admin extends Component {
  render() {
    const user = memeoryUtils.user;
    if(!user || !user._id){
      return <Redirect to = '/login'></Redirect>
    }
    return (
      <div className='admin'>
        <LeftNav></LeftNav>
        <div className='container'>
          <Header></Header>
          <div className='content'>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/bar" component={Bar}></Route>
              <Route path="/line" component={Line}></Route>
              <Route path="/pie" component={Pie}></Route>
              <Redirect to='/home'></Redirect>
            </Switch>
          </div>
          {/* <Content>
          </Content> */}
          <Footer></Footer>
        </div>
      </div>
    )
  }
}

