<template>
    <div class="main-content">
        <Menu active-name="overview" mode="horizontal" width="840px">
            <MenuItem name="overview" to="/">Overview</MenuItem>
            <MenuItem name="posts" to="/posts">Posts</MenuItem>
            <MenuItem name="categories" to="/categories">Categories</MenuItem>
            <MenuItem name="tags" to="/tags">Tags</MenuItem>
            <MenuItem name="followers" to="/followers">Followers</MenuItem>
            <MenuItem name="aboutme" to="/aboutme">About</MenuItem>
        </Menu>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="less">
.main-content{
    width: 852px;
    height: 1000px;
    margin-left: -35px;
}

</style>
