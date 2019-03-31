<template>
    <div class="write-container">
        <blog-header></blog-header>
        <div class="write-article">
            <Row>
                <i-col span="1" class="write-space">.</i-col>
                <i-col span="16" class="write-content">
                    <h2 class="writing-title">撰写新文章</h2>
                    <Input v-model="title" placeholder="标题" style="width: 840px" />
                    <div class="article-link">
                        Article Adress: https://www.localhost:8080/archives/<Input v-model="path"
                                                                                    style="width: 150px" />
                    </div>
                    <i-editor :autosize="{minRows: 50,maxRows: 200, minCols: 30,maxCols: 50}"
                              class="content-area"
                              v-model="content">
                    </i-editor>
                    <div class="post-button">
                        <Button type="info" icon="md-refresh-circle" style="margin-right: 10px">保存为草稿</Button>
                        <Button type="success" icon="md-paper-plane">发布文章</Button>
                    </div>
                </i-col>
                <i-col span="6" class="article-extra">
                    <Button class="button" type="warning" style="width: 300px">选项</Button>
                    <p class="post-date">发布日期</p>
                    <DatePicker :value="postDate" type="date" placeholder="Select date" style="width: 180px"></DatePicker>
                    <TimePicker :value="postTime" format="HH点mm分ss秒" placeholder="Select time" style="width: 120px"></TimePicker>
                    <p class="post-date">分类</p>
                    <div class="select-classify">
                        <div class="select-item" v-for="item in allClassify" :key="item.name">
                            <input type="radio" :name="item.name" :value="item.name" v-model="classify">
                            <label class="label">{{item.name}}</label>
                            <div class="classify-child"
                                 v-if="item.children.length > 0"
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
                    <Input v-model="tag" placeholder="请输入标签名" style="width: 300px" />
                </i-col>
                <i-col span="1" class="write-space">.</i-col>
            </Row>
        </div>

        <blog-footer></blog-footer>
    </div>
</template>

<script>
    import BlogHeader from '../components/BlogHeader'
    import BlogFooter from '../components/BlogFooter'
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
                tag: ''
            }
        },
        methods:{
            fetchData(){
                this.$axios.get('/api/classify')
                    .then(data => {
                        this.allClassify =data.data;
                        console.log(this.allClassify);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        created(){
            this.fetchData();
        }
    }
</script>

<style lang="less">
    .write-container{
        width: 100%;
    }
    .write-article{
        clear: both;
        width: 100%;
        /*background-color: #F6F6F3;*/
    }
    /*.write-content{*/
    /*    width: 860px;*/
    /*}*/
    .write-space{
        width: 65px;
        color: white;
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