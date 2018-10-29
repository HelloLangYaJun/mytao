<template>
  <div class="openshop-main">
    <Header :headerinfo="headerinfo"></Header>
    <div class="stepe">
      <van-steps :active="active">
        <van-step>店铺信息</van-step>
        <van-step>选择分类</van-step>
        <van-step>商品信息</van-step>
        <van-step>提交完成</van-step>
      </van-steps>
    </div>

    <!--注册第一步-->
    <div class="shopinfo" v-if="active==0">
      <div class="title">
        <van-cell-group>
          <van-field
            v-model="activeinfo[0].shopname"
            required
            clearable
            label="店铺名字"
            icon="question"
            placeholder="请输入店铺名字"
            @click-icon="$toast('例如（迪奥正品旗舰店）')"
          />
          <van-field
            v-model="activeinfo[0].shopdetail"
            required
            clearable
            label="店铺介绍"
            icon="question"
            placeholder="请输入店铺介绍"
            @click-icon="$toast('加入关键词，便于搜索引擎抓取,例如（Dior/迪奥烈艳蓝金唇膏3.5g哑光滋润旗舰口红520/999正品专营店）')"
          />
        </van-cell-group>
      </div>
      <div class="uoloader">
        <div class="uoloader-title">添加您的店铺首页头图</div>
        <div class="uoloader-img">
          <img v-if="activeinfo[0].imageUrl" :src="activeinfo[0].imageUrl" class="avatar">
          <el-upload
            class="avatar-uploader"
            action="https://upload-z1.qiniup.com"
            :show-file-list="false"
            :data="ToKen"
            :on-success="handleAvatarSuccess">
            <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
            <i class="el-icon-plus avatar-uploader-icon" v-if="!activeinfo[0].imageUrl"></i>
          </el-upload>
        </div>
      </div>


      <div class="uoloader">
        <div class="uoloader-title">添加您的店铺轮播图（最多四张）</div>
        <div class="uoloader-img">
          <div v-for="(item,index) in activeinfo[0].imgList" :key="index" class="itemimg">
            <img :src="item" class="avatar">
          </div>
          <el-upload
            class="avatar-uploader"
            action="https://upload-z1.qiniup.com"
            :show-file-list="false"
            :data="ToKen"
            :on-success="handleAvatarSuccess2">
            <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </div>


    <!--注册第二步-->
    <div class="shopinfo" v-if="active==1">
      <div class="shoptype">
        店铺分类：
        <el-select v-model="activeinfo[1].shopinfovalue" placeholder="请选择">
          <el-option
            v-for="item in shopinfo"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="goodstype">
        商品分类：
        <el-select v-model="activeinfo[1].goodstypevalue" placeholder="请选择">
          <el-option
            v-for="item in goodstypeinfo"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>

    <!--注册第三步-->
    <div class=" shopinfo shopinfo-3"  v-if="active==2" >
       <div class="item" v-for="(item,index) in activeinfo[2].goods">
         <div class="left">
           <img :src="item.goodsimg" alt="">
         </div>
         <div class="right">
          <div class="goodsname ">{{item.goodsname}}</div>
           <div class="goodsprice">价格：{{item.goodsprice}}</div>
         </div>
       </div>
      <div class="item">
        <div class="left">
          <el-upload
            class="avatar-uploader"
            action="https://upload-z1.qiniup.com"
            :show-file-list="false"
            :data="ToKen"
            :on-success="addgoodsimg">
            <img v-if="goodsimg" :src="goodsimg" class="avatar">
            <i class="el-icon-plus avatar-uploader-icon" v-if="!goodsimg"></i>
          </el-upload>
        </div>
        <div class="right">
          <div class="goodsname ">
            <input type="text" placeholder="输入商品名" v-model="goodsname">
          </div>
          <div class="goodsprice">
            价格：<van-stepper v-model="goodsprice" /></div>
        </div>
        <div class="add">
          <button @click="addgoods">添加商品</button>
        </div>
      </div>
    </div>

    <div class="shopinfo-4" v-if="active==3">
      <div class="main">
        填写完成，提交你的商铺吧！
      </div>
    </div>
    <button class="next-button" @click="next">{{active==3?'提交':"下一步"}}</button>
  </div>
</template>

