import React, { Component } from 'react'

export default class User extends Component {
  state = {
    count:1,
  }
  componentDidMount(){
    // setTimeout(()=>{
    //   console.log('setTimeout 1',this.state.count);
    //   this.setState({count:this.state.count + 1});
    //   console.log('setTimeout 2',this.state.count);
    // })
    // const h2 = this.refs.count;
    // h2.addEventListener('click',()=>{
    //   console.log('addEventListener 1',this.state.count);
    //   this.setState(state=>({count:state.count + 1}));
    //   console.log('addEventListener 2',this.state.count);
    // })
    // Promise.resolve().then(value=>{
    //   console.log('Pormise 1',this.state.count);
    //   this.setState({count:this.state.count + 1});
    //   console.log('Pormise 2',this.state.count);
    // })
    this.setState({count:this.state.count+1});
    this.setState(state=>({count:state.count+1}));
    this.setState(state=>({count:state.count+1}));
    this.setState({count:this.state.count+1});
  }
  render() {
    return (
      <div>
        <h2 ref='count'>{this.state.count}</h2>
      </div>
    )
  }
}
