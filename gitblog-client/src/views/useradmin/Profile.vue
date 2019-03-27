<template>
    <div class="userprofile">
        <Row>
            <i-col span="7" class="comment-point">.</i-col>
            <i-col span="10">
                <Card style="width:100%" class="profile-card">
                    <Form :model="formTop" ref="formValidate" label-position="left" :label-width="80">
                        <FormItem label="Name">
                            <Input v-model="formTop.input1" placeholder="Nickname show in comment"></Input>
                        </FormItem>
                        <FormItem label="Bio">
                            <Input type="textarea"
                                   v-model="formTop.input2"
                                   :autosize="{minRows: 3,maxRows: 5}"
                                   placeholder="Say something..."></Input>
                        </FormItem>
                        <FormItem label="URL">
                            <Input v-model="formTop.input3" placeholder="your website"></Input>
                        </FormItem>
                        <FormItem label="Company">
                            <Input v-model="formTop.input3"></Input>
                        </FormItem>
                        <FormItem label="Location">
                            <Input v-model="formTop.input3" placeholder="Such as: Guangdong,Guangzhou"></Input>
                        </FormItem>
                        <FormItem label="Github">
                            <Input v-model="formTop.input3" placeholder="your Github home page,begin with https://"></Input>
                        </FormItem>
                        <FormItem label="zhihu">
                            <Input v-model="formTop.input3" placeholder="https://www.zhihu.com/people/xxx"></Input>
                        </FormItem>
                        <FormItem label="yuncun">
                            <Input v-model="formTop.input3" placeholder="share musicCloud to enjoy music together"></Input>
                        </FormItem>
                        <FormItem label="weibo">
                            <Input v-model="formTop.input3" placeholder="sina weibo."></Input>
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
                    input1: '',
                    input2: '',
                    input3: ''
                }
            }
        },
        methods: {
            handleSubmit(name){
                console.log(name)
            }
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