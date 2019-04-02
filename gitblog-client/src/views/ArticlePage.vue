<template>
    <div class="article-page">
        <blog-header></blog-header>
        <post></post>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import BlogHeader from '../components/BlogHeader'
    import Post from '../components/Post'
    import BlogFooter from '../components/BlogFooter'
    export default {
        name: "ArticlePage",
        components: {
            BlogHeader,
            Post,
            BlogFooter
        }
    }
</script>

<style lang="less">
    .article-page{
        width: 100%;
    }
</style>