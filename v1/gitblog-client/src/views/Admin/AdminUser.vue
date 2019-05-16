<template>
    <div class="user-settings">
        <settings-title>
            User Info
        </settings-title>
    </div>
</template>

<script>
    import SettingsTitle from '../../components/SettingsTitle'
    export default {
        name: "User",
        components:{
            SettingsTitle
        }
    }
</script>

<style lange="less">
    .user-settings{
        width: 920px;
    }
</style>