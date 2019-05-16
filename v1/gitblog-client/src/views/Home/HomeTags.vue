<template>
    <div class="tags-container">
        <div class="tag-item" v-for="item in tagList" :key="item.name">
            <span>{{item.name}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tags',
    data(){
        return {
            tagList: []
        }
    },
    methods: {
        fetchTags(){
            this.$axios.get('/api/tags')
                .then(data => {
                    this.tagList = data.data.tags;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    created() {
        this.fetchTags();
    },
    beforeRouteEnter(to, from, next){
        localStorage.setItem('currentTab', 'tags');
        next();
    }        
}
</script>
<style lang="less">
.tags-container{
    width: 100%;
}
.tag-item{
    float: left;
    box-sizing: border-box;
    padding: 5px;
    margin-right: 10px;
    margin-top: 10px;
    border-radius: 2px;
    background-color: rgba(176,224,230, 0.3);
    font-size: 16px;
    color: #1E90FF;
    &:hover{
        background-color: rgba(0,255,255, 0.6);
    }
    span{
        cursor: pointer;
    }
}
</style>
