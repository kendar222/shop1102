<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>
      <v-add :info='info' ref="add"></v-add>
      <v-list @edit='edit'></v-list>
  </div>
</template>


<script>
import vAdd from './components/add'
import VList from './components/list'
export default {
    data(){
        return{
            info:{
                show:false,
                title:'',
                isAdd:true
            }
        }
    },
    components:{
        vAdd,
        VList
    },
    methods:{
        add(){
            this.info.show = true,
            this.info.title = '添加商品分类',
            this.info.isAdd = true
        },
        edit(id){
            this.info.show = true,
            this.info.title = '修改商品分类',
            this.info.isAdd = false
            this.$refs.add.getCateDetail(id)
        }
    }
}
</script>

<style>
 .el-button{
     margin-top: 10px;
 }
</style>