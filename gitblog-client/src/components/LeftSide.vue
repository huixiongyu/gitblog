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
             <p class="location-place"><i class="iconfont location">&#xe630;</i><span class="word-span"> China,Guangdong</span></p>
            <p>
                <Icon type="ios-mail-outline" size="20" />
                <a class="email-link word-span" href="https://www.google.com">huixiongyu@gmail.com</a>
            </p>
            <p>
                <Icon type="ios-link" size="20" />
                <a class="email-link word-span" href="http://www.hackslog.com">http://www.hackslog.com</a>
            </p>
         </div>

        <!-- <Form ref="formInline" :model="userInfo" :label-position="left" >
            <FormItem prop="proShow">
                <Radio v-model="userInfo.proShow">Radio</Radio>
            </FormItem>
            <FormItem prop="motto">
                <Input v-model="userInfo.motto" type="textarea" :autosize="{minRows: 2,maxRows: 5}" />
            </FormItem>
            <FormItem prop="company">
                <Icon type="ios-people" slot="label" />
                <Input style="width:216px;" v-model="userInfo.company" />
            </FormItem>
            <FormItem prop="location">
                <i class="iconfont location" slot="label">&#xe630;</i>
                <Input style="width:216px;float:left;" v-model="userInfo.location" />
            </FormItem>
            <FormItem prop="email">
                 <Icon type="ios-mail-outline" slot="label" size="20" />
                <Input style="width:216px;" v-model="userInfo.email" />
            </FormItem>         
            <FormItem prop="website">
                <Icon type="ios-link" slot="label" size="20" />
                <Input style="width:216px;" v-model="userInfo.website" />
            </FormItem>                            
        </Form> -->
    </div>
</template>

<script>
export default {
    data(){
        return {
            // userInfo: {
            //     proShow: true,
            //     motto: 'Keep calm and do epic shit!',
            //     company: '',
            //     location: "China,Guangdong",
            //     email: "huixiongyu@gmail.com",
            //     website: "http://www.hackslog.com"
            // }
        }
    }
}
</script>


<style lang="less">
.left-container{
    width: 240px;
    height: 800px;
}
.cover{
    margin-top: 20px;
    width: 240px;
    height: 240px;
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
