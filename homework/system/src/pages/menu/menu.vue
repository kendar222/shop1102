<template>
  <div>
      <el-button type="primary" @click="add" >添加</el-button>
      <v-add :info='info' ref="add"></v-add>
      <v-list @edit="edit"></v-list>
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
            this.info.show = true
            this.info.title = "添加菜单"
            this.info.isAdd = true
        },
        //自定义的事件名在子组件中
        edit(id){
            this.info.show = true
            this.info.title = '修改菜单'
            this.info.isAdd = false
            //绑定子组件AD
            this.$refs.add.getDetail(id)
        }
    }
    
}
</script>

<style>
.el-button{
    margin-top: 20px;
}
</style>