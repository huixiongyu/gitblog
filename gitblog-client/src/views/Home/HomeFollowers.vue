<template>
    <div class="follower-page">
        <div class="follower-item" v-for="item in followesList" :key="item.username">
            <div class="follower-cover">
                <img :src="item.avatar" alt="cover">
            </div>
            <div class="follower-name">
                <span class="github-nickname">{{item.nick}}</span>
                <span class="github-name">{{item.username}}</span>
            </div>
            <div class="motto-desc">
                {{item.bio}}
            </div>
            <div class="detail-info">
                <div class="follower-company" v-if="item.company">
                    <Icon type="ios-people" style="font-size: 20px"/> {{item.company}}
                </div>
                <div class="follower-location">
                    <i class="iconfont " style="font-size: 20px">&#xe630;</i>{{item.location}}
                </div>
            </div>
            <div class="follow-button">
                Unfollow
            </div>
        </div>
        <div class="paging">
            <Page show-total 
                show-sizer
                :page-size="pageSize"
                :total="totalFollowers" 
                :current.sync="currentPage"
                @on-change="changePage" 
                @on-page-size-change="changeSize"
                :page-size-opts="sizeList"></Page>            
        </div> 
    </div>
</template>
<script>
export default {
    name: 'followers',
    data(){
        return{
            followesList : [ ],
            sizeList: [5, 10, 20, 50],
            totalFollowers: 10,
            currentPage: 1,
            pageSize: 5
        }
    },
    methods:{
        fetchFollowers(){
            this.$axios.get(`/api/profile/followers/${this.pageSize}/${this.currentPage}`)
                .then(data => {
                    const currentData = data.data;
                    const followeData = currentData.data;
                    this.followesList.splice(0, this.followesList.length);
                    followeData.forEach( item => {
                        this.followesList.push(item);
                    });
                    this.totalFollowers = currentData.totalFollowers;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        changePage(value){
            this.currentPage = value;
            this.fetchFollowers();
        },
        changeSize(size){
            this.pageSize = size;
            this.$nextTick(() => {
                this.fetchFollowers();
            })            
        }
    },
    created() {
        this.fetchFollowers();
    }
}
</script>

<style lang="less">
    .follower-page{
        width: 1115px;
    }
    .follower-item{
        position: relative;
        padding-left: 70px;
        width: 100%;
        height: 130px;
        border-bottom: 1px solid #EAEEF3;
    }
    .follower-cover{
        position: absolute;
        left: 2px;
        top: 30px;
        width: 60px;
        height: 60px;
        img{
            border-radius: 5px;
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }
    .follower-name{
        padding-top: 32px;
        .github-nickname{
            color: #24292e;
            font-size: 18px;
            margin-right: 10px;
            cursor: pointer;
        }
        .github-name{
            color: #586069;
            font-size: 16px;
        }
    }
    .detail-info{
        div{
            display: inline-block;
        }
    }
    .follower-company{
        margin-right: 20px;
    }
    .follow-button{
        position: absolute;
        top: 26px;
        right: 0px;
        width: 74px;
        height: 30px;
        border-radius: 3px;
        border: 1px solid   #9FA3A9;
        background-color: #F5F5F5;
        color: black;
        font-size: 14px;
        font-weight: 600;
        line-height: 30px;
        vertical-align: center;
        text-align: center;
        &:hover{
            background-color: #E7EBF1;
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
