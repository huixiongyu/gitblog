<template>
    <div>aboutme</div>
</template>
<script>
export default {
    name: 'aboutme',
    beforeRouteEnter(to, from, next){
        localStorage.setItem('currentTab', 'aboutme');
        next();
    }      
}
</script>
