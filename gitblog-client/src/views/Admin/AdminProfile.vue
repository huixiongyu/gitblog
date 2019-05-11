<template>
    <div class="profile-page">
        <settings-title>
            Public profile
        </settings-title>
        <Row>
            <i-col span="16">
                <div class="profile-panel">
                    <Form :model="formTop" ref="formValidate" :rules="ruleValidate" label-position="top" >
                        <FormItem label="Name" prop="nick">
                            <Input v-model="formTop.nick" placeholder="Nickname show in comment"></Input>
                        </FormItem>
                        <FormItem label="Bio" prop="bio">
                            <Input type="textarea"
                                   v-model="formTop.bio"
                                   :autosize="{minRows: 3,maxRows: 5}"
                                   placeholder="Say something..."></Input>
                        </FormItem>
                        <FormItem label="URL"  prop="website">
                            <Input v-model="formTop.website" placeholder="your website"></Input>
                        </FormItem>
                        <FormItem label="Company" prop="company">
                            <Input v-model="formTop.company"></Input>
                        </FormItem>
                        <FormItem label="Location" prop="location">
                            <Input v-model="formTop.location" placeholder="Such as: Guangdong,Guangzhou"></Input>
                        </FormItem>
                        <FormItem label="Github" prop="github">
                            <Input v-model="formTop.github" placeholder="your Github home page,begin with https://"></Input>
                        </FormItem>
                        <FormItem label="zhihu" prop="zhihu">
                            <Input v-model="formTop.zhihu" placeholder="https://www.zhihu.com/people/xxx"></Input>
                        </FormItem>
                        <FormItem label="yuncun" prop="yuncun">
                            <Input v-model="formTop.yuncun" placeholder="share musicCloud to enjoy music together"></Input>
                        </FormItem>
                        <FormItem label="weibo" prop="weibo">
                            <Input v-model="formTop.weibo" placeholder="sina weibo."></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="success" @click="handleSubmit('formValidate')">Update profile</Button>
                        </FormItem>
                    </Form>
                </div>

            </i-col>
            <i-col span="8">
                <div class="avatar-container">
                    <div class="avatar-title">
                        Profile picture
                    </div>
                    <div class="avatar-img">
                        <img :src="formTop.avatar" alt="">
                    </div>
                    <div class="avatar-button">
                        <Upload action="//jsonplaceholder.typicode.com/posts/">
                            <Button style="backgroundColor:#24292E;color: white;" icon="md-create" >Edit</Button>
                        </Upload>
                    </div>
                </div>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import SettingsTitle from '../../components/SettingsTitle'
    export default {
        name: "Profile",
        components:{
            SettingsTitle
        },
        data(){
            return {
                formTop: {
                    nick: '',
                    bio: '',
                    website: '',
                    company: '',
                    location: '',
                    github: '',
                    zhihu: '',
                    yuncun: '',
                    weibo: '',
                    avatar: ''
                },
                ruleValidate: {
                    nick: [
                        { required: true, message: 'The nick cannot be empty', trigger: 'blur' }
                    ],
                    github: [
                        { required: true, message: 'Github Address cannot be empty', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name){
                this.$refs[name].validate( (valid) =>{
                    if(valid){
                        this.$axios.post('/api/profile', this.formTop)
                            .then(data => {
                                // console.log(data.data);
                                this.formTop = data.data;
                                this.$Message.success('更改成功！')
                            })
                            .catch((error) =>{
                                console.log(error)
                            });
                        //这里用不着，在follower那里用到，没有的话要重新请求
                        localStorage.setItem('profile', JSON.stringify(this.formTop));
                    }
                })

            },
            fetchData(){
                    this.$axios.get("/api/profile/user?username=huixiongyu")
                        .then(data => {
                            // console.log(data.data);
                            this.formTop = data.data;
                            localStorage.setItem('profile', JSON.stringify(this.formTop));
                        })
                        .catch((error) =>{
                            console.log(error)
                        });
            }
        },
        mounted() {
            this.fetchData();
        }
    }
</script>

<style lang="less">
    .profile-page{
        width: 920px;
    }
    .profile-panel{
        width: 443px;
    }
    .profile-panel  .ivu-form-item-label, .avatar-title{
        font-size: 14px;
        font-weight: 600;
    }
    .avatar-container{
        margin-left: 20px;
        margin-top: -10px;
    }
    .avatar-img{
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 5px;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            object-fit: fill;
        }
    }
    .avatar-button{
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
</style>