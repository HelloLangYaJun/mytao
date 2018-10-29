<template>
  <div class="login">
    <Header :headerinfo="loginregist?'登录':'快速注册'"></Header>
    <div class="main">
      <div class="top-icon" >
        <i></i>
      </div>

      <div class="form">
        <input type="text" class="input" v-model="formData.username" placeholder="请输入小淘账户">
        <input type="text" class="input"v-model="formData.password" placeholder="请输入密码">
        <button @click="login()">{{loginregist?'登录':'同意协议并注册'}}</button>
        <p class="p-registe" @click="loginregist=!loginregist">{{loginregist?'注册':'返回登录'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../../components/header'
  import { Toast } from 'vant';
  import Vue from 'vue'
  Vue.use(Toast);
    export default {
        name: "index",
      data(){
        return{
          headerinfo:'登录',
          formData:{
            username:'',
            password:''
          },
          loginregist:true
        }
      },
      components:{Header},
      methods:{
          login(){
            if(this.loginregist){
              this.$axios.post('/user/login',this.formData).then(res=>{
                if(res.code==200){
                  Toast('登录成功!');
                  window.setTimeout(()=>{
                    this.$router.go(-1)
                  },500)
                }
                else {
                  Toast('失败');
                }
              })
            }
            else {
              this.$axios.post('/user/regist',this.formData).then(res=>{
                if(res.code==200){
                  Toast('注册成功，即将跳转登录界面');
                  var that=this
                  window.setTimeout(()=>{
                    that.loginregist=false
                  },500)
                }
                else {
                  Toast('失败');
                }
              })
            }
          }
      }
    }

</script>

<style scoped lang="scss">
  .main{
    margin-top: 44px;
    padding: 0 .25rem;
    .top-icon{
      height: 3rem;
      width: 7rem;
      overflow: hidden;
      i{
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        margin: 0 auto;
        margin-top: .75rem;
        background: url("../../../assets/icon/淘宝.svg") no-repeat;
        background-size:1.5rem 1.5rem ;
      }
    }
    .form{
      input{
        width: 6rem;
        padding: 0 .5rem;
        height: .6rem;
        outline: none;
        border: none;
        font-size: 16px;
        margin-bottom: .3rem;
        background-color: transparent;
        border-bottom: 1px solid #f40;
      }
      button{
        width: 7rem;
        height: .8rem;
        margin-top: .3rem;
        border: none;
        font-size: 18px;
        text-align: center;
        border-radius: .3rem;
        color: white;
        background: linear-gradient(to right, #ff8901, #ff5201);
      }
      .p-registe{
        margin-top: .2rem;
        font-size: 16px;
        text-align: right;
      }
    }
  }
</style>
