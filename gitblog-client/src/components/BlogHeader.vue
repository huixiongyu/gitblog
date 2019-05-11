<template>
    <nav class="header">
        <div class="guide">
            <div class="header-logo">
                <img src="../assets/svg/github.svg" alt="gitblog">
            </div>

            <div class="search-container">
                <input type="text"
                        class="header-input"
                        placeholder="Search or jump to ..." >
            </div>

            <router-link to="/" tag="div" class="header-link" v-if="!this.$store.state.isAdmin">Archives</router-link>
            <router-link to="/posts" tag="div" class="header-link" v-else>Article</router-link>
            <router-link to="/categories" tag="div" class="header-link" v-if="!this.$store.state.isAdmin">Categories</router-link>
            <router-link to="/writing" tag="div" class="header-link" v-else>Writing</router-link>
            <router-link to="/tags" tag="div" class="header-link">Tag</router-link>
            <router-link to="/" tag="div" class="header-link">Issues</router-link>
        </div>

        <div class="avatar" v-if="this.$store.state.isLogin">
            <Badge  dot type="primary" :offset="[5,5]">
                <Icon type="ios-notifications" size="24" />
            </Badge>
            <Icon type="md-add" class="add-icon" size="20" />
            <Icon type="md-arrow-dropdown" size="20" />
                <Dropdown class="portriat"  transfer  @on-click="dropdownSelect">
                    <div>
                        <img :src="this.$store.state.user.avatar" alt="logo">
                    </div>
                    <DropdownMenu class="drop-menu"  slot="list">
                        <DropdownItem class="drop-item" name="pinglun"><Icon type="md-chatboxes" />评论管理</DropdownItem>
                        <DropdownItem class="drop-item" name="profile" v-if="!this.$store.state.isAdmin"><Icon type="md-settings" />个人信息</DropdownItem>
                        <DropdownItem class="drop-item" name="settings" v-else><Icon type="md-settings" />后台管理</DropdownItem>
                        <DropdownItem class="drop-item" name="logout">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
        </div>

        <div class="nologin" v-else>
            <Button type="text" size="large" @click="toSignin" ghost>Sign in</Button>
            <Button  type="default" size="large" @click="toSignup" ghost>Sign up</Button>
        </div>
    </nav>
</template>
<script>
    export default {
        data(){
            return {
                isAdmin : false
            }
        },
        methods: {
            toSignin(){
                this.$router.push('/signin');
            },
            toSignup(){
                this.$router.push('/register');
            },
            dropdownSelect(name){
                if(name === 'logout'){
                    if(localStorage.profile){
                        localStorage.removeItem('profile');
                    }
                    localStorage.removeItem('blogToken');
                    localStorage.removeItem('user');
                    this.$store.commit('setLogout')
                    this.$Message.success('已经退出ヾ(￣▽￣)Bye~Bye~');
                    // this.$router.go(0);
                    // this.$router.replace('/');
                }
                if(name === 'settings'){
                    this.$router.push('/settings');
                }
                if(name === 'profile'){
                    if(this.$store.state.isAdmin === "admin"){
                        this.$router.push('/settings/profile');
                    }else{
                        this.$router.push( '/useradmin/profile');
                    }
                }
                if(name === 'pinglun'){
                    if(this.$store.state.isAdmin === "admin"){
                        this.$router.push('/settings/comment');
                    }else{
                        this.$router.push('/useradmin/comment');
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    .header{
        display: flex;
        justify-content: flex-start;
        align-content: center;
        width: 100%;
        height: 68px;
        background-color: #24292E;
    }
    .guide{
        display: inline-flex;
        justify-content: space-evenly;
        align-content: center;
        align-items: center;
        height: 100%;
        width: 60%;
        .header-input{
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
        .header-link{
            font-size: 16px;
            font-weight: 600;
            color: #fff;
            cursor: pointer;
            &:hover{
                color: #BDBFC0;
            }
        }
    }
    .avatar{
        margin-right: 20px;
        display: flex;
        justify-content: flex-end;
        align-content: center;
        align-items: center;
        height: 100%;
        width: 40%;
    }

    .nologin{
        padding-right: 100px;
        display: flex;
        justify-content: flex-end;
        align-content: center;
        align-items: center;
        height: 100%;
        width: 40%;
        .ivu-btn{
            font-size: 16px;
            font-weight: 600;
        }
    }

    .portriat{
        width: 26px;
        height: 26px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }
    .drop-menu{
        .drop-item{
            &:hover{
                background-color: #0366D6;
                color: white;
            }
        }
    }

</style>
