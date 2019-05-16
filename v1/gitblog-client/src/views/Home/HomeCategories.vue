<template>
    <div class="cate-container">
        <ul>
            <li type="disc" v-for="item in categories" :key="item.name">
                {{item.name}}
                <ul v-show="item.children.length > 0">
                    <li class="children-li" type="circle" v-for="inneritem in item.children" :key="inneritem.name">{{inneritem.name}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'categories',
    data(){
        return {
            categories: []
        }
    },
    methods: {
        fetchData(){
            this.$axios.get('/api/classify')
                .then(data => {
                    this.categories =data.data;
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    created() {
        this.fetchData();
    },
    beforeRouteEnter(to, from, next){
        localStorage.setItem('currentTab', 'categories');
        next();
    }    
}
</script>
<style lang="less">
.cate-container{
    margin-top: 20px;
    margin-left: 40px;
}
ul{
    font-size: 16px;
    font-weight: 600;
    color: #666666;
}
.children-li{
   margin-left: 50px;
}
</style>
