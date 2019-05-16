<template>
    <div class="classify-container">
        <settings-title>
            Categories of Post
        </settings-title>
        <div class="classify-add">
            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                <FormItem >
                    <Select v-model="formInline.select" placeholder="选择父类">
                        <Option v-for="parent in selectData" :value="parent" :key="parent">{{parent}}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="name">
                    <Input type="text"
                           v-model="formInline.name"
                           @keydown.native.enter.prevent="handleSubmit('formInline')"
                           placeholder="添加分类" />
                        <Icon type="md-folder" slot="prepend"></Icon>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')">add</Button>
                </FormItem>
            </Form>
        </div>
        <Divider />

        <div class="classify-list">
            <ul>
                <li type="disc" v-for="item in allClassify" :key="item.name">
                    {{item.name}}
                    <ul v-show="item.children.length > 0">
                        <li class="children-li" type="circle" v-for="inneritem in item.children" :key="inneritem.name">{{inneritem.name}}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import SettingsTitle from '../../components/SettingsTitle'
    export default {
        name: "Categories",
        components:{
            SettingsTitle
        },
        data(){
            return {
                formInline: {
                    select: '',
                    name: '',
                    child: ''
                },
                ruleInline: {
                    name: [
                        { required: true, message: 'Please fill in the classify name', trigger: 'blur' }
                    ]
                },
                selectData: [],
                allClassify: []
            }
        },
        methods: {
            handleSubmit(name){
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            // console.log('我通过字段验证了');
                            // console.log(this.formInline.name);
                            if(this.formInline.select === ''){
                                // console.log('开始传输数据');
                                this.$axios.post('/api/classify', {name: this.formInline.name })
                                    .then((res) => {
                                        this.selectData.push(this.formInline.name);
                                        this.allClassify.push({name: this.formInline.name, children: []});
                                        this.formInline.name = '';
                                        this.$Message.success('Success!');
                                        console.log(res);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            }else{
                                console.log(`这是我选择的父类：${this.formInline.select}`);
                                this.$axios.post('/api/classify/child', {name: this.formInline.select, child: this.formInline.name })
                                    .then(() => {
                                        this.selectData = [];
                                        this.formInline.name = '';
                                        this.fetchData();
                                        this.$Message.success('Success!');
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                            }
                        } else {
                            this.$Message.error('Fail!');
                        }
                    });
            },
            fetchData(){
                this.$axios.get('/api/classify')
                    .then(data => {
                        this.allClassify =data.data;
                       this.allClassify.map(item => {
                           this.selectData.push(item.name);
                       });

                       // console.log(this.selectData);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        created(){
            this.fetchData();
        }
    }
</script>

<style lang="less">
    .classify-container{
        width: 920px;
    }
    .classify-list{
        ul{
            font-size: 16px;
            font-weight: 600;
            color: #666666;
        }
        .children-li{
            margin-left: 50px;
        }
    }
</style>