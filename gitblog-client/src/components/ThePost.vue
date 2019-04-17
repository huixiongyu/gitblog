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
                            <div class="info-name" @click="handleLike">
                                <Icon type="ios-star" v-if="isLike" />
                                <Icon type="ios-star-outline" v-if="!isLike" />Star
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
                                {{this.articleInfo.tags.length}}
                            </div>
                        </div>
                        <div class="info-detail">
                            <div class="info-name">
                                <Icon type="md-folder" />Categories
                            </div>
                            <div class="info-num">
                                23
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
                        <Icon type="ios-thermometer-outline" />{{this.articleInfo.visited}}℃
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
            <div class="comment-area" id="repeat">
                <div class="comment-title">发表评论</div>
                <div class="repeat-to" 
                    v-if="repeatTo !== ''">回复 <span class="user">{{this.repeatTo}}</span></div>
                <Input v-model="comment"
                    :autosize="autoSize"
                    type="textarea"
                    style="width:1100px"
                    placeholder="说点什么吧..." />
                <Button type="success" @click="addComment">发表评论</Button>
            </div>
        </div>
        <div class="comment-list">
            <div class="list-area">
                <div class="comment-item" v-for="item in commentList" :key="item.id">
                    <div class="info-head">
                        <router-link class="user-avatar" tag="div" to="/">
                            <img :src="item.avatar" alt="">
                        </router-link>
                        <div class="user-detail">
                            <div class="name">{{item.from}}</div>
                            <div class="post-time">{{item.date | timeFormat}}</div>
                        </div>
                    </div>
                    <div class="comment-content">
                        <div class="to-whom" v-if="item.to !== 'huixiongyu'">@{{item.to}}</div>
                        <div class="comment">{{item.comment}}</div>
                        <div class="btn-c">
                            <Button class="reply" 
                                type="info" 
                                to="#repeat"
                                @click="handleRepeat(item.from)"
                                size="small">
                                回复
                            </Button>
                            <Button type="dashed" 
                                    size="small" 
                                    @click="handleDelete(item.from, item.id)"
                                    ghost>
                                删除
                            </Button>
                        </div>

                    </div>     
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import marked from 'marked';
    import moment from 'moment';    
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
                    stars: [],
                    visited: 0,
                    classify: '',
                    tags: [],
                    comments: []
                },
                comment: '',
                autoSize: { minRows: 3, maxRows: 20 },
                commentList: [],
                repeatTo: '',
                asking: false
            }
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.articleInfo.content, { sanitize: true })
            },
            isLike: function(){
                const currentUser = this.$store.state.user.username;
                const isExsit = this.articleInfo.stars.filter(item => item.user ===currentUser).length > 0;
                return isExsit;
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
                    .then(() => {
                        this.$axios.get(`/api/article/comment?path=${this.articleInfo.path}`)
                            .then(data => {
                                const listComment = data.data;
                                for(let item of listComment){
                                    this.commentList.push(item);
                                }
                                // console.log(this.commentList);
                            })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            handleRepeat(name){
                this.repeatTo = name;
                console.log(name);
                let anchor = document.getElementById('repeat');
                anchor.scrollIntoView();
            },
            handleDelete(name, id){
                const username = this.$store.state.user.username;
                if(name === username){
                    const deleteOne = {
                        path: this.articleInfo.path,
                        username: username,
                        from: name,
                        id: id
                    }
                    this.$axios.post('/api/article/comment/delete', deleteOne)
                        .then(() => {
                            this.$Message.success('评论删除成功！');
                            location.reload();
                            this.$router.go(0);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }else{
                    this.$Message.warning('您不是当前用户，无法删除他的评论哦！');
                }
            },
            addComment(){
                let repeatToWhom = this.repeatTo;
                if(this.comment === ''){
                    this.$Message.warning('评论内容不能为空！');
                    return ;
                }
                if(this.repeatTo === ''){
                    repeatToWhom = 'huixiongyu'
                }
                const newComment = {
                    from: this.$store.state.user.username,
                    to: repeatToWhom,
                    path: this.articleInfo.path,
                    comment: this.comment
                }
                this.$axios.post('/api/article/comment', newComment)
                    .then(() => {
                        this.$Message.success('评论添加成功！');
                        this.comment = '';
                        this.repeatTo = '';
                        location.reload();
                        this.$router.go(0);
                    })
            },
            handleLike(){
                if(this.asking){
                    this.$Message.warning('点赞太频繁了！');
                    return;
                }
                this.asking = true;
                const currentUser = this.$store.state.user.username;
                const isExsit = this.articleInfo.stars.filter(item => item.user ===currentUser).length > 0;
                const postData = {
                    username: currentUser,
                    path: this.articleInfo.path
                }
                if(isExsit){
                    this.$axios.post('/api/article/unlike',postData)
                        .then(() => {
                            this.$Message.success('已经取消点赞！');
                            const removeIndex = 0;
                            for(let item in  this.articleInfo.stars){
                                if(item.user === currentUser)
                                    removeIndex = item;
                            }
                            this.articleInfo.stars.splice(removeIndex,1);
                            this.asking = false;
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }else{
                    this.$axios.post('/api/article/like',postData)
                        .then(() => {
                            this.$Message.success('点赞成功！');
                            this.articleInfo.stars.push({user: currentUser});
                            this.asking = false;
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            }
        },
        created() {
            // console.log(this.$route.params.path);
            this.articleInfo.path = this.$route.params.path;
            this.getContent();
        },
        filters: {
            timeFormat: function (value) {
                return   moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
            }
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
            min-height: 300px;
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
    .post-comment{
        position: relative;
        width: 100%;
        min-height: 200px; 
        .comment-area{
            width: 1100px;
            height: 100%;
            margin: 0 auto 0 auto;
            // position: absolute;
            // top: 0;
            // left: 50%;
            // margin-left: -550px;
            .comment-title{
                font-size: 18px;
            }
            .repeat-to{
                font-size: 16px;
                font-weight: 600;
                color: #FF4500;
                .user{
                    font-size: 16px;
                    color: #1E90FF;                   
                }
            }
            button{
                margin-top: 10px;
            }
        }
    }
    .comment-list{
        position: relative;
        width: 100%;
        min-height: 300px;
        .list-area{
            width: 1100px;
            height: 100%;
            margin: 0 auto 0 auto;  
            .comment-item{
                width: 100%;
                min-height: 100px;
                margin-bottom: 10px;
                .info-head{
                    width: 100%;
                    height: 50px;
                    display: inline-flex;
                    justify-content: flex-start;
                    .user-avatar{
                        width: 50px;;
                        height: 100%;
                        img{
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                    }
                    .user-detail{
                        margin-left: 10px;
                        .name{
                            font-size: 16px;
                            font-weight: 600;
                        }
                    }

                }
                .comment-content{
                    width: 100%;
                    min-height: 50px;
                    padding-left: 55px;
                    .to-whom{
                        font-size: 16px;
                        font-weight: 600;
                    }
                    .comment{
                        font-size: 18px;
                    }
                    .btn-c{
                        width: 100px;
                        height: 20px;
                        display: flex;
                        justify-content: space-between;
                    }

                }
            }
        }
    }
</style>