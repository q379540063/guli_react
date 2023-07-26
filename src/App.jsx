/*
根组建
*/ 
import React, { Component } from 'react'
import {  Link, Route,Routes } from "react-router-dom";
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
export default class App extends Component {
    render() {
        return (
            <Routes>
                <Route path="/login" Component={Login}></Route>
                <Route path="/" Component={Admin}></Route>
            </Routes>
        )
    }
}
