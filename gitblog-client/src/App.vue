<template>
  <div id="app">
    <blog-header></blog-header>
    <Row class="mainpage">
        <Col span="6" offset="4" class="left-side">
          <left-side></left-side>
        </Col>
        <Col span="10">col-12</Col>
        <Col span="4"></Col>
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
.left-side{
  width: 100%;
  background-color: greean;
}
</style>
