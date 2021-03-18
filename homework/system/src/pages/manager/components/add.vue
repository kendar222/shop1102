<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option v-for="item in RoleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="管理员状态" :label-width="formLabelWidth">
       <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949" :active-value='1' :inactive-value='2'>
            </el-switch>   
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {successAlert} from '../../../utils/alert'
import {addManager,managerDetail,updateManager} from '../../../utils/request'
export default { 
    props:['info'],
    data(){
        return {
            formLabelWidth: "120px",
            form:{
                roleid:'',
                username:'',
                password:'',
                status:1
            }
        }
    },
    computed:{
        ...mapGetters({
            'RoleList':'role/roleList'
        })
    },
    methods:{
        ...mapActions({
            'requestRoleList':'role/roleListActions',
            'requestTotal':'manager/managerTotalActions',
            'requestManagerList':'manager/managerListActions'
        }),
        cancel(){
            this.info.show = false;
            this.form = {
                roleid:'',
                username:'',
                password:'',
                status:1
            }
        },
        confirm(){
            addManager(this.form).then(res=>{
                successAlert(res.data.msg)
                this.cancel()
                this.requestTotal()
                this.requestManagerList()
            })
        },
        getManagerDetail(uid){
            managerDetail({uid}).then(res=>{
                this.form = res.data.list
                this.form.password = ''
            })
        },
        update(){
            updateManager(this.form).then(res=>{
                successAlert(res.data.msg)
                this.cancel()
                this.requestManagerList()
            })
        }
    },
    mounted(){
        this.requestRoleList()
    }
}
</script>

<style>

</style>