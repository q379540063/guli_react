import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {reqWeather} from '../../api'
import {formateDate} from '../../util/dateUtil'
import storageUtils from  '../../util/storageUtils'
import memeoryUtils from '../../util/memeoryUtils'
import MenuConfig from '../../config/menuConfig'
import LinkButton from '../../components/link-button'
class Header extends Component {
  state = {
    username:memeoryUtils.user.username,
    weather:'',
    temperature_float:'',
  }
  curT = React.createRef();

  componentDidMount(){
    this.getWeather();
    this.getTimes();
  }
  componentWillUnmount(){
    this.timer && clearInterval(this.timer);
  }

  async getWeather(){
    const {weather,temperature_float} = await reqWeather();
    this.setState({weather,temperature_float})
  }
  getTimes = ()=>{
    this.timer = setInterval(() => {
      if(this.curT.current){
        this.curT.current.innerHTML = formateDate(Date.now());
      }
    }, 1000);
  }
  getTitle = ()=>{
    let pathname = this.props.location.pathname;
    pathname = pathname.split('/').filter(e=>e.length > 0)[0]
    let title = '';
    MenuConfig.forEach(item => {
      if(item.key == pathname){
        title = item.label;
      }else if(item.children){
        item.children.forEach(e=>{
          if(e.key == pathname){
            title = e.label;
          }
        })
      }
    });
    return title;
  }

  loginout = ()=>{
    memeoryUtils.user = {};
    storageUtils.removeUser();
    this.props.history.replace('/login');
  }
  
  render() {
    const {username,weather,temperature_float} = this.state;
    const title = this.getTitle();
    return (
      <div className='header'>
        <div className='header-top'>
          <span>欢迎{username}</span>
          <LinkButton onClick={this.loginout}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span ref={this.curT}></span>
            <span>{weather + '--' + temperature_float}</span>
          </div>
        </div>
      </div>
    )
  }
}
export default  withRouter(Header);