<template>
    <div class="home">
        <blog-header></blog-header>
        <div class="mainpage">
            <div class="container">
                <left-side></left-side>
                <main-page></main-page>
            </div>
        </div>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader'
import LeftSide from '../components/LeftSide'
import MainPage from '../components/MainPage'
import BlogFooter from '../components/BlogFooter'
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
    .home{
        width: 100%;
        min-height: 743px;
    }
    .mainpage{
        width: 100%;
        height: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        .container{
            width: 1500px;
            display: inline-flex;
            justify-content: center;
        }
    }
</style>