<template>
    <div class="shops">
      <div class="header">
        <input type="text" class="shousuo" v-model="findstr">
        <i class="shousuo-icon" @click="getallshops(findstr)"></i>
      </div>
      <div class="tabbar">
        <van-tabs v-model="active" @click="onClick">
          <van-tab title="所有"></van-tab>
          <van-tab title="男装"></van-tab>
          <van-tab title="女装"></van-tab>
          <van-tab title="化妆品"></van-tab>
          <van-tab title="生活用品"></van-tab>
          <van-tab title="其他"></van-tab>
        </van-tabs>
      </div>
  <div class="container">
    <div class="left">
      <div class="tishi item">搜索结果有点少，别着急，下面有你喜欢的哦</div>
      <div class="item" v-for="(item,index) in leftshops" @click="goshop(item._id)">
        <div class="top">
          <img :src="item.shopimg" alt="">
        </div>
        <div class="bottom">
          {{item.shopdetail}}
        </div>
      </div>
    </div>
    <div class="right" >
      <div class="item" v-for="item in rightshops" @click="goshop(item._id)">
        <div class="top">
          <img :src="item.shopimg" alt="">
        </div>
        <div class="bottom">
          {{item.shopdetail}}
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
  import { Tab, Tabs } from 'vant';
  import Vue from 'vue'
  Vue.use(Tab).use(Tabs);
    export default {
        name: "index",
      data(){
        return{
          leftshops:[],
          rightshops:[],
          shoptype:1,
          goodstype:null,
          findstr:'',
          active:0
        }
      },
      methods:{
        onClick(index){
          this.goodstype=index
          this.gettypeshop()
        },
          goshop(id){
            this.$router.push({path:'/goods',query:{id:id}})
          },
        getallshops(str){
          this.$axios.post('/shop/regfind',{findstr:str}).then(res=>{
            if(res.code==200){
              this.rightshops=[]
              this.leftshops=[]
              res.data.forEach((i,index)=>{
                if((index+1)%2){
                  this.rightshops.push(i)
                }
                else {
                  this.leftshops.push(i)
                }
              })
            }
          })
        },
        gettypeshop(){
          let obj={
          }
          if(this.$route.query.type){
            obj.shoptype=this.$route.query.type
          }
          if(this.goodstype){
            obj.goodstype=this.goodstype
          }
            this.$axios.post('/shop/find',obj).then(res=>{
              if(res.code==200){
                this.rightshops=[]
                this.leftshops=[]
                res.data.forEach((i,index)=>{
                  if((index+1)%2){
                    this.rightshops.push(i)
                  }
                  else {
                    this.leftshops.push(i)
                  }
                })
              }
            })
        }

      },
      created(){
          if(this.$route.query.findstr){
            this.getallshops(this.$route.query.findstr)
          }
          else {
            this.gettypeshop()
          }
      }
    }
</script>

<style scoped lang="scss">
  .shops{
    width: 7rem;
    padding: .25rem;
    display: flex;
    flex-flow:  wrap;
    .tabbar{
      text-align: center!important;
      position: absolute;
      top: 1rem;
      left: 0px;
      height: 1rem;
      width: 7.5rem;
    }
    .header {
      width: 7.5rem;
      height: 1rem;
      position: absolute;
      left: 0;
      top: 0;
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
    .container{
      display: flex;
      margin-top: 2rem;
    }
    .left{
      width: 3.3rem;
      padding: .1rem;
    }
    .right{
      width: 3.3rem;
      padding: .1rem;
    }
    .item{
      width: 3.1rem;
      height: 4rem;
      padding: .1rem;
      margin-bottom: .1rem;
      background-color: white;
      .top{
        width: 3.1rem;
        height: 3.5rem;
        img{
          width: 3.1rem;
          height: 3.5rem;
        }
      }
      .bottom{
        width: 3.1rem;
        height: .5rem;
        line-height: .5rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .tishi{
      height: 1rem;
      background-color: transparent;
    }
  }
</style>
