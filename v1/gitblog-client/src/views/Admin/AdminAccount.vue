<template>
    <div class="account-containers">
        <settings-title>
            Change password
        </settings-title>

        <div class="account-settings">
            <Form ref="passwordForm" :model="passwordData" label-position="top" :rules="ruleInline" >
                <FormItem label="Old password" prop="old" style="width: 420px">
                    <Input type="password" v-model="passwordData.old" />
                </FormItem>
                <FormItem label="New password" prop="newPass" style="width: 420px">
                    <Input type="password" v-model="passwordData.newPass" />
                </FormItem>
                <FormItem label="Confirm new password" prop="repeatNew" style="width: 420px">
                    <Input type="password" v-model="passwordData.repeatNew" />
                </FormItem>
                <div class="account-tips">
                    Make sure it's <span class="account-red"> more than 15 characters</span> OR <span class="account-red">at least 8 characters including a number</span> <span class="account-green">and a lowercase letter.</span> <span class="account-blue">Learn more.</span>
                </div>
                <FormItem>
                    <Button class="account-button" type="primary" @click="handleSubmit('passwordForm')">Update password</Button>
                </FormItem>
                <div class="email-forget">
                    <router-link to="/reset">I forgot my password</router-link>
                </div>
            </Form>

        </div>
    </div>
</template>

<script>
    import SettingsTitle from '../../components/SettingsTitle'
    export default {
        name: "Account",
        components:{
            SettingsTitle
        },
        data(){
            var  repeatPassValid = (rule, value, callback) => {
                if(!value){
                    return callback(new Error("Please fill in the password."));
                }else if(value !== this.passwordData.newPass){
                    return callback(new Error("the password is not the same as before"))
                }else{
                    callback();
                }
            };
            return {
                passwordData:{
                    old: '',
                    newPass:'',
                    repeatNew: ''
                },
                ruleInline: {
                    old: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 8, message: 'The password length cannot be less than 8 bits', trigger: 'blur' }
                    ],
                    newPass: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 8, message: 'The password length cannot be less than 8 bits', trigger: 'blur' }
                    ],
                    repeatNew: [
                        { validator: repeatPassValid, trigger: 'blur' },
                        { type: 'string', min: 8, message: 'The password length cannot be less than 8 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name){
                this.$refs[name].validate( (valid) =>{
                    if(valid){
                        const postData =this.passwordData;
                        postData.username = this.$store.state.user.username;
                        this.$axios.post('/api/users/changepassword', postData)
                            .then(() => {
                                if(localStorage.profile){
                                    localStorage.removeItem('profile');
                                }
                                localStorage.removeItem('blogToken');
                                localStorage.removeItem('user');
                                this.$router.replace('/signin');
                                this.$Message.success('更改成功~\(≧▽≦)/~啦啦啦，重新登录吧ヾ(￣▽￣)Bye~Bye~');
                            })
                            .catch((error) =>{
                                console.log(error)
                            });
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .account-containers{
        width: 920px;
    }
    .account-settings{
        form > div label{
            font-size: 20px;
            font-weight: 600;
            color: black;
        }
    }
    .account-button{
        background-color: #E7ECF1;
        color: black;
    }
    .account-tips{
        font-size: 12px;
        color: #586069;
        .account-red{
            color: red;
        }
        .account-green{
            color: green;
        }
        .account-blue{
            color: blue;
        }
    }
    .email-forget{
        float: left;
    }
</style>