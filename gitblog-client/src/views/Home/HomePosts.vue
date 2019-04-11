<template>
    <div class="overview">
        <div class="post-search" v-if="totalArticle !== 0">
            <Input class="search-box"  size="large" placeholder="Find an article..." style="width:390px;height:43px;" />
            <Select class="tag-select" placeholder="Tag:All" v-model="model1" style="width:140px" size="large">
                <Option v-for="item in tagList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select class="cate-select" placeholder="Categories:All" v-model="model2" style="width:160px" size="large">
                <Option v-for="item in cateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="no-article" v-else>
           <p>目前还没有文章哦</p> 
        </div>

        <div class="post-line"></div>

        <div class="post-list" 
            v-for="item in articleData" 
            :key="item.path">
            <div class="post-title">
                <router-link :to="'/article/' + item.path" target="_blank">{{item.title}}</router-link>
            </div>
            <p class="post-content">
                {{item.content}}
            </p>
            <div class="post-tags" v-for="tagItem in item.tags" :key="tagItem.name">
                <div class="tag-detail">
                    <a href="" target="_blank">{{tagItem.name}}</a>
                </div>
            </div>

            <div class="post-bottom">
                <div class="post-cate">
                    <Icon type="ios-folder-open" size="20" />
                    <span class="cate-detail">{{item.classify}}</span>
                </div>
                <div class="post-mark">
                    <Icon type="ios-bookmark" size="20" />
                    <span>{{item.tags.length}}</span>
                </div>
                 <div class="post-mark">
                     <Icon type="md-calendar" size="20" />
                    <span>{{item.date | timeFormat}} </span>
                </div>
                <div class="post-mark">
                   <Icon type="ios-thermometer-outline" size="20" />
                    <span>{{item.visited}}℃</span>
                </div>
            </div>
        </div>
        <div class="paging">
            <Page show-total 
                show-sizer
                :page-size="pageSize"
                :total="totalArticles" 
                :current.sync="currentPage"
                @on-change="changePage" 
                @on-page-size-change="changeSize"
                :page-size-opts="sizeList"></Page>
        </div> 
    </div>
</template>
<script>
import moment from 'moment'    
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
            model2: '',
            articleData: [],
            sizeList: [5, 10, 20, 50],
            totalArticles: 10,
            currentPage: 1,
            pageSize: 5
        }
    },
    methods: {
        fectchArticle(){
            this.$axios.get(`/api/article/${this.pageSize}/${this.currentPage}`)
                .then(data => {
                    const currentData = data.data;
                    const articleList = currentData.data;
                    this.articleData.splice(0, this.articleData.length);
                    articleList.forEach( item => {
                        this.articleData.push(item);
                    });
                    this.totalArticles = currentData.totalArticles;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        changePage(value){
            this.currentPage = value;
            this.fectchArticle();
        },
        changeSize(size){
            this.pageSize = size;
            this.currentPage = 1;
            this.fectchArticle();
        }
    },
    created() {
        this.fectchArticle();
    },
    filters: {
    timeFormat: function (value) {
      return   moment(value).fromNow();
    }
}
}
</script>

<style lang="less">
    .overview{
        width: 100%;
    }
    .post-search{
        position: relative;
        margin-top: 20px;
    }
    .no-article{
        width: 100%;
        height: 300px;
        color: red;
        font-size: 20px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-content: center;
        align-items: center;
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
        /*width: 852px;*/
        width: 100%;
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
        font-size: 20px;
        font-weight: 500;
        &:hover{
            text-decoration: underline;
            text-decoration-color: #0366d6;
        }
    }
    .post-content{
        position: relative;
        margin-top: 10px;
        width: 100%;
        color: #586069;
        font-size: 16px;
        line-height: 26px;
        height: 80px;
        overflow: hidden;
        word-wrap: break-word;
        &:after {
            content:"...";
            position:absolute;
            bottom:0;
            right:0;
            padding: 0 5px;
        }
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
            font-size: 14px;
        }

    }
    .paging{
        margin: 10px 0 10px 0;
        width: 100%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-content: center;
    }
</style>

