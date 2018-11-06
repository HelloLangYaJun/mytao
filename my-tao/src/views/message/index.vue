<template>
  <div class="message">
    <div class="header">
      <van-tabs type="card" @click="onClick">
        <van-tab title="个人信息"></van-tab>
        <van-tab title="卖家中心"></van-tab>
      </van-tabs>
    </div>
    <div class="main" >

      <div   v-for="(item,index) in userinfo.chat1"
             @click="gochat(item.objectShop,item.objectFrom,item.objectTo,item.shop.shopname)" v-if="active">
        <van-swipe-cell :right-width="65">
          <!--<span slot="left">选择</span>-->
          <van-cell-group>
            <div class="item">
              <div class="left">
                <img :src="item.shop.shopimg" alt="">
                <div class="info">12</div>
              </div>
              <div class="right">
                <div class="top">
                  <div class="left">{{item.shop.shopname}}</div>
                  <div class="right">{{item.updatedAt}}</div>
                </div>
                <div class="bottom">{{item.lastmsg}}</div>
              </div>
            </div>
          </van-cell-group>
          <span slot="right">
          <div class="delete">删除聊天</div>
        </span>
        </van-swipe-cell>
        <!--<div v-if="!userinfo.chat1.length" class="nomessage">暂无聊天消息</div>-->
      </div>


      <div   v-for="(item,index) in userinfo.chat2"
             @click="gochat(item.objectShop,item.objectFrom,item.objectTo,item.shop.shopname)" v-if="!active">
        <van-swipe-cell :right-width="65">
          <!--<span slot="left">选择</span>-->
          <van-cell-group>
            <div class="item">
              <div class="left">
                <img :src="item.shop.shopimg" alt="">
                <div class="info">12</div>
              </div>
              <div class="right">
                <div class="top">
                  <div class="left">{{item.shop.shopname}}</div>
                  <div class="right">{{item.updatedAt}}</div>
                </div>
                <div class="bottom">{{item.lastmsg}}</div>
              </div>
            </div>
          </van-cell-group>
          <span slot="right">
          <div class="delete">删除聊天</div>
        </span>
        </van-swipe-cell>

      </div>
      <div v-if="active?!userinfo.chat1.length:!userinfo.chat2.length" class="nomessage">暂无聊天消息</div>
    </div>
  </div>
</template>

<script>
  import {Tab, Tabs} from 'vant';
  import Vue from 'vue'
  import {SwipeCell} from 'vant';

  Vue.use(SwipeCell);
  Vue.use(Tab).use(Tabs);
  export default {
    name: "index",
    data() {
      return {
        userinfo: {},
        active: true,
      }
    },
    methods: {
      gochat(shop, fromid,toid,shopname) {
        console.log(shop, fromid,toid,shopname)
        this.$router.push({path: '/chat', query: {id: shop, shopname,fromid,toid}})
      },
      onClick(index, title) {
        if (title == '个人信息') {
          this.active = true
        }
        else {
          this.active = false
        }
      },
      getuser() {
        this.$axios.get('/user/message').then(res => {
          if (res.code == 200) {
            let chat1 = []
            let chat2 = []
            res.data.chat.forEach(i => {
              i.updatedAt = this.$axios.transformtime(i.updatedAt)
              i.lastmsg = i.content[i.content.length - 1].content
              if (i.objectFrom == res.data._id) {
                chat1.push(i)
              }
              else {
                chat2.push(i)
              }
            })
            this.userinfo = res.data
            this.userinfo.chat1 = chat1
            this.userinfo.chat2 = chat2
          }
        })
      }
    },
    created() {
      this.getuser()
    }
  }
</script>

<style scoped lang="scss">
  .nomessage{
    background: none;
    width: 7.5rem;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
  }
  .delete {
    width: 65px;
    background: #ff4444;
    color: white;
    line-height: 1.5rem;
    text-align: center;
    height: 1.5rem;
  }

  .message {
    overflow: hidden;
    .header {
      position: fixed;
      width: 7rem;
      top: .2rem;
      left: 0;
      background: none;
      padding: .25rem;
      height: .5rem;
      text-align: center;
      .van-ellipsis {
        text-align: center;
      }
    }
    .main {
      width: 7.5rem;
      background-color: white;
      margin-top: 2rem;
      .item {
        padding: .25rem;
        display: flex;
        .left {
          width: 1rem;
          height: 1rem;
          position: relative;
          img {
            width: 1rem;
            height: 1rem;
            border-radius: 5px;
          }
          .info {
            position: absolute;
            padding: 2px;
            border: 1px solid #fff;
            top: -5px;
            right: -5px;
            font-size: 12px;
            line-height: 12px;
            text-align: center;
            width: 12px;
            height: 12px;
            background-color: red;
            color: white;
            border-radius: 50%;
          }
        }
        .right {
          width: 5.8rem;
          margin-left: .2rem;
          height: 1rem;
          .top {
            width: 5.8rem;
            height: .5rem;
            display: flex;
            .left {
              width: 3rem;
              height: .5rem;
              line-height: .5rem;
              font-size: 16px;
              text-align: left;
            }
            .right {
              width: 2.8rem;
              height: .5rem;
              line-height: .5rem;
              font-size: 12px;
              text-align: right;
            }
          }
          .bottom {
            width: 6rem;
            height: .5rem;
            line-height: .5rem;
            color: #555;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box; //将元素设为盒子伸缩模型显示
            -webkit-box-orient: vertical; //伸缩方向设为垂直方向
            -webkit-line-clamp: 1; //超出3行隐藏，并显示省略号
          }
        }
      }
    }
  }
</style>
