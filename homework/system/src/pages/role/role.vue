<template>
    <div>
        <el-button type='primary' @click="add">添加</el-button>
        <v-add :info="info" ref="add"></v-add>
        <v-list @edit='edit'></v-list>
    </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
    data(){
        return {
            info:{
                show:false,
                title:'',
                isAdd:true
            }
        }
    },
    components:{
        vAdd,
        vList
    },
    methods:{
        add(){
            this.info.show = true,
            this.info.title = '添加角色',
            this.info.isAdd = true
        },
        edit(id){
            this.info.show = true,
            this.info.title = '修改角色'
            this.info.isAdd = false
            this.$refs.add.getRoleDetail(id)
        }
    }
}
</script>

<style scoped>
    .el-button{
        margin-top: 20px;
    }
</style>