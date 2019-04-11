<template>
    <div class="overview">
        <div class="pin">
            Pinned
        </div>
        <div class="pro-box" v-for="item in projects" :key="item.title">
            <div class="box-title">
                 <a :href="item.projectLink" target="_blank">{{item.title}}</a>
            </div>
            <div class="box-content">
                {{item.content}}
            </div>
            <div class="box-lang">
                <div class="box-color" :style="{backgroundColor: color[item.language]}">
                </div>
                <span class="use-lang">{{item.language}}</span>    
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'overview',
    data(){
        return {
            color: {
                'C++': '#f34b7d',
                'JavaScript': '#f1e05a',
                'Vue': '#2c3e50',
                'Python': '#3572A5',
                'HTML': '#e34c26'
            },
            projects: [
                {
                    title: 'Algorithms',
                    projectLink: 'https://github.com/huixiongyu/Algorithms',
                    content: 'Learning algorithms,most about data structure,OJ practice,and may add other types in the futher.',
                    language: 'C++'
                },
                {
                    title: 'Django-blog',
                    projectLink: 'https://github.com/huixiongyu/Django-blog',
                    content: 'Some blogs are written by Django',
                    language: 'Python'
                },
                {
                    title: 'lab',
                    projectLink: 'https://github.com/huixiongyu/lab',
                    content: 'My lab,including FontEnd, BackEnd,DataAnalysis,Scrapy and hardware practices.',
                    language: 'HTML'
                },
                {
                    title: 'geek-image',
                    projectLink: 'https://github.com/huixiongyu/geek-image',
                    content: '极客图床，用来上传写Markown需要分享的图片',
                    language: 'JavaScript'
                },
                {
                    title: 'shinian',
                    projectLink: 'https://github.com/huixiongyu/shinian',
                    content: '拾年，又名iDone(what have done)，用来记录已经完成的任务和专注重要的任务',
                    language: 'Vue'
                },
                {
                    title: 'react-ssr',
                    projectLink: 'https://github.com/huixiongyu/react-ssr',
                    content: 'primal method to build ssr app',
                    language: 'JavaScript'

                }
            ]
        }
    }
}
</script>

<style lang="less">
.pin{
    margin-top: 10px;
    margin-bottom: 0px;
    color: #24292e;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    font-size: 18px;
}
.pro-box{
    position: relative;
    width:360px;
    height:130px;
    float: left;
    margin-top: 20px;
    margin-right: 5px;
    border: 1px solid #DCDEE2;
    border-radius: 2px;
    padding: 20px;
}
.box-title{
    color: #0366d6;
    font-size: 16px;
    font-weight: 600;
    &:hover{
        text-decoration: underline;
        text-decoration-color: #0366d6;
    }
}
.box-content{
    margin-top: 10px;
    color: #586069;
    font-size: 13px;
}
.box-lang{
    margin-top: 15px;
    position: absolute;
    left: 20px;
    bottom: 20px;
    .use-lang{
        left: 0;
        top: -10px;
        margin-left: 5px;
        color: #586069;
        font-size: 14px;
    }
}
.box-color{
    float: left;
    width: 14px;
    height: 14px;
    margin-top: 3px;
    border-radius: 7px;
    border: 1px solid transparent;
}
</style>