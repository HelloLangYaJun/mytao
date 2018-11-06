<template>
  <div class="index-main">

    <div class="header">
      <input type="text" class="shousuo" v-model="findstr">
      <i class="shousuo-icon" @click="findshop()"></i>
    </div>
    <!--轮播图-->
    <div class="swiper">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--轮播图-->

    <div class="main-content">
      <!--我的频道-->
      <div class="my-channel">
        <div class="top">
          <h4>我的频道</h4>
        </div>

        <div class="icon-item">
          <div class="item" v-for="(item,index) in mypindao" :key="index">
            <div class="top-img" @click="goshops(item.type)">
              <img :src="item.icon" alt="">
            </div>
            <p class="bottom">{{item.name}}</p>
          </div>
        </div>
      </div>
      <!--我的频道-->

      <!--头条开始-->
      <div class="my-toutiao">
        <div class="top">
          <p>淘宝头条</p>
          <div class="cell-swiprer">
            <van-notice-bar background="white"
                            text="本程序仅做学习使用，不涉及任何商业用途。"
            />
          </div>
        </div>
        <div class="item" v-for="(item,index) in shops" :key="index" >
          <img :src="item.shopimg" alt="" @click="goshop(item._id)">
          <p>{{item.shopdetail}}</p>
        </div>
      </div>
      <!--头条结束-->
    </div>
  </div>
</template>

<script>
  import {Swipe, SwipeItem} from 'vant';
  import Vue from 'vue'
  import { NoticeBar,Toast } from 'vant';
  Vue.use(NoticeBar);
  Vue.use(Swipe).use(SwipeItem);
  import icon1 from '../../assets/mypindao/天猫.svg'
  import icon2 from '../../assets/mypindao/聚划算.svg'
  import icon3 from '../../assets/mypindao/天猫国际.svg'
  import icon4 from '../../assets/mypindao/饿了么.svg'
  import icon5 from '../../assets/mypindao/抢购.svg'

  import icon6 from '../../assets/mypindao/手机充值.svg'
  import icon7 from '../../assets/mypindao/拍卖.svg'
  import icon8 from '../../assets/mypindao/淘票票.svg'
  import icon9 from '../../assets/mypindao/飞猪logo.svg'
  import icon10 from '../../assets/mypindao/分类.svg'

  const  pindao=[
    {
      icon: icon1,
      name:'天猫',
      type:1,
      src:'/shop/tianmao'
    },
    {
      icon: icon2,
      name:'聚划算',
      type:2,
      src:'/shop/juhuasuan'
    },
    {
      icon: icon3,
      name:'天猫国际',
      type:3,
      src:'/shop/juhuasuan'
    },
    {
      icon: icon5,
      name:'淘抢购',
      type:4,
      src:'/shop/juhuasuan'
    },{
      icon: icon4,
      name:'饿了么',
      src:'/shop/juhuasuan'
    },  {
      icon: icon6,
      name:'手机充值',
      src:'/shop/juhuasuan'
    }, {
      icon: icon7,
      name:'拍卖',
      src:'/shop/juhuasuan'
    } ,{
      icon: icon8,
      name:'淘票票',
      src:'/shop/juhuasuan'
    },  {
      icon: icon9,
      name:'飞猪',
      src:'/shop/juhuasuan'
    } ,{
      icon: icon10,
      name:'分类',
      src:'/shop/juhuasuan'
    }

  ]
  export default {
    name: "index",
    data() {
      return {
        images: [
          'https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg',
          'https://img.alicdn.com/tps/i4/TB1UXPJj9zqK1RjSZFpwu1kSXXa.png_q90_.webp'
        ],
        shops:[],
        findstr:'',
        mypindao:pindao
      }
    },
    methods:{
      findshop(){
        this.$router.push({path:'/shops',query:{findstr:this.findstr}})
      },
      goshops(type){
        if(type){
          this.$router.push({path:'/shops',query:{type:type}})
        }
        else {
          Toast('暂无功能')
        }
      },
      goshop(id){
        this.$router.push({path:'/goods',query:{id:id}})
      },
      getshops(){
        this.$axios.get('/shop').then(res=>{
          if(res.code==200){
            this.shops= this.shops.concat(res.data)

          }
        })
      }
    },
    created(){
      this.getshops()
    }
  }
</script>

<style  lang="scss">
  h4{
    font-size: 20px;
  }
  .header {
    width: 7.5rem;
    height: 1rem;
    position: relative;
    overflow: hidden;
    background: linear-gradient(to right, #ff8901, #ff5201);
    .shousuo {
      display: block;
      width: 5rem;
      height: .6rem;
      margin-top: .2rem;
      margin-left: .5rem;
      border: none;
      border-radius: 5px;
    }
    .shousuo-icon {
      display: block;
      width: .6rem;
      height: .6rem;
      position: absolute;
      left: 4.9rem;
      top: .2rem;
      z-index: 99;
      background: url("../../assets/icon/shousuo.svg") no-repeat;
      background-size: .6rem .6rem;
    }
  }
  //轮播图样式开始
  .swiper {
    width: 7.3rem;
    padding: 0 .1rem;
    height: 4rem;
    img {
      width: 7.3rem;
      height: 4rem;
    }
  }

  //轮播图样式结束
  .main-content {
    width: 7rem;
    padding: 0 .25rem;
    //我的频道
    .my-channel {
      width: 7rem;
      .icon-item {
        width: 7rem;
        height: 3.2rem;
        .item{
          float: left;
          width: 1rem;
          padding: .1rem .2rem;
          height: 1.4rem;
          .top-img{
            width: 1rem;
            height: 1rem;
            img{
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
            }
          }
          .bottom{
            height: .4rem;
            line-height: .4rem;
            text-align: center;
            font-size: .25rem;
            color: #555;
          }
        }
      }
    }
    //我的频道

    //我的头条开始
    .my-toutiao{
      width: 6.6rem;
      padding: .2rem;
      background-color: white;
      overflow: hidden;
      margin-bottom: 1.5rem;
      border-radius: .15rem;
      .top{
        height: .6rem;
        display: flex;
        position: relative;
        border-bottom: .5px solid #ccc;
        p{
          color: #917b7b;
          font-weight: 900;
          font-size: 16px;
          height: .6rem;
          line-height: .6rem;
          width: 1.5rem;
        }
        .cell-swiprer{
          position: absolute;
          top: 0rem;
          right: .2rem;
          width: 5rem;
          .van-notice-bar{
            height: 24px;
          }
        }
      }

      .item{
        width: 3.3rem;
        height: 3.2rem;
        position: relative;
        float: left;
        img{
          width: 3.3rem;
          height: 3.2rem;
        }
        p{
          position: absolute;
          bottom: 0px;
          background-color: black;
          opacity: .8;
          color: white;
          text-align: center;
          line-height: .5rem;
          width: 3.3rem;
          height: .5rem;
        }
      }
    }
    //我的头条结束
  }

</style>
