<template>
  <div class="myinfo">
    <div class="header">
      <div class="top">
        <div class="img">
          <img :src="userinfo.avatar" alt="">
        </div>
        <div class="name">{{userinfo.username}}</div>
        <div class="logout" @click="logout">
          <img src="../../assets/myinfo/退出登录.svg" alt="">
        </div>
      </div>
      <div class="bottom">
        <div class="item">
          <p class="bottom-top">{{userinfo.collectshop?userinfo.collectshop.length:0}}</p>
          <p class="bottom-top">收藏夹</p>
        </div>
        <div class="item">
          <p class="bottom-top">{{userinfo.loveshop?userinfo.loveshop.length:0}}</p>
          <p class="bottom-top">关注店铺</p>
        </div>
        <div class="item">
          <p class="bottom-top">{{userinfo.lookshop?userinfo.lookshop.length:0}}</p>
          <p class="bottom-top">足迹</p>
        </div>

      </div>
    </div>
    <div class="main-content">

      <!--开店-->
      <div class="openshop" @click="openshop">
       <div class="content">
         <div class="shopicon">
           <img src="../../assets/myinfo/店铺.svg" alt="">
         </div>
         <div class="info">
           <p>天猫双十一好礼不断</p>
           <p>高推荐店铺开业即送</p>
         </div>
         <div class="jiantou">
           <img src="../../assets/myinfo/方向.svg" alt="">
         </div>
       </div>
      </div>
      <!--开店-->

      <!--订单管理-->
      <div class="order">
        <div class="top">我的订单</div>
        <div class="bottom">
          <div class="item">
            <div class="icon">
              <img src="../../assets/myinfo/待发货.svg" alt="">
            </div>
            <div>待发货</div>
          </div>
          <div class="item">
            <div class="icon">
              <img src="../../assets/myinfo/待收货.svg" alt="">
            </div>
            <div>待收货</div>
          </div>
          <div class="item">
            <div class="icon">
              <img src="../../assets/myinfo/全部订单.svg" alt="">
            </div>
            <div>全部订单</div>
          </div>
          <div class="item">
            <div class="icon">
              <img src="../../assets/myinfo/退款.svg" alt="">
            </div>
            <div>退款/售后</div>
          </div>
        </div>
      </div>
      <!--订单管理-->
      <div class="nocontent">暂无功能</div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "index",
    data() {
      return {
        userinfo: {}
      }
    },
    methods: {
      openshop(){
        this.$router.push('/openshop')
      },
      logout(){
        this.$axios.get('/user/logout').then(res=>{
          if(res.code==200){
            Toast('退出登录成功')
            window.setTimeout(()=>{
              this.$router.push('/login')
            },500)
          }
          else {

          }
        })
      },
      getuserinfo() {
        this.$axios.get('/user').then(res => {
          if (res.code == 200) {
            this.userinfo = res.data
          }
        })
      }
    },
    created() {
      this.getuserinfo()
    }
  }
</script>

<style scoped lang="scss">
  .header {
    width: 7.5rem;
    height: 3rem;
    background: linear-gradient(to right, #ff8901, #ff5201);
    .top {
      width: 7.5rem;
      height: 1.75rem;
      display: flex;
      .img {
        width: 1.75rem;
        height: 1.75rem;
        img {
          width: 1rem;
          height: 1rem;
          margin: .375rem;
          border-radius: 50%;
          border: 1px solid #ffffff;
          background-color: #00B7FF;
        }
      }
      .name {
        width: 3.75rem;
        height: 1.75rem;
        color: white;
        font-size: 20px;
        line-height: 1.75rem;
      }
      .logout{
        width: 1rem;
        height: 1rem;
        padding: .375rem .5rem;
        img{
          width: 1rem;
          height: 1rem;
        }
      }
    }
    .bottom {
      width: 7.5rem;
      height: 1.25rem;
      display: flex;
      .item {
        width: 2.5rem;
        height: 1.25rem;
        color: white;
        .bottom-top {
          width: 2.5rem;
          height: .625rem;
          text-align: center;
        }
      }
    }
  }
  .main-content{
    width: 7rem;
    padding: .25rem;
    .openshop{
      width: 7rem;
      height: 1.2rem;
      border-radius: 10px;
      background-color: white;
      .content{
        width: 6.6rem;
        height: .8rem;
        padding: .2rem;
        display: flex;
        .shopicon{
          width: 1.5rem;
          height: .8rem;
          border-right: 1px solid #ddd;
          img{
            width: .8rem;
            height: .8rem;
          }
        }
        .info{
          margin-left: .2rem;
          width: 3rem;
          height: .8rem;
        }
        .jiantou{
          width: 1.9rem;
          height: .8rem;
          img{
            margin-left:.8rem ;
            width: .8rem;
            height: .8rem;
          }
        }
      }
    }
    .order{
      width: 6.6rem;
      padding: .2rem;
      margin: .2rem 0rem;
      border-radius:10px ;
      background-color: white;
      height: 2rem;
      .top{
        height: .7rem;
        width: 6.6rem;
        line-height: .7rem;
        border-bottom: 1px solid #ddd;
      }
      .bottom{
        display: flex;
        .item{
          width: 1.65rem;
          height: 1.3rem;
          .icon{
            width: 1.25rem;
            height: .5rem;
            padding: .2rem;
            img{
              width: 1.25rem;
              height: .5rem;
            }
          }
          div{
            text-align: center;
            width: 1.65rem;
            height: .4rem;
          }
        }
      }
    }
    .nocontent{
      width: 7rem;
      height: 5rem;
      line-height: 5rem;
      background-color: white;
      text-align: center;
      border-radius: 10px;
    }
  }
</style>
