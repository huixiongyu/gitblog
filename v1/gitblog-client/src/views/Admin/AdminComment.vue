<template>
    <div class="comment-settings">
        <settings-title>
            Comment Manage
        </settings-title>
    </div>
</template>

<script>
    import SettingsTitle from '../../components/SettingsTitle'
    export default {
        name: "Comment",
        components:{
            SettingsTitle
        }
    }
</script>

<style lang="less">
    .comment-settings{
        width: 920px;
    }
</style>