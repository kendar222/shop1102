<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value="" disabled></el-option>
            
            <el-option label="顶级分类" :value="0" ></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
            <!-- 自定义文件上传 -->
          <div class="img-box">
              <h3>+</h3>
              <img :src="imgUrl" v-if="imgUrl" alt="">
              <input type="file" @change="changeImg">
          </div>
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
import { mapActions, mapGetters } from 'vuex';
import { warningAlert,successAlert } from '../../../utils/alert';
import {addGoodsCate, editCate, getOneCate} from '../../../utils/request'
export default {
    props:['info'],
    data(){
        return {
            imgUrl:'',//要显示的图片地址
            formLabelWidth:'120px',
            form:{
                pid:0,
                catename:'',
                img:'',
                status:1
            }
        }
    },
    computed:{
        ...mapGetters({
            'cateList':'cate/cateList'
        })
    },
    methods:{
        ...mapActions({
            'requestCateList':'cate/cateListActions'
        }),
        changeImg(e){
            console.log(e);
            //取出文件信息
            var file = e.target.files[0];
            //处理文件大小
            if(file.size > 2*1024*1024){
                warningAlert('文件大小不能超过2M');
                return
            }
            //处理文件后缀
            var ext = ['.jpg','.png','.jpeg','.gif'];
            var extName = file.name.slice(file.name.lastIndexOf('.'));
            if(!ext.some(item=>item==extName)){
                warningAlert('上传文件格式不正确')
                return
            }

            //将图片显示在页面中
            this.imgUrl = URL.createObjectURL(file);
            this.form.img = file
        },
        cancel(){
            this.info.show = false
            this.form = {
                pid:0,
                catename:'',
                img:'',
                status:1
            };
            this.imgUrl = '';
        },
        confirm(){
            addGoodsCate(this.form).then(res=>{
                successAlert(res.data.msg);
                this.cancel()
                this.requestCateList()
            })
        },
        getCateDetail(id){
          getOneCate({id}).then(res=>{
            console.log(res);
            this.form = res.data.list
            this.form.id = id
            this.imgUrl = this.$preImg + this.form.img
          })
        },
        update(){
          editCate(this.form).then(res=>{
            successAlert(res.data.msg)
            this.cancel()
            this.requestCateList()
          })
        }
    },
    mounted(){
        this.requestCateList()
    }
}
</script>

<style scoped>
.img-box{
  width:150px;
  height: 150px;
  border:1px dashed green;
  position: relative;

}
.img-box h3{
  width:100%;
  height: 100%;
  text-align: center;
  line-height: 150px;
}
.img-box img{
  width:100%;
  height: 100%;
  position: absolute;
  left:0;
  top:0;
}
.img-box input{
    width:100%;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    opacity: 0;
}
</style>