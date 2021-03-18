<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级菜单" value="0"></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
            <template>
            <el-radio el-radio v-model="form.type" :label="1">目录</el-radio>
            <el-radio v-model="form.type" :label="2">菜单</el-radio>
            </template>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url">
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
       <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949" :active-value='1' :inactive-value='2'>
            </el-switch>   
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="addMenu" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="updateMenu" v-else
          >修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addMenuList,oneMenu,update} from '../../../utils/request'
import {successAlert} from '../../../utils/alert'
import{mapGetters,mapActions} from'vuex'
export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: 0,
        title: "",
        icon: "",
        type:1,
        url: '',
        status:1
      },
      icons:['el-icon-setting','el-icon-goods','el-icon-s-operation'],
      urls:['menu','manager','role','cate','spec','goods','member','banner','seckill'],
      formLabelWidth: "120px",
    };
  },
  computed:{
    ...mapGetters({
      'menuList' : 'menu/menuList'
    })
  },
  methods:{
    addMenu(){
        addMenuList(this.form).then(res=>{
          // console.log(this.form);
          successAlert(res.data.msg);
          this.cancel();
          this.requestOption()
        })
    },
    cancel(){
      this.info.show = false;
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type:1,
        url: '',
        status:1
      }   
    },
    getDetail(id){
        oneMenu({id}).then(res=>{
          this.form = res.data.list
          this.form.id = id
        })
    },  
    ...mapActions({
      'requestOption':'menu/requestMenuActions'
    }),
    updateMenu(){
      update(this.form).then(res=>{
        successAlert(res.data.msg)
        this.cancel()
        this.requestOption()
      })
    }
  },
  mounted(){
    this.requestOption()
  }
};
</script>

<style>
</style>