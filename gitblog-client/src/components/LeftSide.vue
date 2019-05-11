<template>
    <div class="left-container">
        <div class="cover">
            <img src="../assets/221.jpg" alt="cover">
        </div>

        <div class="userinfo">
            <p class="left-nickname">灰熊</p>
            <p class="left-username">huixiongyu</p>
        </div>

         <Divider></Divider>

         <div class="star-pro">
             <Icon type="md-star" class="star-icon" size="22" />
             <p class="pro">
                 <span>PRO</span>
             </p>
         </div>

         <div class="any-info">
             <p class="motto word-span">Keep calm and do epic shit!</p>
             <p class="location-place" ><i class="iconfont location">&#xe630;</i><span class="word-span"> China,Guangdong</span></p>
            <p>
                <Icon type="ios-mail-outline" size="20" />
                <a class="email-link word-span" href="https://www.google.com">huixiongyu@gmail.com</a>
            </p>
            <p>
                <Icon type="ios-link" size="20" />
                <a class="email-link word-span" href="http://www.hackslog.com">http://www.hackslog.com</a>
            </p>
         </div>
    </div>
</template>

<script>
export default {
    // data(){
    //     return {
    //         homeData:{
    //             nick: '',
    //             username: '',
    //             bio: '',
    //             location: '',
    //             email: '',
    //             website: '',
    //             avatar: ''
    //         }
    //     }
    // }
    // ,
    // methods:{
    //     fetchData(){
    //         this.$axios.get("/api/profile/user?username=huixiongyu")
    //             .then(data => {
    //                 console.log(data.data);
    //                 this.homeData = data.data;
    //             })
    //             .catch((error) =>{
    //                 console.log(error);
    //             });
    //     }
    // },
    // mounted() {
    //     this.fetchData();
    // }
}
</script>


<style lang="less">
.left-container{
    width: 325px;
}
.cover{
    margin-top: 10px;
    width: 260px;
    height: 260px;
    border-radius: 5px;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
 
}
.userinfo{
    margin-top: 20px;
    .left-nickname{
        font-size: 26px;
        font-weight: 600;
        color: #000;
        font-family: -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Helvetica,
            Arial,sans-serif,
            Apple Color Emoji,
            Segoe UI Emoji,
            Segoe UI Symbol;
    }
    .left-username{
        font-size: 20px;
        font-weight: 500;
        line-height: 21px;
        color: #666;
    }
}
.star-pro{
    .star-icon{
         display: inline-block;   
         margin-top: -3px;    
    }
    .pro{
    margin-left: 10px;
    display: inline-block;
    width: 36px;
    height: 20px;
    background: #7A51C6;
    border-radius: 2px;
    span{
         margin-left: 3px;
        font-size: 14px;
        font-weight: 600;
        color: #fff;       
    }
}
}
.motto{
    margin: 15px auto 15px 0;
    color:rgb(36, 41, 46);
    font-size: 16px;
    font-weight: 500;
;
}
.location-place{
    color:rgb(36, 41, 46);
    font-size: 14px;
    font-weight: 500;
}
.location{
    font-weight: 600;
    font-size: 20px;
}
.email-link{
    font-size: 14px;

}
.word-span{
    margin-left: 5px;
}
</style>
