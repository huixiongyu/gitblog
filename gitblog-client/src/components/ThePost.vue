<template>
    <div class="post-container">
        <div class="post-header">
            <Row>
                <i-col span="3" class="hide-point">.</i-col>
                <i-col class="post-middle" span="18">
                    <div class="post-title">
                        <Breadcrumb>
                            <BreadcrumbItem class="title-font" to="/">
                                <i class="iconfont" style="font-size: 16px">&#xe604;</i>
                                huixiongyu
                            </BreadcrumbItem>
                            <BreadcrumbItem class="title-font" to="/">{{this.articleInfo.title}}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div class="post-info">
                        <div class="info-detail">
                            <div class="info-name">
                                <Icon type="ios-star" />Star
                            </div>
                            <div class="info-num">
                               {{this.articleInfo.stars.length}}
                            </div>
                        </div>
                        <div class="info-detail">
                            <div class="info-name">
                                <Icon type="ios-pricetags" />Tags
                            </div>
                            <div class="info-num">
                                12
                            </div>
                        </div>
                        <div class="info-detail">
                            <div class="info-name">
                                <Icon type="md-folder" />Categories
                            </div>
                            <div class="info-num">
                                12
                            </div>
                        </div>
                    </div>
                </i-col>
                <i-col span="3" class="hide-point">.</i-col>
            </Row>
        </div>
        <div class="post-nav">
            <Row>
                <i-col span="3" class="hide-point">.</i-col>
                <i-col span="18" class="nav-title">
                    <div class="mark">
                        <Icon type="md-code" />Mark
                    </div>
                    <div>
                        <Icon type="ios-alert-outline" /> <span>Issues</span>
                    </div>
                    <div>
                        <Icon type="md-git-pull-request" />Pull requests
                    </div>
                    <div>
                        <Icon type="ios-speedometer" />Projects
                    </div>
                    <div>
                        <Icon type="ios-thermometer-outline" />100℃
                    </div>
                </i-col>
                <i-col span="3" class="hide-point">.</i-col>
            </Row>
        </div>
        <div class="post-content">
            <div class="content-detail">
                <div class="content-title">
                    <div class="left">
                        <i class="iconfont">&#xe6b1;</i>README.md
                    </div>
                    <div class="right">
                        <Icon type="md-create" />
                    </div>
                </div>
                <div class="content" v-html="compiledMarkdown">

                </div>
            </div>
        </div>
        <div class="post-comment">
            <div class="comment-title">发表评论</div>
            <Input v-model="comment" :autosize="autoSize" type="textarea" placeholder="Enter something..." />
            <Button type="success" long>SUBMIT</Button>
        </div>
        <div class="comment-list"></div>
    </div>
</template>

<script>
    import marked from 'marked';
    export default {
        name: "Post",
        data(){
            let rendererMD = new marked.Renderer();
            marked.setOptions({
                renderer: rendererMD,
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: true
            });
            return {
                path: '',
                articleInfo : {
                    title: '',
                    content: '# hello `java` ',
                    path: '',
                    stars: 0,
                    visited: 0,
                    classify: '',
                    tags: [],
                    comments: []
                },
                comment: '',
                autoSize: { minRows: 4, maxRows: 6 }
            }
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.articleInfo.content, { sanitize: true })
            }
        },
        methods: {
            getContent(){
                this.$axios.get(`/api/article/${this.articleInfo.path}`)
                    .then(data => {
                        // console.log(data);
                        let datas = data.data;
                        this.articleInfo.title = datas.title;
                        this.articleInfo.content = datas.content;
                        this.articleInfo.visited = datas.visited;
                        this.articleInfo.stars = datas.stars;
                        this.articleInfo.tags = datas.tags;
                        this.articleInfo.comments = datas.comments;

                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        created() {
            // console.log(this.$route.params.path);
            this.articleInfo.path = this.$route.params.path;
            this.getContent();
        }
    }
</script>

<style lang="less">
    .post-container{
        clear: both;
        width: 100%;
    }
    .post-header{
        width: 100%;
        padding-top: 20px;
        background-color: #F5F5F5;
    }
    .post-middle{
        display: flex;
        justify-content: space-between;
        align-content: center;
        max-width: 986px;
        height: 42px;
    }
    .title-font{
        font-size: 18px;
        font-weight: 500;
        color: blue;
    }
    .post-info{
        height: 100%;
        font-size: 14px;
        font-weight: 600;
    }
    .info-detail{
        float: right;
        display: inline-block;
        border: 1px solid #E8EDF2;
        border-radius: 2px;
        margin-left: 10px;
        cursor: pointer;
        div{
            float: left;
            padding: 5px 10px 5px 10px;
        }
    }
    .info-name{
        border-right: 1px solid #E8EDF2;
        background-color: #E8EDF2;
        &:hover{
            background-color: #A5BDF1;
        }
    }
    .hide-point{
        color: white;
    }
    .post-nav{
        width: 100%;
        background-color: #F5F5F5;
        border-bottom: 1px solid #DCDCDC;
    }
    .nav-title{
        display: flex;
        justify-content: flex-start;
        align-content: center;
        max-width: 986px;
        height: 44px;
        div{
            display: flex;
            align-content: center;
            align-items: baseline;
            height: 100%;
            color:  #24292e;
            font-size: 16px;
            white-space: nowrap;
            padding-left: 15px;
            padding-right: 15px;
            padding-top: 10px;
        }
    }
    .mark{
        border-left:2px solid #FAFBFC;
        border-right:2px solid #FAFBFC;
        border-bottom:4px solid white !important;
        border-top:3px solid red;
        background-color: white;
        border-radius: 2px;
    }
    .post-content{
        width: 100%;
        clear: both;
        .content-detail{
            width: 1100px;
            min-height: 200px;
            border: 1px solid #D3D3D3;
            border-radius: 4px;
            margin: 20px auto 20px auto;
            top: 50%;
            left: 50%;
            .content-title{
                display: flex;
                justify-content: space-between;
                align-content: center;
                align-items: center;
                width: 100%;
                height: 38px;
                border-bottom: 1px solid #D3D3D3;
                background-color: #F6F8FA;
                div{
                    height: 100%;
                    font-size: 16px;
                    font-weight: 600;
                    padding: 5px;
                }
            }
        }
        .content{
            width: 100%;
            padding: 25px;
        }

    }
</style>