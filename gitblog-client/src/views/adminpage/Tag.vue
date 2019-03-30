<template>
    <div class="tag-manage">
        <settings-title>
            Add And Update Tag
        </settings-title>
        <div class="tag-form">
            <Form ref="formInline" inline>
                <FormItem  prop="newTag">
                    <Input type="text" v-model="newTag" placeholder="add Tags.." @keydown.native.enter.prevent="handleSubmit('formInline')" />
                    <Icon type="ios-pricetags" slot="prepend"></Icon>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">add</Button>
                </FormItem>
            </Form>
        </div>

        <div class="tags-container">
            <div class="tag-item" v-for="item in tagList" :key="item.name">
                <span>{{item.name}}</span>
                <div class="tag-delete" v-if="deleteBtn">
                   ss
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SettingsTitle from '../../components/SettingsTitle'
    export default {
        name: "Tag",
        components:{
            SettingsTitle
        },
        data(){
          return {
              tagList: [],
              newTag: '',
              deleteBtn: false
          }
        },
        methods:{
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    console.log(`我要提交的内容是：${this.newTag}`);
                    if (valid) {
                        if(this.newTag === ''){
                            this.$Message.error('内容不能为空哦(⊙x⊙;)');
                        }else{
                            console.log('我准备提交表单');
                            this.$axios.post('/api/tags', {newTag: this.newTag})
                                .then(() => {
                                    this.tagList.unshift({name: this.newTag});
                                    console.log(this.tagList);
                                    this.newTag = '';
                                    this.$Message.success('添加成功!φ(≧ω≦*)♪');
                                })
                                .catch(error => {
                                    console.log(error)
                                });
                        }
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            fetchTags(){
                this.$axios.get('/api/tags')
                    .then(data => {
                        this.tagList = data.data.tags;
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        created() {
            this.fetchTags();
        }
    }
</script>

<style lang="less">
    .tag-manage{
        width: 100%;
        .tags-container{
            width: 100%;
        }
        .tag-item{
            float: left;
            position: relative;
            box-sizing: border-box;
            padding: 5px;
            margin-right: 20px;
            margin-top: 10px;
            border-radius: 2px;
            background-color: rgba(176,224,230, 0.3);
            font-size: 16px;
            color: #1E90FF;
            &:hover{
                background-color: rgba(0,255,255, 0.6);
            }
            span{
                cursor: pointer;
            }
            .tag-delete{
                position: absolute;
                right: 0;
                top: 0;
                width: 10px;
                height: 10px;
                border-radius: 5px;
                border: 1px solid transparent;
                background-color: yellowgreen;
            }
        }
    }

</style>