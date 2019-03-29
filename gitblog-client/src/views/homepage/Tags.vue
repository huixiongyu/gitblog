<template>
    <div class="tags-container">
        <div class="tag-item">
            <span>Node.js</span>    
        </div>
        <div class="tag-item">
            <span>网络原理</span>
        </div>
        <div class="tag-item">
            <span>爬虫技术</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'tags'
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
    margin-top: 5px;
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
