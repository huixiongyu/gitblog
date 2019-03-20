<template>
  <div id="app">
    <blog-header></blog-header>
    <Row class="mainpage">
        <left-side></left-side>
    </Row>
   <!-- <router-view></router-view> -->
  </div>
</template>

<script>
// import login from './views/Login'
// import reset from './views/Reset'
import BlogHeader from './components/BlogHeader'
import LeftSide from './components/LeftSide'
export default {
  components: {
    BlogHeader,
    LeftSide
  }
}
</script>

<style lang="less">
</style>
