<template>
  <div class="chat">
    <Header :headerinfo="headerinfo"></Header>
    <div class="main">
      <div class="item" v-for="(item,index) in userinfo.chat">
        <div class="left">
          <img src="" alt="">
        </div>
        <div class="middle"></div>
        <div class="right"></div>
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

  export default {
    name: "index",
    data() {
      return {
        headerinfo: '134224',
        userinfo: {},
        message: '',
        shopinfo:''
      }
    },
    methods: {
      addchat() {
        var goEasy = new GoEasy({appkey: 'BC-7d9035dedb414809ab92f67f049b8c46'});
        this.$axios.post('/user/addchat', {
          userid: this.userinfo._id,
          shopid: this.shopinfo._id,
          content: this.message,
          type: true,
        }).then(res => {
          if (res.code == 200) {
            goEasy.publish({
              channel: this.shopinfo.shopkeeper,
              message: this.message
            });
            Toast.success(res.msg)
          }
        })
      },
      getuser() {
        this.$axios.get('/user').then(res => {
          if (res.code == 200) {
            let chat=[]
            res.data.chat.forEach(i=>{
              if(i.objectshop==this.$route.query.id){
                chat.push(i)
              }
            })
            this.userinfo = res.data
            this.userinfo.chat=chat
          }
        })
      },
      getshop(){
        this.$axios.get(`/shop/${this.$route.query.id}`).then(res=>{
          if (res.code == 200) {
            this.shopinfo = res.data
          }
        })
      }
    },
    components: {Header},
    created() {
      this.getuser(),
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
      .item{
        display: flex;
        .left{
          width:1rem ;
          height: 1rem;
        }
        .middle{
          width:5rem ;
        }
        .right{
          width:1rem ;
          height: 1rem;
        }
      }
    }
  }
</style>
