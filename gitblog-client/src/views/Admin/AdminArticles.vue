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

                </div>
                <div class="table">
                    <Table border ref="selection" :columns="columns4" :data="data1"></Table>
                </div>
                
                <Button @click="handleSelectAll(true)">Set all selected</Button>
                <Button @click="handleSelectAll(false)">Cancel all selected</Button>
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
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
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
                margin-bottom: 5px;
            }
        }
    }
</style>
