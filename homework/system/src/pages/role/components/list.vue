<template>
  <el-table
    :data="tableData"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="角色编号">
    </el-table-column>
    <el-table-column prop="rolename" label="角色名称">
    </el-table-column>
    <el-table-column prop="status" label="角色状态">
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
import {mapActions,mapGetters} from 'vuex'
import {successAlert} from '../../../utils/alert'
import {delRole} from '../../../utils/request'
export default { 
    data(){
        return {

        }
    },
    computed:{
        ...mapGetters({
            'tableData':'role/roleList'
        })
    },
    methods:{
        ...mapActions({
            'requestRoleList':'role/roleListActions',
        }),
        edit(id){
            this.$emit('edit',id)
        },
        del(id){
            this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发起删除角色请求
          delRole({id}).then(res=>{
              // 已经删除成功
              successAlert(res.data.msg);
              this.requestRoleList()
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
        this.requestRoleList()
    }
}
</script>

<style scoped>
    .el-table{
        margin-top: 10px;
    }
</style>