<template>
  <el-table
    :data="tableData"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="菜单编号">
    </el-table-column>
    <el-table-column prop="title" label="菜单名称">
    </el-table-column>
    <el-table-column prop="icon" label="菜单图标"> 
    </el-table-column>
    <el-table-column prop="url" label="菜单地址"> 
    </el-table-column>
    <el-table-column prop="status" label="状态">
        <template v-slot="prop">
            <el-button type="primary" v-if="prop.row.status==1">启用</el-button> 
            <el-button type="danger" v-else>禁用</el-button> 
        </template>
    </el-table-column>
    <el-table-column prop="status" label="操作">
          <template v-slot="prop">
            <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
            <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
          </template>
      </el-table-column>
  </el-table>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import { successAlert } from '../../../utils/alert';
import {delMenu} from '../../../utils/request'
export default {
    data(){
        return{
            // tableData: []
        }
    },
    computed:{
        ...mapGetters({
            'tableData':'menu/menuList'
        })
    },
    methods:{
        ...mapActions({
            'requestMenu':'menu/requestMenuActions'
        }),
        //通过自定义事件向父组件传递数据
        edit(id){
            this.$emit('edit',id)
        },
        del(id){
            this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发起删除菜单请求
          delMenu({id}).then(res=>{
              // 已经删除成功
              successAlert(res.data.msg);
              this.requestMenu()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        }
    },
    mounted(){
        this.requestMenu()
    }
};
</script>

<style scoped>
.el-table{
    margin-top: 10px;
}
</style>>
</style>