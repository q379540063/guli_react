// 数据存储
const KEY = 'user_key'
// import {store} from "store";

export default{
    saveUser(user){
        localStorage.setItem(KEY,JSON.stringify(user));
        // store.set(KEY,user)
    },
    getUser(){
        return JSON.parse(localStorage.getItem(KEY)||'{}')
        // return store.get(KEY) || {}
    },
    removeUser(){
        localStorage.removeItem(KEY);
        // store.remove(KEY);
    }
}