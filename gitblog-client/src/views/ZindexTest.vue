<template>
    <div class="mycontianer">
        <div class="test-header">

        </div>

        <Menu mode="horizontal" :theme="theme1" active-name="1">
            <MenuItem name="1">
                <Icon type="ios-paper" />
                内容管理
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-people" />
                用户管理
            </MenuItem>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-stats" />
                    统计分析
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="4">
                <Icon type="ios-construct" />
                综合设置
            </MenuItem>
        </Menu>

        <div class="admin-select" v-show="adminPanelshow">

        </div>
    </div>
</template>
<script>
    export default {
        name: 'zindex',
        data () {
            return {
                theme1: 'light'
            }
        },
        methods: {

        },
        mounted () {

        }
    }
</script>
<style>
    .mycontainer{
        position: relative;
        height: 100%;
        width: 100%;
        background: blue;
    }
    .test-header{
        width: 100%;
        height: 60px;
        background: black;
    }
    .admin-select{
        position: absolute;
        top: 50px;
        right: 18px;
        width: 180px;
        height: 220px;
        border: 1px solid #DCDEE2;
        border-radius: 3px;
        z-index: 900;
    }

</style>