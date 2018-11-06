<template>
  <div class="chat">
    <Header :headerinfo="headerinfo"></Header>
    <div class="main">
      <div class="item" v-for="(item,index) in userinfo.chat">
        <div class="left">
          <img :src="isuser?shopinfo.shopimg:userinfo.avatar" alt="" v-if="!item.type">
        </div>
        <div class="middle">
          <div class="chatinfo">{{item.content}}</div>
        </div>
        <div class="right">
          <img :src="isuser?userinfo.avatar:shopinfo.shopimg" alt="" v-if="item.type">
        </div>
      </div>
      <div class="footer">
        <div class="input">
          <input type="text" v-model="message">
        </div>
        <div class="fasong">
          <button @click="addchat">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../../components/header'
  import {Toast} from 'vant'
  import Vue from 'vue'
  export default {
    name: "index",
    data() {
      return {
        headerinfo: '134224',
        userinfo: {},
        message: '',
        shopinfo: '',
        isuser:true,
      }
    },
    methods: {
      addchat() {
        this.$axios.post('/user/addchat',{
          fromid: this.$route.query.fromid,
          toid: this.$route.query.toid,
          shopid: this.$route.query.id,
          content: this.message,
          type: true,
        }).then(res => {
          if (res.code == 200){
            var goEasy = new GoEasy({
              appkey: "BC-33399e5de2994ce9b4d04cae765dccdf"
            });

            var cannel2=this.isuser?this.$route.query.toid : this.$route.query.fromid
            goEasy.publish({
              channel: cannel2,
              message: 'okok'
            });
            this.getuser()
            this.message = ''
            Toast.success(res.msg)
          }
        })
      },
      subscribe(){
        var goEasy = new GoEasy({
          appkey: "BC-33399e5de2994ce9b4d04cae765dccdf"
        });
        var cannel1=this.isuser? this.$route.query.fromid:this.$route.query.toid
        var that=this
        goEasy.subscribe({
          channel: cannel1,
          onMessage: function (message) {
            that.getuser()
          }
        });
      },
      getuser(){
        this.$axios.get('/user').then(res => {
          if (res.code == 200) {
            let chat = []
            res.data.chat.forEach(i =>{
              if (i.objectShop == this.$route.query.id &&i.objectFrom==this.$route.query.fromid&&i.objectTo==this.$route.query.toid) {
                chat=i.content
              }
            })
            this.userinfo = res.data
            this.userinfo.chat = chat
            if(this.$route.query.fromid==res.data._id){
              this.isuser=true
            }
            else {
              this.isuser=false
            }
          }
        })
      },
      getshop() {
        this.$axios.get(`/shop/${this.$route.query.id}`).then(res => {
          if (res.code == 200) {
            this.shopinfo = res.data
            this.getuser()
          }
        })
      }
    },
    components: {Header},
    created() {
      this.subscribe()
      this.getshop()
      this.headerinfo = this.$route.query.shopname
    }
  }
</script>

<style scoped lang="scss">
  .chat {
    height: 1rem;
    .main {
      margin-top: 44px;
      width: 7rem;
      padding: .25rem;
      .footer {
        position: fixed;
        border-top: 1px solid #ccc;
        bottom: 0px;
        width: 7rem;
        height: .5rem;
        left: 0;
        background-color: white;
        padding: .25rem;
        display: flex;
        .input {
          width: 5rem;
          height: .5rem;
          input {
            width: 4rem;
            height: .5rem;
            border: 1px solid #f40;
          }
        }
        .fasong {
          width: 2rem;
          height: .5rem;
          button {
            border: none;
            background-color: #f40;
            color: white;
            text-align: center;
            border-radius: 5px;
            width: 1rem;
            height: .5rem;
          }
        }
      }
      .item {
        display: flex;
        .left {
          width: 1rem;
          height: 1rem;
          img {
            width: 1rem;
            height: 1rem;
          }
        }
        .middle {
          width: 4.5rem;
          padding: .25rem;
          .chatinfo {
            background-color: white;
            text-indent: 1em;
            line-height: 1rem;
            border-radius: 10px;
          }
        }
        .right {
          width: 1rem;
          height: 1rem;
          img {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }
</style>
