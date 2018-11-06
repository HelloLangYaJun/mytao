<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.shopimgs" :key="thumb">

        <img :src="thumb"  @click="lookimg(thumb)">
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.shopdetail }}</div>
        <div class="goods-price">{{'¥'+ goods.goods[0].goodsprice }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：包邮</van-col>
        <van-col span="14">已售：{{ goods.order.length }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">{{goods.shopname}}</span>
          <van-tag class="goods-tag" type="danger">{{goods.shoptype}}</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" @click="chat()">
        客服
      </van-goods-action-mini-btn>
      <div class="lookshop" @click="love">
        <img src="../../assets/icon/love.svg" alt="" v-if="!islove">
        <img src="../../assets/icon/loveactive.svg" alt="" v-if="islove">
      </div>
      <van-goods-action-big-btn @click="collection">
        {{this.iscollection?'已收藏':'收藏店铺'}}
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="showBase=true">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>
    <van-sku
      v-model="showBase"
      :sku="sku"
      :goods="goods"
      :hide-stock="false"
      :close-on-click-overlay="true"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
      @stepper-change="changeBuyNum"
    />


  <div class="openpasd" v-if="psdinput">
    <div class="zhezhao" @click="openasd">
    </div>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      info="请输入用户密码后六位"
      @focus="showKeyboard = true"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = true"
    />
  </div>
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn
} from 'vant';
import Vue from 'vue'
import { Sku } from 'vant';
import { ImagePreview } from 'vant';
import { PasswordInput, NumberKeyboard } from 'vant';
Vue.use(PasswordInput).use(NumberKeyboard);
Vue.use(Sku);
export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionBigBtn.name]: GoodsActionBigBtn,
    [GoodsActionMiniBtn.name]: GoodsActionMiniBtn
  },

  data() {
    return {
      psdinput:false,
      showKeyboard:true,
      userinfo:{},
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '商品款式', // skuKeyName：规格类目名称
            v: [

            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 0, // 价格（单位分）
            s1: '0', // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 999 // 当前 sku 组合对应的库存
          },
          {
            id: 2260, // skuId，下单时后端需要
            price: 0, // 价格（单位分）
            s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 999 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        none_sku: false, // 是否无规格商品
      },
      value:'',
      islove:false,
      iscollection:false,
      showBase:false,
      buyNum:1,
      goods: {

      },
      skuData:{}
    };
  },

  methods: {
    openasd(){
      this.psdinput=!this.psdinput
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if(this.value.length==6){
        alert('ok')
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    lookimg(img){
      ImagePreview([
        img
      ]);
    },
    chat(){
      if(this.userinfo._id==this.goods.shopkeeper){
        Toast('这是你自己的店')
      }
      else {
        this.$axios.post('/user/addchatwin',{fromid:this.userinfo._id,toid:this.goods.shopkeeper,shopid:this.$route.query.id}).then(res=>{
          if(res.code==200){
            this.$router.push({path:'/chat',query:{id:this.$route.query.id,fromid:this.userinfo._id,toid:this.goods.shopkeeper,shopname:this.goods.shopname}})
          }
          else {
            Toast(res.msg)
          }
        })
      }
    },
    changeBuyNum(value){
      this.buyNum=value
    },
    onBuyClicked(skuData){
      skuData.selectedSkuComb.num=this.buyNum
      this.showBase=!this.showBase
      this.psdinput=!this.psdinput
      this.skuData=skuData
    },
    onAddCartClicked(){

    },
    love(){
     this.$axios.post('/user/love',{shopid:this.$route.query.id, type:!this.islove}).then(res=>{
       if(res.code==200){
         this.getuser()
         Toast.success(res.msg)
       }
       else {
         Toast.success(res.msg)
       }
     })
    },
    collection(){
      this.$axios.post('/user/collection',{shopid:this.$route.query.id, type:!this.iscollection}).then(res=>{
        if(res.code==200){
          this.getuser()
          Toast.success(res.msg)
        } else {
          Toast.success(res.msg)
        }
      })
    },
    getgoods(id){
      this.$axios.get(`/shop/${id}`).then(res=>{
        if(res.code=200){
          switch(res.data.shoptype)
          {
            case 1:
            res.data.shoptype='天猫'
              break;
            case 2:
              res.data.shoptype='聚划算'
              break;
            case 3:
              res.data.shoptype='天猫国际'
              break;
            case 4:
              res.data.shoptype='淘抢购'
              break;
            default:
              break;
          }
          this.goods=res.data
          res.data.goods.forEach((item,index)=>{
            item.name=item.goodsname
            item.id=index.toString()
            item.imgUrl=item.goodsimg
            item.price=item.goodsprice
            this.sku.tree[0].v[index]=item
            let obj={
              id: index, // skuId，下单时后端需要
              price: item.goodsprice*100, // 价格（单位分）
              name:item.name,
              trueprice:item.goodsprice,
              // num:this.buyNum,
              s1:index.toString(), // 规格类目 k_s 为 s1 的对应规格值 id
              stock_num: 999 // 当前 sku 组合对应的库存
            }
            this.sku.list[index]=obj
          })

        }
      })
    },
    onClickCart() {
      this.$router.push('cart',);
    },

    sorry() {
      Toast('暂无后续逻辑~');
    },
    socket(){
      var goEasy = new GoEasy({appkey: 'BC-7d9035dedb414809ab92f67f049b8c46'});
      goEasy.subscribe({
        channel: "mytao",
        onMessage: function(message){
          console.log(message);
        }
      });
      goEasy.publish({
        channel: "mytao",
        message: "Hello, GoEasy!"
      });
    },
    getuser(){
      this.islove=false
      this.iscollection=false
      this.$axios.get('/user').then(res=>{
        if(res.code==200){
          this.userinfo=res.data
          this.userinfo.loveshop.forEach(i=>{
            if(i==this.$route.query.id){
              this.islove=true
            }
          })
          this.userinfo.collectshop.forEach(i=>{
            if(i==this.$route.query.id){
              this.iscollection=true
            }
          })
        }
      })
    }
  },
  created(){
    // this.socket()
    this.getuser()
    this.getgoods(this.$route.query.id)
  }
};
</script>

<style  lang="scss">
  .openpasd{
    width: 7.5rem;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    /*display: none;*/
    .zhezhao{
      width: 7.5rem;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: black;
      opacity: .5;
    }
    /deep/.van-password-input__info{
      color: white;
    }
  }
  .lookshop{
    width: .6rem;
    height: 20px;
    padding: 15px;
    background-color: white;
    img{
      width: .6rem;
      height: 20px;
    }
  }
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 7.5rem;
      height: 7.5rem;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }
  &-tag {
    margin-left: 5px;
  }
}
</style>