<script>
  import { Picker } from 'vant';
  Vue.use(Picker);
  import {Field} from 'vant';
  import Header from '../../components/header'
  import { Toast } from 'vant';
  Vue.use(Field);
  import {Step, Steps} from 'vant';
  import axios from 'axios'
  import Vue from 'vue'
  import { Stepper } from 'vant';
  Vue.use(Stepper);
  Vue.use(Step).use(Steps);
  export default {
    name: "index",
    data() {
      return {
        headerinfo: '注册店铺',
        active: 0,
        ToKen: {},
        goodsimg:'',
        goodsname:'',
        goodsprice:0,

        activeinfo: [
          {
            imageUrl: '',
            imgList: [],
            shopname: '',
            shopdetail: ''
          },
          {
            shopinfovalue: '',
            goodstypevalue: '',
          },{
            goods:[

            ],
          }
        ],
        shopinfo: [{
          value: 1,
          label: '天猫'
        }, {
          value: 2,
          label: '聚划算'
        }, {
          value: 3,
          label: '天猫国际'
        }, {
          value: 4,
          label: '淘抢购'
        }, ],

        goodstypeinfo: [{
          value: 1,
          label: '男装'
        }, {
          value: 2,
          label: '女装'
        }, {
          value: 3,
          label: '化妆品'
        }, {
          value: 4,
          label: '生活用品'
        }, {
          value: 5,
          label: '其他'
        },
        ],
      };
    },
    components: {Header},
    methods: {
      addgoods(){
        if(this.goodsimg&&this.goodsname&&this.goodsprice){
          this.activeinfo[2].goods.push(
            {
              goodsimg:this.goodsimg,
              goodsname:this.goodsname,
              goodsprice:this.goodsprice
            }
          )
          this.goodsimg=''
          this.goodsname=''
          this.goodsprice=0
        }
        else{
          Toast('信息缺省')
        }
      },
      addgoodsimg(res, file){
        this.goodsimg=res.url
      },
      handleAvatarSuccess(res, file) {
        this.activeinfo[0].imageUrl = res.url;
      },
      handleAvatarSuccess2(res, file) {
        if (this.activeinfo[0].imgList.length <= 3) {
          this.activeinfo[0].imgList.push(res.url)
        }
        else {
          Toast('最多添加四张')
        }
      },
      next() {
        if (this.active == 3) {
          console.log({
            shopname:this.activeinfo[0].shopname,
            shopdetail:this.activeinfo[0].shopdetail,
            shopimg:this.activeinfo[0].imageUrl,
            shopimgs:this.activeinfo[0].imgList,
            shoptype:this.activeinfo[1].shopinfovalue,
            goodstype:this.activeinfo[1].goodstypevalue,
            goods:this.activeinfo[2].goods,
          })
          this.$axios.post('/shop/add',{
            shopname:this.activeinfo[0].shopname,
            shopdetail:this.activeinfo[0].shopdetail,
            shopimg:this.activeinfo[0].imageUrl,
            shopimgs:this.activeinfo[0].imgList,
            shoptype:this.activeinfo[1].shopinfovalue,
            goodstype:this.activeinfo[1].goodstypevalue,
            goods:this.activeinfo[2].goods,
          }).then(res=>{
            if(res.code==200){
              Toast.success('恭喜成为淘宝店主')
              this.$router.push('/')
            }
          })
        }
        else {
          var flag=true
          for (var i in this.activeinfo[this.active]) {
            if(!this.activeinfo[this.active][i]|this.activeinfo[this.active][i].length<1){
              flag=false
            }
          }
          if(flag){
            this.active+=1
          }
          else {
            Toast('请将信息填写完整')
          }
        }
      }
    },
    created() {
      axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        this.ToKen = {token: res.data.data}
        console.log(this.ToKen)
      })
    }
  }
</script>

<style scoped lang="scss">
  .shopinfo{
    width: 7rem;
    padding: 0 .25rem;
  }
  .shopinfo-4{
    .main{
      width: 7rem ;
      padding: .25rem;
      height: 5rem;
      color: #5daf34;
      line-height: 5rem;
      text-align: center;
      font-size: 20px;
    }
  }
  .shopinfo-3{
   >.item{
     background-color: white;
     margin: .2rem 0;
     display: flex;
     .left{
       width: 2rem;
       height: 2rem;
       padding: .2rem;
       img{
         width: 2rem;
         height: 2rem;
       }
     }
     .right{
       .goodsname{
         line-height: 1.2rem;
         height: 1.2rem;
         input{
           height: .6rem;
           border: 1px solid #f40;
         }
       }
       .goodsprice{
         line-height: 1.2rem;
         color: red;
         height: 1.2rem;
         display: flex;
       }
     }
     .add{
       height: 2.4rem;
       button{
         height: 2.4rem;
         margin-left: .2rem;
         color: white;
         text-align: center;
         background-color: #f40;
         border: 1px solid #ccc;
       }
     }
   }
  }
  .next-button {
    position: fixed;
    bottom: .8rem;
    height: .8rem;
    width: 3rem;
    left: 2rem;
    line-height: .8rem;
    color: #555;
    text-align: center;
    background-color: white;
    border: 1px solid #ccc;
  }

  .avatar-uploader, .el-upload {
    border: 1px dashed #d9d9d9;
    width: 2rem;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
  }

  .avatar {
    width: 2rem;
    height: 2rem;
    display: block;
  }

  .stepe {
    margin-top: 44px;
  }

  .uoloader {
    width: 7rem;
    padding: 0 .25rem;
    background-color: white;
    border-radius: 10px;
    margin-top: .2rem;

    .uoloader-title {
      width: 7rem;
      padding: .25rem 0;
    }
    .uoloader-img {

      .itemimg {
        float: left;
      }
    }
  }
</style>
