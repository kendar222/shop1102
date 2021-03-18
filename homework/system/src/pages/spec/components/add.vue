<template>
    <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="formLabelWidth">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>

        <el-form-item v-for="(item,index) in attrArr" :key='index' label="规格属性" :label-width="formLabelWidth">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
        </el-form-item>

        <el-form-item label="规格状态" :label-width="formLabelWidth">
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
import { mapActions } from 'vuex'
import { successAlert, warningAlert } from '../../../utils/alert'
import { addGoodsSpec, editSpec, oneSpec } from '../../../utils/request'
export default {
  props:['info'],
    data(){
      return {    
        formLabelWidth: "120px", 
        attrArr:[{value:''}],
        form:{
            specsname:'',
            attrs:'',
            status:1
        }
      }
    },
    methods:{
      ...mapActions({
        'requestSpecsCount':'spec/specsCountActions',
        'requestSpecsList':'spec/specsListActions'
      }),
      cancel(){
        this.info.show = false;
        this.form = {
              specsname:'',
              attrs:'',
              status:1
          };
        this.attrArr = [{value:''}];
      },
      addAttr(){
        this.attrArr.push({value:''})
      },
      delAttr(index){
        this.attrArr.splice(index,1)
      },
      confirm(){
        //处理属性
        if(this.attrArr.some(item=>item.value === '')){
          warningAlert('规格属性不能为空');
          return
        }
        //map遍历数组返回数组中的value组成数组，join将它们变为字符串
        this.form.attrs = this.attrArr.map(item=>item.value).join(',')
        addGoodsSpec(this.form).then(res=>{
          successAlert(res.data.msg)
          this.cancel()
          this.requestSpecsCount()
          this.requestSpecsList()
        
        })
      },
      getSpecDetail(id){
        oneSpec({id}).then(res=>{
          console.log(res);
          this.form = res.data.list[0]
          this.form.id= id
          //将attrs变为数组
          var arr = this.form.attrs.split(',');
          this.attrArr = [];
          for(let i in arr){
            //遍历属性数组放进attrArr中数组中
            this.attrArr.push({value:arr[i]})
          }
        })
      },
      update(){
        //处理数据
        if(this.attrArr.some(item=>item.value === '')){
          warningAlert('属性不能为空')
          return;
        }
        //将数组变为字符串
        this.form.attrs = this.attrArr.map(item=>item.value).join(',')
        editSpec(this.form).then(res=>{
          successAlert(res.data.msg);
          this.cancel()
        })
      }
    }
}
</script>

<style>
.el-input{
  width:200px
}
</style>