<template>
    <div>
      <div class="header">
        <i class="back" @click="back"></i>
        {{headerinfo}}
      </div>
    </div>
</template>

<script>
    export default {
        name: "Header",
      props:['headerinfo'],
      methods:{
        back(){
          this.$router.go(-1)
        },
      }
    }
</script>

<style scoped lang="scss">
  .header {
    text-align: center;
    position: fixed;
    color: white;
    line-height: 34px;
    font-size: 16px;
    width: 100%;
    top: 0px;
    height: 34px;
    padding: 5px;
    z-index: 999;
    background-color: #c50206;
    .back{
      display: block;
      height: 34px;
      width: 40px;
      position: absolute;
      left: 20px;
      background: url("../assets/icon/返回_btn.png") no-repeat;
      background-position: 0px 10px;
    }
  }
</style>
