<template>
  <div id="app">
    <blog-header></blog-header>
    <Row class="mainpage">
       <i-col span="3" offset="4">
         <left-side></left-side>
       </i-col>
       <i-col span="15" offset="2">   
           <main-page></main-page>     
      </i-col> 
    </Row>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import BlogHeader from './components/BlogHeader'
import LeftSide from './components/LeftSide'
import MainPage from './components/MainPage'
import BlogFooter from './components/BlogFooter'
export default {
  components: {
    BlogHeader,
    LeftSide,
    MainPage,
    BlogFooter
  }
}
</script>

<style lang="less">
.mainpage{
  width: 100%;
  height: 100%;
  float: left;
}
</style>
