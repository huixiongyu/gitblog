<template>
    <div class="settings">
        <blog-header></blog-header>
        <div class="settings-content">
            <div class="settings-box">
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
                <router-view></router-view>
            </div>
        </div>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import BlogHeader from '../../components/BlogHeader'
    import BlogFooter from '../../components/BlogFooter'
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

        },
        mounted() {

        }
    }
</script>

<style lang="less">
    .settings-content{
        padding-top: 20px;
        width: 100%;
        clear: both;
        display: flex;
        justify-content: center;
        .settings-box{
            width: 1210px;
            display: flex;
            justify-content: space-between;
        }
    }
    .setting-route{
        width: 225px;
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
                background-color: #F0F3EF;
                cursor: pointer;
            }
            &:last-child{
                border-bottom: 1px solid transparent;
            }
        }
        .settings-title{
            color: rgb(88, 96, 105);
            font-size: 16px;
            font-weight: 600;
            background-color: #FAFBFC;
            &:hover{
                background-color: #FAFBFC;
                cursor: default;
            }
        }
    }

    .active-route{
        color: rgb(36, 41, 46) !important;
        font-weight: 600;
        &:hover{
            cursor: default;
        }
    }
</style>
