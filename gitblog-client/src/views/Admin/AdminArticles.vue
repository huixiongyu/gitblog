<template>
    <div class="admin-articles">
        <blog-header></blog-header>
        <div class="articles-container">
            <div class="panel">
                <div class="title">
                    <div>管理文章</div> 
                    <Button type="info">新增</Button>
                </div>
                <div class="select">
                    <button class="btn">筛选</button>
                    <Select v-model="model1" style="width:200px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div class="table">
                    <Table border ref="selection" :columns="columns1" :data="data1"></Table>
                </div>
                
                <Button @click="handleSelectAll(true)">选择全部</Button>
                <Button @click="handleSelectAll(false)">取消选择</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import BlogHeader from '../../components/BlogHeader'
    export default {
        components: {
            BlogHeader
        },
        data () {
            return {
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '分类',
                        key: 'category'
                    },
                    {
                        title: '评论',
                        key: 'comment'
                    },
                    {
                        title: '发布日期',
                         key: 'date'
                    }
                ],
                data1: [
                    {
                        title: 'John Brown',
                        category: 18,
                        comment: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        title: 'Jim Green',
                        category: 24,
                        comment: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        title: 'Joe Black',
                        category: 30,
                        comment: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        title: 'Jon Snow',
                        category: 26,
                        comment: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: ''                
            }
        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            }
        }
    }
</script>

<style lang="less">
    .admin-articles{
        width: 100%;
    }
    .articles-container{
        padding-top: 50px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        background-color: #F0F3EF;
        .panel{
            width: 1400px;
            min-height: 1000px;
            .title{
                width: 100%;
                height: 24px;
                line-height: 24px;
                font-size: 22px;
                font-weight: 600;
                display: flex;
                justify-content: space-between;
                align-content: center;
                margin-bottom: 5px;
            }
            .select{
                width: 100%;
                height: 30px;
                display: flex;
                flex-direction: row-reverse;
                margin-bottom: 5px;
                .btn{
                    height: 30px;
                    width: 60px;
                    border-radius: 5px;
                    border: 1px solid #eee;
                    margin-left: 5px;
                    background-color: #FFDEAD;
                    font-weight: 500;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>
