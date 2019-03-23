<template>
    <div class="follower-page">
        <div class="follower-item">
            <div class="follower-cover">
                <img src="../../assets/221.jpg" alt="cover">
            </div>
            <div class="follower-name right-offset">
                <span class="github-nickname">Yige</span>	
                <span class="github-name">yi-ge</span>
            </div>
            <div class="motto-desc right-offset">

            </div>
            <div class="follower-location right-offset">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'followers'
}
</script>

<style lang="less">
.follower-page{
    width: 852px;
}
.follower-item{
    position: relative;
    width: 100%;
    height: 140px;
}
.right-offset{
    margin-left: 70px;
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
    }
    .github-name{
        color: #586069;
        font-size: 16px;
    }
}
</style>
