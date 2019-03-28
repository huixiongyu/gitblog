<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import jwt_decode from "jwt-decode";
  export default {
    name : 'app',
    methods: {
      initData(){
        // 解析token
        if(localStorage.blogToken){
          const token = localStorage.getItem('blogToken')
          console.log(token);
          const decode = jwt_decode(token);
          localStorage.setItem('user', JSON.stringify(decode));
          // 存储数据
          this.$store.commit("setLogin", decode);
          this.$store.commit("setUser", decode);
          this.$store.commit("judgeIdentity", decode);
          console.log('store设置成功')
        }
      }
    },
    created() {
      this.initData();
    }
  }
</script>

