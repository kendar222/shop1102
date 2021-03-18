<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info"></v-add>
  </div>
</template>

<script>
import vAdd from './components/add'
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
        vAdd
    },
    methods:{
        add(){
            this.info.show = true
            this.info.title = '添加商品'
            this.info.isAdd = true
        }
    }
}
</script>

<style>
.el-button{
    margin-top: 10px;
}
</style>