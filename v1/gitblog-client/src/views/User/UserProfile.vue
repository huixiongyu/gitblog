<template>
    <div class="userprofile">
        <Row>
            <i-col span="7" class="comment-point">.</i-col>
            <i-col span="10">
                <Card style="width:100%" class="profile-card">
                    <Form :model="formTop" ref="formValidate" :rules="ruleValidate" label-position="left" :label-width="80">
                        <FormItem label="Name" prop="nick">
                            <Input v-model="formTop.nick" placeholder="Nickname show in comment" />
                        </FormItem>
                        <FormItem label="Bio" prop="bio">
                            <Input type="textarea"
                                   v-model="formTop.bio"
                                   :autosize="{minRows: 3,maxRows: 5}"
                                   placeholder="Say something..." />
                        </FormItem>
                        <FormItem label="URL" prop="website">
                            <Input v-model="formTop.website" placeholder="your website" />
                        </FormItem>
                        <FormItem label="Company" prop="company">
                            <Input v-model="formTop.company" />
                        </FormItem>
                        <FormItem label="Location" prop="location">
                            <Input v-model="formTop.location" placeholder="Such as: Guangdong,Guangzhou" />
                        </FormItem>
                        <FormItem label="Github" prop="github">
                            <Input v-model="formTop.github" placeholder="your Github home page,begin with https://" />
                        </FormItem>
                        <FormItem label="zhihu" prop="zhihu">
                            <Input v-model="formTop.zhihu" placeholder="https://www.zhihu.com/people/xxx" />
                        </FormItem>
                        <FormItem label="yuncun" prop="yuncun">
                            <Input v-model="formTop.yuncun" placeholder="share musicCloud to enjoy music together" />
                        </FormItem>
                        <FormItem label="weibo" prop="weibo">
                            <Input v-model="formTop.weibo" placeholder="sina weibo." />
                        </FormItem>
                        <FormItem>
                            <Button type="success" @click="handleSubmit('formValidate')">Update profile</Button>
                        </FormItem>
                    </Form>
                </Card>
            </i-col>
            <i-col span="7" class="comment-point">.</i-col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "userprofile",
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
                        localStorage.setItem('profile', JSON.stringify(this.formTop));
                    }
                })

            },
            fetchData(){
                if(localStorage.user){
                    const user = JSON.parse(localStorage.getItem('user'))
                    this.$axios.get(`/api/profile/user?username=${user.username}`)
                        .then(data => {
                            // console.log(data.data);
                            this.formTop = data.data;
                            localStorage.setItem('profile', JSON.stringify(this.formTop));
                        })
                        .catch((error) =>{
                            console.log(error);
                        });
                }
            }
        },
        mounted() {
            this.fetchData();
        }
    }
</script>

<style lang="less">
    .userprofile{
        margin-top: 50px;
    }
    .comment-point{
        color: white;
    }

    div.userprofile > div > div.ivu-col.ivu-col-span-10 > div > div > form > div > label{
        font-size: 16px;
        font-weight: 600;
    }
   div.userprofile > div > div.ivu-col.ivu-col-span-10 > div > div > form > div:nth-child(10) > div > button{
       width: 140px;
       height: 37px;
       background-colorcolor: #2CBE4E;
       font-size: 16px;
       font-weight: 600;
   }
</style>