import axios from 'axios'
import qs from 'qs'
import {errorAlert} from './alert'
import store from '../store/index'
import router from '../router'
//设置基础路径
const baseUrl = "/api";

// 在请求拦截中设置请求头
axios.interceptors.request.use(config=>{
    console.group('本次请求路径为:'+config.url)
    if(config.url !== baseUrl+'/api/userlogin'){
      // 需要设置请求头
      config.headers.authorization = store.state.user.token
    }
    console.log(config);
    return config
  })
  
  // 设置一个响应拦截
  axios.interceptors.response.use(res=>{
    console.group('本次响应路径为:'+res.config.url)
    if(res.data.code !== 200){
      if(res.data.code == 403){
        router.push('/login');
        return;
      }
      errorAlert(res.data.msg);
      return;
    }
    console.log(res);
    return res;
  })
//添加菜单
export const addMenuList = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/menuadd',
        data:qs.stringify(data)
    })
}

//获取菜单列表
export const getMenu = (params) => {
    return axios({
        method:'get',
        url:baseUrl+'/api/menulist',   
        params
    })
}

//获取修改详情页
export const oneMenu = (params) => {
    return axios({
        method:'get',
        url:baseUrl + '/api/menuinfo',
        params
    })
}

//修改页面
export const update = (data) =>{
    return axios({
        method:'post',
        url:baseUrl + '/api/menuedit',
        data:qs.stringify(data)
    })
}

//删除菜单列
export const delMenu = (data) => {
    return axios({
        method:'post',
        url:baseUrl + '/api/menudelete',
        data:qs.stringify(data)
    })
}

//添加角色
export const addRole = (data) => {
    return axios({
        method:'post',
        url:baseUrl + '/api/roleadd',
        data:qs.stringify(data)
    })
}

//获取角色列表
export const getRoleList = () =>{
    return axios({
        method:'get',
        url:baseUrl + '/api/rolelist'
    })
}

//获取角色页详情
export const getrRoleDetail = (params) =>{
    return axios({
        method:'get',
        url:baseUrl +'/api/roleinfo',
        params
    })
}

//角色修改
export const editRole = (data) =>{
    return axios({
        method:'post',
        url:baseUrl + '/api/roleedit',
        data:qs.stringify(data)
    })
}

//角色删除
export const delRole = (data) => {
    return axios({
        method:'post',
        url:baseUrl + '/api/roledelete',
        data:qs.stringify(data)
    })
}

//管理员添加
export const addManager = (data) =>{
    return axios({
        method:'post',
        url:baseUrl + '/api/useradd',
        data:qs.stringify(data)
    })
}

//获取管理员列表
export const getManagerList = (params) => {
    return axios({
        method:'get',
        url:baseUrl + '/api/userlist',
        params
    })
}

//获取管理总数
export const getManagerTotal = () => {
    return axios({
        method:'get',
        url:baseUrl +'/api/usercount'
    })
}

//获取管理员详情页
export const managerDetail = (params) => {
    return axios({
        method:'get',
        url:baseUrl + '/api/userinfo',
        params
    })
}

//修改管理员页
export const updateManager = (data) => {
    return axios({
        method:'post',
        url:baseUrl + '/api/useredit',
        data:qs.stringify(data)
    })
}

//删除管理员页面
export const delManager = (data) => {
    return axios({
        method:'post',
        url:baseUrl + '/api/userdelete',
        data:qs.stringify(data)
    })
}

//登录
export const requestLogin = (data) => {
    return axios({
        method:'post',
        url:baseUrl + '/api/userlogin',
        data:qs.stringify(data)
    })
}

//添加商品分类
export const addGoodsCate = (data) => {
    //使用FormData来处理带有文件的数据
    var form = new FormData()
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:'post',
        url:baseUrl + '/api/cateadd',
        data:form
    })
}

//获取商品分类列表
export const getCateList = (params) => {
    return axios({
        method:'get',
        url:baseUrl +'/api/catelist',
        params
    })
}

//商品分类获取(一条)
export const getOneCate = (params) =>{
    return axios({
        method:'get',
        url:baseUrl + '/api/cateinfo',
        params
    })
}

//修改商品分类
export const editCate = (data) => {
        var form = new FormData()
        for(let i in data){
            form.append(i,data[i])
        }
    return axios({
        method:'post',
        url:baseUrl + '/api/cateedit',
        data:form
    })
}

//删除商品分类
export const delCate = (data) => {
    return axios({
        method:'post',
        url:baseUrl + '/api/catedelete',
        data:qs.stringify(data)
    })
}

//商品规格添加
export const addGoodsSpec = (data) => {
    return axios({
        method:'post',
        url:baseUrl + '/api/specsadd',
        data:qs.stringify(data)
    })
}

//请求商品规格总数
export const specsTotal = () => {
    return axios({
        method:'get',
        url:baseUrl + '/api/specscount'
    })
}

//请求商品列表(分页)
export const specsList = (params) => {
    return axios({
        method:'get',
        url:baseUrl + '/api/specslist',
        params
    })
}

//请求商品列表详情页
export const oneSpec = (params) => {
    return axios({
        method:'get',
        url:baseUrl + '/api/specsinfo',
        params
    })
}

//商品规格修改
export const editSpec = (data) => {
    return axios({
        method:'post',
        url:baseUrl + '/api/specsedit',
        data:qs.stringify(data)
    })
}

//商品规格删除
export const delSpec = (data) => {
    return axios({
        method:'post',
        url:baseUrl + '/api/specsdelete',
        data:qs.stringify(data)
    })
}

//商品添加
export const addGoods = (data) => {
    //处理含有文件的数据
    var form  = new FormData()
    //遍历对象 键值
    for(let i in data){
        form.append(i,data[i])
    }

    return axios({
        method:'post',
        url:baseUrl + '/api/goodsadd',
        data:form
    })
}