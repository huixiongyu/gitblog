<template>
    <div class="write-container">
        <blog-header></blog-header>
        <div class="write-article">
            <div class="box-container">
                <div class="write-content">
                    <h2 class="writing-title">撰写新文章</h2>
                    <Input v-model="title" placeholder="标题" style="width: 840px" />
                    <div class="article-link">
                        <span>Article Adress: https://www.localhost:8080/archives/</span>
                        <Input v-model="path" style="width: 150px" />
                    </div>
                    <i-editor :autosize="{minRows: 50,maxRows: 200, minCols: 30,maxCols: 50}"
                                class="content-area"
                                v-model="content">
                    </i-editor>
                    <div class="post-button">
                        <Button type="info"
                                icon="md-refresh-circle"
                                @click="saveArticle()"
                                style="margin-right: 10px">
                            保存为草稿
                        </Button>
                        <Button type="success"
                                @click="postArticle()"
                                icon="md-paper-plane">
                            发布文章
                        </Button>
                    </div>
                </div>
                <div class="article-extra">
                    <Button class="button" type="warning" style="width: 300px">选项</Button>
                    <p class="post-date">发布日期</p>
                     <DatePicker type="datetime" 
                        :value="postDate"
                        format="yyyy-MM-dd HH:mm" 
                        placeholder="发布日期和时间" 
                        style="width: 300px">
                    </DatePicker>
                    <p class="post-date">分类</p>
                    <div class="select-classify">
                        <div class="select-item" v-for="item in allClassify" :key="item.name">
                            <input type="radio" :name="item.name" :value="item.name" v-model="classify">
                            <label class="label">{{item.name}}</label>
                            <div class="classify-child"
                                    v-for="child in item.children"
                                    :key="child.name">
                                <input type="radio"
                                        :name="child.name"
                                        v-model="classify"
                                        :value="child.name">
                                <label class="label">{{child.name}}</label>
                            </div>
                        </div>
                    </div>
                    <p class="post-date">标签</p>
                    <Input v-model="tags" placeholder="请输入标签名" style="width: 300px" />
                </div>
            </div>
        </div>
        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import BlogHeader from '../../components/BlogHeader'
    import BlogFooter from '../../components/BlogFooter'
    export default {
        name: "Write",
        components: {
            BlogHeader,
            BlogFooter
        },
        data () {
            return {
                content: '',
                title: '',
                path: '',
                postDate: '2019-04-01',
                postTime: '19:06:00',
                allClassify: [],
                classify: '',
                tags: '',
                modal1: false
            }
        },
        methods:{
            fetchData(){
                this.$axios.get('/api/classify')
                    .then(data => {
                        this.allClassify =data.data;
                        // console.log(this.allClassify);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            saveArticle(){
                if(this.title === ''){
                    this.$Message.warning('标题不能为空o(≧口≦)o');
                    return ;
                }
                if(this.content === ''){
                    this.$Message.warning('你还没有写文章呢o(￣▽￣)ｄ');
                    return ;
                }
                if(this.classify === ''){
                    this.$Message.warning('你还没填写分类呢o(￣▽￣)ｄ');
                    return ;
                }
                if(this.path === 'secret'){
                    this.$Message.error('不能为当前文章路径X﹏X');
                    return ;
                }
                let postData = {
                    title : this.title,
                    content : this.content,
                    path: this.path,
                    classify: this.classify,
                    tags : this.tags
                };
                this.$axios.post('/api/article/secret', postData)
                    .then(() => {
                        this.$Message.success('草稿已经保存~(≧▽≦)/~啦啦啦');
                        this.$router.push('/');
                    })
                    .catch(error => {
                    console.log(error);
                });
            },
            postArticle(){
                if(this.title === ''){
                    this.$Message.warning('标题不能为空o(≧口≦)o');
                    return ;
                }
                if(this.content === ''){
                    this.$Message.warning('你还没有写文章呢o(￣▽￣)ｄ');
                    return ;
                }
                if(this.classify === ''){
                    this.$Message.warning('你还没填写分类呢o(￣▽￣)ｄ');
                    return ;
                }
                if(this.path === 'secret'){
                    this.$Message.error('不能为当前文章路径X﹏X');
                    return ;
                }
                let postData = {
                    title : this.title,
                    content : this.content,
                    path: this.path,
                    classify: this.classify,
                    tags : this.tags
                };
                this.$axios.post('/api/article', postData)
                    .then(() => {
                        this.$Message.success('文章发布成功(o゜▽゜)o☆[BINGO!]');
                        this.$router.push('/');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        created(){
            this.fetchData();
            let myDate = new Date();
            let month = myDate.getMonth() + 1;
            let day = myDate.getDay();
            if(month >=1 && month <=9){
                month = '0' + month;
            }
            if(day >=0 && day <= 9){
                day = '0' + day;
            }
            this.postDate = myDate.getFullYear() + "-" + month + "-" + day;
            let hour =  myDate.getHours();
            let minute =  myDate.getMinutes();
            let second = myDate.getSeconds();
            if(hour < 10){
                hour = '0' + hour;
            }
            if(minute <10){
                minute = '0' + minute;
            }
            if(second < 10){
                second = '0' + second;
            }
            this.postTime = hour + ":" + minute + ":" + second;
        }
    }
</script>

<style lang="less">
    .write-container{
        width: 100%;
    }
    .write-article{
        clear: both;
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .box-container{
        width: 1700px;
        display: flex;
        justify-content: center;
    }
    .writing-title{
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 22px;
    }
    .article-link{
        margin-top: 10px;
        font-size: 16px;
        color: rgb(170, 170, 170);
    }
    .post-button{
        float: right;
        padding-right: 15px;
    }
    .article-extra{
        margin-left: 20px;
        .button{
            margin-top: 63px;
        }
        .post-date{
            margin-top: 20px;
            font-size: 14px;
        }
        .select-classify{
            width: 300px;
            border: 1px solid 	#D3D3D3;
            border-radius: 5px;
        }
        .select-classify{
            padding: 20px;
            .select-item{
                .label{
                    margin-left: 5px;
                    font-size: 16px;
                }
                .classify-child{
                    padding-left: 20px;
                    font-size: 14px;
                }
            }
        }
    }

</style>
