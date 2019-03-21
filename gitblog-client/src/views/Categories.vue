<template>
    <div class="cate-container">
        <ul>
            <li type="disc" v-for="item in categories" :key="item.name">
                {{item.name}}
                <ul v-show="item.children.length > 0">
                    <li class="children-li" type="circle" v-for="inneritem in item.children" :key="inneritem">{{inneritem}}</li>
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
            categories: [
                {
                    name: 'JavaScript',
                    children: ['JavaScript','Vue', 'React', 'jQuery']
                },
                {
                    name: 'Node',
                    children: ['Node', 'Koa', 'Express', 'Egg']
                },
                {
                    name: 'Python',
                    children: ['Python', 'flask', 'Django', 'Tornado', 'Scrapy']
                },
                {
                    name: 'Linux',
                    children: []
                },
                {
                    name: '旅行的意义',
                    children: ['爱上一座城', '走走停停', '故乡', '孤独星球']
                },
                {
                    name: '吃货的世界',
                    children: ['营养早餐', '小吃', '料理']
                },
                {
                    name: '设计',
                    children: ['平面设计', 'UI', '素描', '手办']
                }
            ]
        }
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
