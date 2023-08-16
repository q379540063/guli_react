import { data } from "browserslist";
import ajax from "./ajax";
import jsonp from "jsonp";
export const reqLogin = (data) => ajax('/login',data,'POST');
export const reqAddUser = (data) => ajax('/manage/user/add',data,'POST');

export const reqGetCategory = (parentId) => ajax('/manage/category/list',{parentId});
export const reqAddCategory = (parentId,categoryName) => ajax('/manage/category/add',{parentId,categoryName},'POST');
export const reqUpdateCategory = (categoryId,categoryName) => ajax('/manage/category/update',{categoryId,categoryName},'POST');
export const reqGetProductList = (data) => ajax('/manage/product/list',data);
export const reqSearchProductList = (data) => ajax('/manage/product/search',data);
export const reqCategory = (categoryId) => ajax('/manage/category/info',{categoryId});
export const reqUpdateProductStatus = (productId,status) => ajax('/manage/product/updateStatus',{productId,status},'POST')

export const reqAddOrUpdateProduct = (data) => ajax('/manage/product/'+(data._id?'update':'add'),data,'POST')


export const reqGetRoles = () => ajax('/manage/role/list',{});
export const reqAddRole = (roleName) => ajax('/manage/role/add',{roleName},'POST');
export const reqUpdateRole = (data) => ajax('/manage/role/update',data,'POST');


export const reqUserList = () => ajax('/manage/user/list',{})
export const reqAddOrUpdateUser = (data) => ajax('/manage/user/' + (data._id?'update':'add'),data,'POST')
export const reqDelUser = (userId) => ajax('/manage/user/delete',{userId},'POST')

export const reqWeather = () => {
    return new Promise((resolve,reject)=>{
        jsonp('https://restapi.amap.com/v3/weather/weatherInfo?key=e45aced353f9f3c8fdbf7d76a543bd97&city=110000',{},(err,data)=>{
            if(!err && data.status == '1'){
                const {weather,temperature_float} = data.lives[0]
                resolve({weather,temperature_float})
            }else{
                reject();
            }
        })
    });
};