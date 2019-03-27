<template>
    <div class="settings">
        <blog-header></blog-header>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import BlogHeader from '../components/BlogHeader'
    import BlogFooter from '../components/BlogFooter'
    export default {
        name: 'settings',
        components: {
            BlogHeader,
            BlogFooter
        }
    }
</script>

<style scoped>

</style>