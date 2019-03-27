<template>
    <div class="userprofile">
        <Row>
            <i-col span="7" class="comment-point">.</i-col>
            <i-col span="10">
                <Card style="width:100%">
                    <div style="text-align:center">
                        <Form :model="formTop" label-position="left">
                            <FormItem label="Title">
                                <Input v-model="formTop.input1"></Input>
                            </FormItem>
                            <FormItem label="Title name">
                                <Input v-model="formTop.input2"></Input>
                            </FormItem>
                            <FormItem label="Aligned title">
                                <Input v-model="formTop.input3"></Input>
                            </FormItem>
                        </Form>
                    </div>
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
        }
    }
</script>

<style lang="less" scoped>
    .userprofile{
        margin-top: 50px;
    }
    .comment-point{
        color: white;
    }
</style>