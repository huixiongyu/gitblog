<template>
    <div class="home">
        <blog-header></blog-header>
        <Row class="mainpage">
            <i-col span="3" offset="3">
                <left-side></left-side>
            </i-col>
            <i-col span="16" offset="2">
                <main-page></main-page>
            </i-col>
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
                location.reload();
                vm.$router.go(0);
            })
        }else{
            next();
        }

    }
}
</script>

<style scoped>
    .mainpage{
        width: 100%;
        height: 100%;
        float: left;
    }
</style>