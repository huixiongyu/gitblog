<template>
    <div class="settings">
        <blog-header></blog-header>
        <div class="useradmin-nav">
            <Menu mode="horizontal" :theme="light" active-name="1">
                <MenuItem name="1" to="/useradmin/profile">
                    <Icon type="md-settings" />
                    Profile
                </MenuItem>
                <MenuItem name="2" to="/useradmin/comment">
                    <Icon type="md-chatboxes" />
                    Comment
                </MenuItem>
            </Menu>
        </div>
        <router-view></router-view>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import BlogHeader from '../components/BlogHeader'
    import BlogFooter from '../components/BlogFooter'
    export default {
        name: 'useradmin',
        components: {
            BlogHeader,
            BlogFooter
        }
    }
</script>

<style lang="less" scoped>
    .useradmin-nav{
        position: relative;
        width: 240px;
        height: 30px;
        left: 50%;
        margin-left: -120px;
        margin-top: 20px;
    }
</style>