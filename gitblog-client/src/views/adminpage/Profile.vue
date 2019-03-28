<template>
    <div class="profile-page">
        <settings-title>
            Public profile
        </settings-title>
    </div>
</template>

<script>
    import SettingsTitle from '../../components/SettingsTitle'
    export default {
        name: "Profile",
        components:{
            SettingsTitle
        }
    }
</script>

<style scoped>
    .profile-page{
        width: 100%;
    }
</style>