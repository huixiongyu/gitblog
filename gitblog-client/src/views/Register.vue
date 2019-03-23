<template>
    <div class="register">
        <div class="register-header">
            <Row>
                <i-col span="3">
                    <div>.</div>
                </i-col>
                <i-col class="nav-to" span="10">
                    <svg height="32" class="octicon octicon-mark-github text-white logo-white" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                    <a href="/" class="register-link">Why Github?</a>
                    <a href="/" class="register-link">Enterprise</a>
                    <a href="/" class="register-link">Explore</a>
                    <a href="/" class="register-link">Marketplace</a>
                    <a href="/" class="register-link">Pricing</a>
                </i-col>
                <i-col class="register-search" span="8" offset="1">
                    <Input  icon="md-create" placeholder="Search Github" style="width: 240px" />
                    <a href="/login" class="register-link sign-in">Sign in</a>
                    <Button type="default" ghost class="register-link sign-up" to="/register">Sign up</Button>
                </i-col>
                <i-col span="2"></i-col>
            </Row>
        </div>
        <div class="register-content">
            <i-col span="3">
                <div>.</div>
            </i-col>
            <i-col span="9">
                <h1 class="for-developers">Built for developers</h1>
                <div class="github-desc">GitHub is a development platform inspired by the way you work. From <a class="desc-link">open source</a> to <a class="desc-link">business</a>, you can host and review code, manage projects, and build software alongside 31 million developers.</div>
            </i-col>
            <i-col span="10" offset="1">
                <Card class="signup-box" style="width:430px;height: 432px;">
                    <Form :model="signInfo" label-position="top">
                        <FormItem label="Username">
                            <Input size="large" v-model="signInfo.username" placeholder="Pick a username"  />
                        </FormItem>
                        <FormItem label="Email">
                            <Input size="large" v-model="signInfo.email" type="email" placeholder="you@example.com"  />
                        </FormItem>
                        <FormItem label="Password">
                            <Input size="large" v-model="signInfo.password" type="password" placeholder="Create a password" />
                        </FormItem>
                        <div class="signup-tips">Make sure it's <span class="input-limit">more than 15 characters</span> OR <span class="input-limit">at least 8 characters including a number and a lowercase letter</span>.<a class="input-tips"> Learn more</a>.</div>
                        <FormItem>
                            <Button class="signup-button" type="success" style="height: 66px;" long>Sign up for Github</Button>
                        </FormItem>
                        <div class="signup-clause">By clicking “Sign up for GitHub”, you agree to our <a class="input-tips">terms of service</a> and <a class="input-tips">privacy statement</a>. We’ll occasionally send you account related emails.</div>
                    </Form>
                </Card>
            </i-col>
            <i-col span="1">
                <div>.</div>
            </i-col>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'register',
        data(){
            return {
                signInfo: {
                    username: '',
                    email: '',
                    password: ''
                }
            }
        }
    }
</script>
<style lang="less">
    .register{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        bottom: 0px;
        margin: 0;
        background-image: url("../assets/images/register-bg4.jpeg");
        background-size: 100%;
        background-repeat:no-repeat;
        z-index: 0;
        overflow: hidden;
    }
    .register-header{
        width: 100%;
        height: 90px;
        background: #2B3137;
    }
    .nav-to{
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
    .logo-white{
        margin-top: -5px;
    }
    .register-link{
        color: #fff;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        &:hover{
            color: 	#B0C4DE;
        }
    }
    .register-search{
        margin-top: 28px;
        display: flex;
        justify-content: space-evenly;
    }
    .sign-up{
        margin-top: -5px ;
        font-size: 14px;
    }
    .for-developers{
        margin-top: 160px;
        font-size: 70px;
        line-height: 70px;
        color: white;
    }
    .github-desc{
        margin-top: 10px;
        color: #B0C4DE;
        font-size: 20px;
        font-weight: 500;
    }
    .desc-link{
        color: white;
        text-decoration-line: underline;
        text-decoration-color: #586069;
        &:hover{
            color: white;
            text-decoration-color: #586069;
        }
    }
    .signup-box{
        margin-top: 45px;
    }
    .signup-tips{
        color: rgb(106, 115, 125);
        font-size: 12px;
        word-wrap: break-word;
        margin-bottom: 15px;
    }
    .input-tips{
        margin-top: -10px;
        &:hover{
            text-decoration-line: underline;
        }
    }
    .input-limit{
        color: red;
    }
    .signup-clause{
        color: rgb(106, 115, 125);
        font-size: 12px;
        word-wrap: break-word;
        margin-top: -15px;
    }
</style>