<template>
  <div class="container">
      <div class="con">
          <h2>欢迎登录</h2>
          <el-input v-model="user.username" placeholder="请输入账号"></el-input>
          <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
          <div class="btn">
          <el-button type="primary" @click="login">登&emsp;&emsp;录</el-button>
      </div>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {warningAlert,successAlert} from '../../utils/alert'
import {requestLogin} from '../../utils/request'
export default {
    data(){
        return{
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        ...mapActions({
            'requestUser':'userActions'
        }),
        login(){
            if(this.user.username !== '' || this.user.password!==''){
                requestLogin(this.user).then(res=>{
                    successAlert(res.data.msg)
                    //将用户信息存入到SessionStorage
                    this.requestUser(res.data.list)
                    this.$router.push('/')
                })
            }else{
                warningAlert('请输入用户名或者密码')
            }



            // //localStorage方法
            // if(this.user.username !== '' || this.user.password!==''){
            //     //允许请求
            //     requestLogin(this.user).then(res=>{
            //         successAlert(res.data.msg)
            //         //将用户信息存入到localStorage
            //         if(localStorage.getItem('user')!==null){
            //             localStorage.removeItem('user')
            //         }
            //          localStorage.setItem('user',JSON.stringify(res.data.list))
            //         this.$router.push('/')
            //     })
            // }else{
            //     warningAlert('请输入用户名或者密码')
            // }
        }
    }
}
</script>

<style scoped>
.container{
    height: 100vh;
    width: 100vw;
    background: linear-gradient(#563443, #2F3D60);
    position: fixed;
    left: 0;
    bottom: 0;
}
.con{
    width: 400px;
    height: 300px;
    background: #fff;
    box-shadow: #fff;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    text-align: center;
}
h2{
    margin: 20px;
}
.el-input,.el-button{
    width: 90%;
    margin: 10px;
    color: #fff;
}
.el-button{
    margin: 15px;
    font-size: 20px;
}
</style>