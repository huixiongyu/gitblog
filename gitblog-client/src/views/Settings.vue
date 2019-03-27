<template>
    <div class="settings">
        <blog-header></blog-header>
        <div class="settings-content">
            <Row>
                <i-col span="3">.</i-col>
                <i-col span="5">
                    <div class="setting-route">
                        <div class="settings-title">
                            Personal settings
                        </div>
                        <router-link active-class="active-route"  :to="{name: 'profile'}" tag="div">profile </router-link>
                        <router-link active-class="active-route" :to="{name: 'account'}" tag="div">account </router-link>
                        <router-link active-class="active-route" :to="{name: 'comment'}" tag="div">comment </router-link>
                        <router-link active-class="active-route" :to="{name: 'admin-categories'}" tag="div">categories </router-link>
                        <router-link active-class="active-route" :to="{name: 'tag'}" tag="div">tag </router-link>
                        <router-link active-class="active-route" :to="{name: 'user'}" tag="div">user </router-link>
                        <router-link active-class="active-route" :to="{name: 'data'}" tag="div">data </router-link>
                    </div>
                </i-col>
                <i-col span="13">
                    <router-view></router-view>
                </i-col>
                <i-col span="3">.</i-col>
            </Row>
        </div>
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
        },
        data(){
            return {

            }
        },
        methods: {
            handleClick(){
                this.$router.push({name: 'account'});
            },
            printRoute(){
                console.log(this.$route.name);
            }
        },
        mounted(){
            this.printRoute();
        }
    }
</script>

<style lang="less">
    .settings-content{
        width: 100%;
        clear: both;
    }
    .setting-route{
        width: 225px;
        height: 800px;
        border: 1px solid #E1E4E8;
        border-radius: 3px;
        div{
            display: flex;
            align-items: center;
            height: 42px;
            border-bottom: 1px solid #E1E4E8;
            padding-left: 10px;
            vertical-align:middle;
            font-size: 14px;
            color: rgb(3, 102, 214);
            &:hover{
                background-color: #FAFBFC;
                cursor: pointer;
            }
        }
        .settings-title{
            color: rgb(88, 96, 105);
            font-size: 16px;
            font-weight: 600;
            background-color: #FAFBFC;
        }
    }

    .active-route{
        color: rgb(36, 41, 46) !important;
        cursor: default;
        font-weight: 600;
    }
</style>