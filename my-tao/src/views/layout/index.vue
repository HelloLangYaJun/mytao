<template>
  <div class="layout">

    <router-view></router-view>

    <div class="tabbar">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="shop"  @click="gorouter('/',false,true)">
          <span>首页</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon1.active : icon1.normal"
          >
        </van-tabbar-item>
        <van-tabbar-item icon="chat"  info="15" @click="gomessage">
          <span>消息</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon2.active : icon2.normal"
          ></van-tabbar-item>
        <van-tabbar-item icon="records" info="5">
          <span>购物车</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon3.active : icon3.normal"
          >
        </van-tabbar-item>
        <van-tabbar-item icon="gold-coin" @click="gorouter('/myinfo',true,false)" >
          <span>我的小淘</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon4.active : icon4.normal"

          >
        </van-tabbar-item>
      </van-tabbar>


    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Tabbar, TabbarItem } from 'vant';
  import { Toast } from 'vant';
  Vue.use(Toast);
  Vue.use(Tabbar).use(TabbarItem);
  import iconone from '../../assets/icon/shop.svg'
  import icontwo1 from '../../assets/icon/message.svg'
  import icontwo2 from '../../assets/icon/message2.svg'
  import iconthree1 from '../../assets/icon/shopCar1.svg'
  import iconthree2 from '../../assets/icon/shopCar2.svg'
  import iconfore1 from '../../assets/icon/mytao1.svg'
  import iconfore2 from '../../assets/icon/mytao2.svg'
  export default {
    name: "index",
    data() {
      return {
        images: [
          'https://aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg',
          'https://img.alicdn.com/tps/i4/TB1UXPJj9zqK1RjSZFpwu1kSXXa.png_q90_.webp'
        ],
        active: 0,
        icon1: {
          normal: iconone,
          active: 'data:image/webp;base64,UklGRtIFAABXRUJQVlA4WAoAAAAQAAAAOwAAOwAAQUxQSC0BAAANT8OwbdtIJ7nt/fuvm3SKiMiDLS0tfSHhpOWhRpaxMpexJsFFhZbtNYopea2fCotyUgtx0JEYNqDbtq0s2XR3d2MrYYvYdHd3vv8LNOh3fjtGRP8Tu2yjx2FWcfD3WauUSVaXOMRy3inAEFdtcbhb9znsCyMGMMpxhdMPU+yI42CcFzKfTbARxEHh953PsGK9gOZEF8XKbgVROFFm34JKGHjWa0HmzXtAJ7TbQGg3gdCsAaFaBEI5KKWgZOG/4AyUo4EMdP2GFnT1ohV0pYwDdOmUiw+qQaGd84MqhtVjQAya3hdWldgTCxSLIDbvvEtQRFnYLK4NVywwvYiMsTO/mb3KwGwnwMLe8vPj4lQG5ro/3zhYf0uaHWa1UoIVT4jfjqdYDfvNYraGPQAAAFZQOCB+BAAA0BYAnQEqPAA8AD6JOJdHpSOiISwYDzCgEQlsAMa1QVheDH3H8XPw5+Turf2PgFjqelPwPOV8wD9H/Mz/WD3AeYD9o/Vy/wH6ze4D9bPYA/aPrAPQA/Yj0zP2V+C/9zP3O9ph5Lo122ryda/Zofj9+p+mZ9hnogfsAj1tQXuVcitM5RQRoK4Bz6pXzH/zUc4VrcbDF0986A/R1QF3urllnqUU+UC1cMLEKOGPIeGWdCiBjsLBn+EB+lsEDEnn8ywA/v6/y7bkzLN/krBc33mDwaOzw6inxwQ2JrG4taZSSft5W/k4oFIMRWk8D/5VwIcOGueTfZ5aV1IZ/+lhUKfQfiUFyLveN4O7U1vHXMWO7V/ix06/O3zrhj/iJrPqF4FfjYv7JqXCypcE3zIXAwn+4/PMKZ51mYYKwdGEFC/YCq2e7k1K3zvTDfyJEM8j06UYQ6cbx+lSyZaGjVyZmrTOPN97ke5p+EMbmN9cJjoqWYNZ0Nruzijk4rtTJC35Y2/sBePYdqbm8jop8aLGu/LhKmU6cSjBdCjkejimS8K/q9zeptKioHz2CzkDfEeNAZNa7OMjN5jZ6fahqMTSsfF8/kZZHAhc0BKFqIPSee+POyPv3npNB6KL9RQw9QMupGBIPjM1O7VPSe5m/fvQGcj5ODMyyVuStIB8C3E7/w3dnFzUwtW/Tjxts3VtLSeWLiYHtIT6ipw5fb048qoC9FcQJap5gNhOt4/J9tkyB35CkEx7labVClYVDF4VbrxKotehrZu0CB8viRnZxoqwS6jyyvSAGb8E8F/ktk3u36OzTffqJ08g/b/6f4mWMfMfBIiVQhf4LrmCyqgUPdqxqagfg9deMHTJTZwO+snYPBQO4sQNej3UFoBH97UkJ77xXA5rDYmqUhEWN/2pikatYMXnl8gT/il8nUZ30udx/Ly/qICtacT6ITXlf4wN9BlwXJEjDd+yUzpgqAQyfeHHLRylz7SCOHBP3k2sxy0Zw1ihuNYsizlkGRwOG8dx6FtOUBQU2acvdvE9EjqIOrvzt0/oshM2wKxAiX6d2Kue6Bb02Rbe1gPoLFrMNRrAh+K0qtI/s5S4vApopBWWYzUryIawg/qyHLsAG3zfJd+7yndRi8SFc8U0kWXVaNWozdZESUbeDycER437GxzDLSFIJv+wGr9Hx9dCB9mT8xoSzovU0BlCd9CJB45NfEBuCuQ+OSKK3SPQdVWIfzzsvOzpi0yTcJ8aq9K8shP0R6SbBYLN7aBqORmktnHAx8oAer9vgel9MUebUSlFaOqRGdncFe836BHHlpop6wF7MHw7QFjCRUey6N2Xp8BDA6nMx7+/juDC7/a0gyzu59G+tFuQ9euKcxIRJ3My/tzx2PyBBma8rUDafyKangqwmHLiYwpD6/7z117KfgarAvvMpkSbNpa0qFD8pwhGzg97GDHm5AAAAFQjxvzt5qLwyHPdV9VgM+epHXH2V9GytP10q238TxwtvKy75X8zR74vXM7fZbJ/zrn2V1+/+MgADOZX4jAAAA=='
        },
        icon2: {
          normal: icontwo1,
          active: icontwo2
        },
        icon3: {
          normal: iconthree1,
          active: iconthree2
        },
        icon4: {
          normal: iconfore1,
          active:iconfore2
        },
        isheader:true,
        islogin:false,
        userinfo:{}
      }
    },
    methods:{
      gomessage(){
        if( this.islogin==false){
          this.$router.push('/login')
        }
        else {
          this.$router.push('/message')
        }

      },
      getlogin(){
        this.$axios.get('/user').then(res=>{
          if(res.code==200){
            this.islogin=true
            function  socket(){
              goEasy.subscribe({
                channel: res.data._id,
                onMessage: function(message){
                  Toast('你有一个新的消息')
                }
              });
            }
            socket()
            this.userinfo=res.data
          }
          else {
            this.islogin=false
          }
        })
      },
      gorouter(path,islogin,isheader){
        if(islogin){
          if(this.islogin){
            this.isheader=isheader
            this.$router.push(path)
          }
          else {
            Toast('未登录，即将跳转登录界面');
            window.setTimeout(()=>{
              this.$router.push('/login')
            },500)
          }
        }
        else {
          this.isheader=isheader
          this.$router.push(path)
        }
      }
    },
    created(){
      this.getlogin()

    }
  }
</script>

<style scoped lang="scss">
  .layout {
    .tabbar {
      position: fixed;
      bottom: 0px;
      width: 7.5rem;
      height: 1rem;
      border-top: 1px solid #eee;
      background-color: white;
      img {
        width: .5rem;
        height: .5rem;
      }
    }
  }
</style>
