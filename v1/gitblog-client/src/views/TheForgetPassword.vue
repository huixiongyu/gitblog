<template>
    <div class="container">
        <div class="panel">
            <div class="logo">
                <svg height="48" class="octicon octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="48" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z">
                    </path>
                </svg>
            </div>

            <div class="hello">
                <p class="world">Reset your password</p>
            </div>

            <div class="form-table">
                <Card style="width:308px;height:178px">
                    <Form  label-position="top">
                        <FormItem class="reset-info" label="Enter your email address to get reset link">
                            <Input v-model="resetEmail" />
                        </FormItem>
                        <FormItem>
                            <Button class="login-button" 
                                    type="success"
                                    style="fontSize:14px;fontWeight:600">Send password reset email</Button>
                        </FormItem>
                    </Form>
                </Card>    
            </div>

            <div class="footer">
                <router-link to="/" tag="a" class="inline-flex">Terms</router-link>
                <router-link to="/" tag="a" class="inline-flex">Privacy</router-link>
                <router-link to="/" tag="a" class="inline-flex">Security</router-link>
                <span class="inline-flex">Contact GitBlog</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "reset",
    data() {
        return {
            resetEmail: ''
        }
    }
}
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    
}
.panel{
    width: 308px;
    height: 100%;
    margin: 0 auto;
}
.logo{
    width: 100%;
    position: relative;
    margin-top: 33px;
    left: 50%;
    margin-left: -24px;
}
.hello{
    width: 100%;
    margin-top: 25px;
    .world{
        width: 100%;
        font-size: 24px;
        font-weight: 300;
        text-align: center;
        color: #333;
    }
}
.form-table{
    margin-top: 20px;
}
.reset-info{
    color:#000;
    font-size:20px;
    font-weight:600;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    word-wrap:break-word;
}
.login-button{
    width: 274px;
}

.footer{
    width: 308px;
    height: 25px;
    margin-top: 90px;
    display: inline-flex;
    justify-content: space-evenly;
}
</style>

