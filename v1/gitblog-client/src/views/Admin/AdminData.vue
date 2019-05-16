<template>
    <div class="data-settings">
        <settings-title>
            Website Status
        </settings-title>
    </div>
</template>

<script>
    import SettingsTitle from '../../components/SettingsTitle'
    export default {
        name: "Data",
        components:{
            SettingsTitle
        }
    }
</script>

<style lang="less">
    .data-settings{
        width: 920px;
    }
</style>