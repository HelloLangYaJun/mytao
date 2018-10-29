<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.shopimgs" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.shopdetail }}</div>
        <div class="goods-price">{{'¥'+ goods.goods[0].goodsprice }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：包邮</van-col>
        <!--<van-col span="14">剩余：{{ goods.remain }}</van-col>-->
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
      <van-goods-action-mini-btn icon="chat" @click="sorry">
        客服
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" @click="onClickCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="sorry">
        加入购物车
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="sorry">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>

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
      showBase:false,
      goods: {
        // title: '美国伽力果（约680g/3个）',
        // price: 2680,
        // express: '免运费',
        // remain: 19,
        // thumb: [
        //   'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
        //   'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        // ]
      },

    };
  },

  methods: {
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
        }
      })
    },
    onClickCart() {
      this.$router.push('cart');
    },

    sorry() {
      Toast('暂无后续逻辑~');
    }
  },
  created(){
    this.getgoods(this.$route.query.id)
  }
};
</script>

<style  lang="scss">
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
