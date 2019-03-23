<template>
    <div class="overview">
        <div class="post-search">
            <Input class="search-box" v-model="value" size="large" placeholder="Find an article..." style="width:500px;height:43px;" />
            <Select class="tag-select" placeholder="Tag:All" v-model="model1" style="width:140px" size="large">
                <Option v-for="item in tagList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>           
            <Select class="cate-select" placeholder="Categories:All" v-model="model2" style="width:160px" size="large">
                <Option v-for="item in cateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>                
        </div>

        <div class="post-line"></div>

        <div class="post-list">
            <div class="post-title">
                <a href="" target="_blank">shinian</a>
            </div>
            <div class="post-content">
                拾年，又名iDone(what have done)，用来记录已经完成的任务和专注重要的任务
            </div>
            <div class="post-tags">
                <div class="tag-detail">
                    <a href="" target="_blank">二分法</a>
                </div>
                <div class="tag-detail">
                    <a href="" target="_blank">二分法</a>
                </div>
            </div>

            <div class="post-bottom">
                <div class="post-cate">
                    <Icon type="ios-folder-open" size="20" />
                    <span class="cate-detail">Linux</span>
                </div>
                <div class="post-mark">
                    <Icon type="ios-bookmark" size="20" />
                    <span>3</span>
                </div>
                 <div class="post-mark">
                     <Icon type="md-calendar" size="20" />
                    <span>Publised at </span>
                </div>   
                <div class="post-mark">
                   <Icon type="ios-thermometer-outline" size="20" />
                    <span>100℃</span>
                </div>                            
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'posts',
    data(){
        return {
            tagList: [
                    {
                        value: 'git',
                        label: 'git'
                    },
                    {
                        value: 'nginx',
                        label: 'nginx'
                    },
                    {
                        value: 'Linux',
                        label: 'Linux'
                    },
                                        {
                        value: 'Node',
                        label: 'Node'
                    },
                    {
                        value: '旅游',
                        label: '旅游'
                    },
                    {
                        value: '吃货的世界',
                        label: '吃货的世界'
                    }
            ],
            cateList: [
                    {
                        value: 'git',
                        label: 'git'
                    },
                    {
                        value: 'nginx',
                        label: 'nginx'
                    },
                    {
                        value: 'Linux',
                        label: 'Linux'
                    },
                                        {
                        value: 'Node',
                        label: 'Node'
                    },
                    {
                        value: '旅游',
                        label: '旅游'
                    },
                    {
                        value: '吃货的世界',
                        label: '吃货的世界'
                    }
            ],            
            model1: '',
            model2: ''
        }
    }
}
</script>

<style lang="less">
.post-search{
    position: relative;
    margin-top: 20px;
}
.search-box{
    margin-top: 5px;
}
.tag-select{
    margin-left: 25px;
}
.cate-select{
    margin-left: 5px;
}
.post-line{
    width: 852px;
    height: 0;
    margin-top: 20px;
    border-bottom: 1px solid #DCDEE2;
}
.post-list{
    position: relative;
    width: 100%;
    height: 220px;
    border-bottom: 1px solid #DCDEE2;
}
.post-title{
    margin-top: 10px;
    color: #0366d6;
    font-size: 24px;
    font-weight: 800;
    &:hover{
        text-decoration: underline;
        text-decoration-color: #0366d6;
    }
}
.post-content{
    margin-top: 10px;
    width: 100%;
    color: #586069;
    font-size: 16px;
    line-height: 24px;
    height: 80px;
    overflow: hidden;   
     word-wrap: break-word;
    text-overflow: ellipsis; 
}
.post-tags{
    margin-top: 10px;
    margin-bottom: 10px;
    color: #0366d6;
    font-size: 12px;
    .tag-detail{
        float:left;
        margin-right: 8px;
        box-sizing: border-box;
        padding: 2px;
        border: 1px solid #999;
        background-color: rgba(135,206,250, 0.2);
        border-radius: 2px;
        &:hover{
            background-color: rgba(135,206,235, 0.6);   
        }
    }

}
.post-bottom{
    position: absolute;
    left: 0;
    bottom: 25px;
    clear: left;
    color: #586069;
    font-size: 12px;    
    .post-cate{
        float: left;
        .cate-detail{
            margin-left: 5px;
            margin-right: 15px;
        }
    }
    .post-mark{
        float: left;
        margin-right: 15px;
    }

}
</style>

