<template>
    <div class="admin-articles">
        <blog-header></blog-header>
        <div class="articles-container">
            <div class="panel">
                <div class="title">
                    <div>管理文章</div> 
                    <Button type="info" @click="toWriteArticle">新增</Button>
                </div>
                <div class="select">
                    <div class="right">
                        <button class="btn" @click="handleFilter">筛选</button>
                        <Select v-model="type" style="width:200px">
                            <Option v-for="item in articleType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <Button type="error" v-if="selectToDelete" @click="decideToDelete">删除</Button>
                </div>
                <div class="table">
                    <Table border 
                        :loading="loading" 
                        ref="selection" 
                        :columns="columns1" 
                        :data="data1"
                        @on-selection-change="handleSelectChange"
                        >
                    </Table>
                </div>
                <div class="table-change">
                    <div class="table-select">
                        <Button type="primary" @click="handleSelectAll(true)">选择全部</Button>
                        <Button class="cancel" type="info" @click="handleSelectAll(false)">取消选择</Button>
                    </div>
                    <Page
                        :total="total"
                        :current.sync="current"
                        show-sizer
                        show-total
                        @on-change="getData"
                        @on-page-size-change="handleChangeSize">
                    </Page>
                </div>
            </div>
        </div>

        <Modal
            v-model="deleteAsking"
            title="删除文章"
            @on-ok="confirmDelete"
            @on-cancel="cancelDelete">
            <p class="delete-modal">
                <Icon type="md-information-circle" size="24" color="red" />
                阁下确定要删除文章吗？
            </p>
            <p class="delete-modal">
                <Icon type="md-information-circle" size="24" color="red" />
                确定了不能反悔哦！
            </p>
        </Modal>
    </div>
</template>
<script>
    import BlogHeader from '../../components/BlogHeader'
    import moment from 'moment'    
    import qs from 'qs'
    export default {
        components: {
            BlogHeader
        },
        data () {
            return {
                selectToDelete: false,
                loading: false,
                deleteAsking: false,
                deleting: false,
                size: 10,
                current: 1,
                type: 'all',
                total: 0,
                deleteList: [],
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        indexMethod: (row) => {
                            return (row._index + 1) + (this.size * this.current) - this.size;
                        }
                    },
                    {
                        title: '标题',
                        key: 'title',
                        align: 'center',
                        render: (h, { row }) => {
                            return h('a' , {
                                attrs: {
                                    href: '/writing/'+row.id
                                }
                            }, row.title);
                        }
                    },
                    {
                        title: '分类',
                        key: 'category',
                        align: 'center',
                    },
                    {
                        title: '评论',
                        key: 'comment',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        align: 'center',
                        render: (h, { row }) => {
                            if (row.status === 'open') {
                                return h('Tag', {
                                    props: {
                                        color: 'green'
                                    }
                                }, '已发布');
                            } else if (row.status === 'secret') {
                                return h('Tag', {
                                    props: {
                                        color: 'red'
                                    }
                                }, '草稿');
                            }
                        }
                    },
                    {
                        title: '发布日期',
                         key: 'date',
                         align: 'center',
                    }
                ],
                data1: [],
                articleType: [
                    {
                        value: 'all',
                        label: '全部'
                    },
                    {
                        value: 'secret',
                        label: '草稿'
                    },
                    {
                        value: 'open',
                        label: '已发布'
                    }
                ]         
            }
        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            getData(){
                if(this.loading) return ;
                this.loading = true;
                this.$axios.get(`/api/article/admin/${this.type}/${this.size}/${this.current}`)
                    .then(data => {
                        this.total = data.data.totalArticles;
                        const dataList = data.data.data;
                        this.data1 = [];
                        for(let item of dataList){
                            const child = {
                                title: item.title,
                                category: item.classify,
                                comment: item.comment,
                                status: item.secret ? 'secret': 'open',
                                date: moment(item.date).format('YYYY年MM月DD日'),
                                id: item.id
                            }
                            this.data1.push(child);
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        console.log(error);
                        
                    })
            },
            handleChangeSize(val){
                this.size = val;
                this.$nextTick(() => {
                    this.getData();
                })
            },
            handleSelectChange(select){
                this.deleteList = [];
                for(let item of select){
                    this.deleteList.push(item.id);
                }
                if(this.deleteList.length > 0){
                    this.selectToDelete = true;
                }else{
                    this.selectToDelete = false;
                }
            },
            handleFilter(){
                this.getData();
            },
            decideToDelete(){
                if(this.deleteList.length === 0){
                    this.$Message.warning('列表为空，不能删除！');
                    return ;
                }
                this.deleteAsking = true;
            },
            confirmDelete(){
                if(this.deleting) return ;
                this.deleting = true;
                this.$axios.delete('/api/article/admin/deletemany',{data: {deleteList: this.deleteList}})
                    .then(data => {
                        console.log(data);
                        this.$Message.success('删除成功！');
                        this.deleteAsking = false;
                        this.deleting = false;
                        setTimeout(() => {
                            location.reload();
                        }, 1500);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            cancelDelete(){
                this.deleteAsking = false;
            },
            toWriteArticle(){
                const {href} = this.$router.resolve({
                    name: 'writing',
                    path: '/writing',
                    query: {}
                });
                window.open(href, '_blank')                
            }
        },
        created(){
            this.getData();
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
                height: 28px;
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
                justify-content: space-between;
                margin-bottom: 5px;
                .right{
                    width: 250px;
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: space-between;
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
            .table{
                margin-bottom: 10px;
            }
            .table-change{
                width: 100%;
                height: 45px;
                display: flex;
                justify-content: space-between;
                .table-select{
                    .cancel{
                        margin-left: 5px;
                    }
                }
            }
        }
    }
    .delete-modal{
        font-size: 24px;
    }
</style>
