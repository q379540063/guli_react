
import React, { Component } from 'react'
import {
    Upload,
    Modal
  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BASE_IMG_URL } from '../../../util/constant';
const getBase64 = (file) =>
new Promise((resolve, reject) => {
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => resolve(reader.result);
reader.onerror = (error) => reject(error);
});

export default class PictureWall extends Component {
    state = {
        fileList:[],
        previewImage:'',
        previewOpen:false,
    }
    UNSAFE_componentWillMount(){
        const {imgs} = this.props || [];
        if(imgs && imgs.length > 0){
            const fileList = imgs.map((img,index)=>{
                return {
                    uid:-index,
                    name:img,
                    status:'done',
                    url:BASE_IMG_URL + img,
                }
            });
            this.state.fileList = fileList;
        }
    }
    getImgs = ()=>{
        return this.state.fileList.map(e=>e.name);
    }
    handlePreview = async(file)=>{
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewOpen:true,
            previewImage:file.url || file.preview
        })
    }
    handleChange = ({file,fileList})=>{
        if(file.status == "done"){
            fileList.forEach(e=>{
                if(e.uid == file.uid){
                    e.name= file.response.data.name;
                    e.url = file.response.data.url;
                }
            })
        }
        
        this.setState({
            fileList:[...fileList]});
    }
    handleCancel = ()=>{
        this.setState({
            previewOpen:false,
        })
    }
    render() {
        const {fileList,previewOpen,previewImage} = this.state;
        const {handlePreview,handleChange,handleCancel} = this;
        const uploadButton = (
            <div>
            <PlusOutlined />
            <div
                style={{
                marginTop: 8,
                }}
            >
                Upload
            </div>
            </div>
        );
        return (
            <>
                <Upload
                    action="/manage/img/upload"
                    listType="picture-card"
                    name="image"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                    <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                    />
                </Modal>
            </>
        )
    }
}
