<template>
    <div class="main-content">
        <Menu :active-name="activeName" 
                @on-select="selectItem"
                mode="horizontal" 
                style="width: 100%">
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
    data(){
        return {
            activeName: 'overview'
        }
    },
    methods: {
        selectItem(name){
            localStorage.setItem('currentTab', name);
            // console.log(name);
        }
    },
    created(){
        const name = localStorage.getItem('currentTab');
        if(name){
            this.activeName = name;
        }
    }
}
</script>
<style lang="less">
.main-content{
    width: 730px;
}

</style>
