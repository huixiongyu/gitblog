<template>
    <nav class="header">
        <div class="header-logo">
            <svg height="32" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
        </div>

        <div class="search-container">
            <input type="text" 
                    class="header-input" 
                    placeholder="Search or jump to ..."
                    @focus="handlefocus()"
                    @blur="handleblur()" >   
        </div>
        
        <div class="nav-link">
            <router-link to="/" tag="div" class="header-link">Archives</router-link>
            <router-link to="/" tag="div" class="header-link">Categories</router-link>
            <router-link to="/" tag="div" class="header-link">Tag</router-link>
            <router-link to="/" tag="div" class="header-link">Issues</router-link>
        </div>


    </nav>
</template>
<script>
export default {
    data(){
        return {
            flag: true
        }
    },
    methods: {
        handlefocus(){
            flag = false;
        },
        handleblur(){
            flag = true;
        }
    }
}
</script>
<style lang="less">
.header{
    width: 100%;
    height: 60px;
    background-color: #24292E;
}
.header-logo{
    float: left;
    height: 50px;
    padding-top: 13px;
    margin-left: 20px;
}
.header-input{
    float: left;
    margin-left: 15px;
    margin-top: 13px;
    width: 315px;
    height: 30px;
    border-radius: 3px;
    background-color: #404448;
    text-indent: 10px;
    border:0.5px solid #404448;
    transition: width 1s ease, background-color 1s ease;
}
.header-input:focus{
    width: 490px;
    background-color: #FAFBFC;
}
.nav-link{
    float: left;
    margin-left: 35px;
    margin-top: 15px;
    height: 100%;
    width: 300px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-content: center;

}
.header-link{
    cursor: pointer;
}

</style>
