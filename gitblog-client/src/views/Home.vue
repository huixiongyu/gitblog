<template>
    <div class="home">
        <blog-header></blog-header>
        <Row class="mainpage">
            <i-col span="3" class="main-haide">.</i-col>
            <i-col span="3">
                <left-side></left-side>
            </i-col>
            <i-col class="middle-page" span="16" offset="2">
                <main-page></main-page>
            </i-col>
            <i-col span="2" class="main-haide">.</i-col>
        </Row>
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
    },
    beforeRouteEnter(to, from, next) {
        if(from.name === 'signin'){
            next(vm => {
                setTimeout(function () {
                    location.reload();
                    vm.$router.go(0);
                }, 1000);
            })
        }else{
            next();
        }

    }
}
</script>

<style lang="less">
    .home{
        width: 100%;
        height: 100%;
    }
    .mainpage{
        width: 100%;
        height: 100%;
        clear: both;
        margin-top: 20px;
    }
    .main-haide{
        color: white;
    }
</style>