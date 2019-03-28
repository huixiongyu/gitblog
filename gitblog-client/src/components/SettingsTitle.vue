<template>
    <div class="title-page">
        <div class="slot-title">
            <span>
                <slot></slot>
            </span>
        </div>
        <Divider />
    </div>
</template>

<script>
    export default {
        name: "SettingsTitle"
    }
</script>

<style scoped>
    .title-page{
        width: 100%;
    }
    .slot-title{
        height: 25px;
        width: 100%;
        font-size: 26px;
        font-weight: 500;
        color: rgb(36, 41, 46);
    }
</style>