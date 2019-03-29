<template>
    <nav class="header">
        <div class="header-logo">
            <svg height="32" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
        </div>

        <div class="search-container">
            <input type="text" 
                    class="header-input" 
                    placeholder="Search or jump to ..." >   
        </div>
        
        <div class="nav-link">
            <router-link to="/" tag="div" class="header-link">Archives</router-link>
            <router-link to="/" tag="div" class="header-link">Categories</router-link>
            <router-link to="/" tag="div" class="header-link">Tag</router-link>
            <router-link to="/" tag="div" class="header-link">Issues</router-link>
        </div>

        <div class="avatar">
            <Badge  dot type="primary" :offset="[5,5]">
                <Icon type="ios-notifications" size="24" />
            </Badge>
            <Icon type="md-add" class="add-icon" size="20" />
            <Icon type="md-arrow-dropdown" size="20" />
                <Dropdown class="portriat" v-if="this.$store.state.isLogin" transfer  @on-click="dropdownSelect">
                    <div>
                        <img :src="this.$store.state.user.avatar" alt="logo">
                    </div>
                    <DropdownMenu  slot="list">
                        <DropdownItem name="comment"><Icon type="md-chatboxes" />评论管理</DropdownItem>
                        <DropdownItem name="profile" v-if="!this.$store.state.isAdmin"><Icon type="md-settings" />个人信息</DropdownItem>
                        <DropdownItem name="settings" v-else><Icon type="md-settings" />后台管理</DropdownItem>
                        <DropdownItem name="logout">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <div class="portriat" v-else>
                    <img @click="toSignin" src="../assets/images/gitcat.jpeg" alt="logo">
                </div>
        </div>
    </nav>
</template>
<script>
export default {
    data(){
        return {
            // adminPanelshow: true
        }
    },
    methods: {
        toSignin(){
            this.$router.push('/signin');
        },
        dropdownSelect(name){
            if(name === 'logout'){
                if(localStorage.profile){
                    localStorage.removeItem('profile');
                }
                localStorage.removeItem('blogToken');
                localStorage.removeItem('user');
                this.$router.replace('/');
                this.$Message.success('已经退出ヾ(￣▽￣)Bye~Bye~');
            }
            if(name === 'settings'){
                this.$router.push('settings');
            }
            if(name === 'profile'){
                if(this.$store.state.isAdmin === "admin"){
                    this.$router.push({name: 'profile'});
                }else{
                    this.$router.push({name: 'userprofile'});
                }
            }
            if(name === 'comment'){
                if(this.$store.state.isAdmin === "admin"){
                    this.$router.push({name: 'comment'});
                }else{
                    this.$router.push({name: 'usercomment'});
                }
            }
        }
    }
}
</script>
<style lang="less">
    .header{
        position: relative;
        width: 100%;
        height: 60px;
        background-color: #24292E;
    }
    .header-logo{
        float: left;
        height: 50px;
        padding-top: 13px;
        margin-left: 20px;
        position: inherit;
        z-index: 100px;
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

    .avatar{
        float:right;
        margin-top: 18px;
        position: relative;
        /*.admin-select{*/
        /*    position: absolute;*/
        /*    top: 50px;*/
        /*    right: 18px;*/
        /*    width: 180px;*/
        /*    height: 220px;*/
        /*    border: 1px solid #DCDEE2;*/
        /*    border-radius: 3px;*/
        /*    z-index: 900;*/
        /*    background-color: yellow;*/
        /*}*/
    }
    .add-icon{
        margin-left: 15px;
    }
    .portriat{
        float: right;
        margin-right: 20px;
        width: 26px;
        height: 26px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }



</style>
