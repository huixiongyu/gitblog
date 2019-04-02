<template>
    <div class="post-container">
        <div class="post-header">
            <Row>
                <i-col span="3">.</i-col>
                <i-col class="post-middle" span="18">
                    <div class="post-title">

                        <Breadcrumb>
                            <BreadcrumbItem class="title-font" to="/">
                                <i class="iconfont" style="font-size: 16px">&#xe604;</i>
                                huixiongyu
                            </BreadcrumbItem>
                            <BreadcrumbItem class="title-font" to="/">文章标题</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div class="post-info">
                        <div class="info-detail">
                            <div class="info-name">
                                <Icon type="ios-star" />Star
                            </div>
                            <div class="info-num">
                                12
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
                <i-col span="3">.</i-col>
            </Row>
        </div>
        <div class="post-nav"></div>
        <div class="post-content"></div>
        <div class="post-comment"></div>
    </div>
</template>

<script>
    export default {
        name: "Post"
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
        background-color: #FAFBFC;
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
</style>