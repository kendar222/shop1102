<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
         <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级菜单" value="0"></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="formLabelWidth">
            <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
           <div class="img-box">
               <h3>+</h3>
               <img :src="imgUrl" v-if="imgUrl" alt="">
               <input type="file">
           </div>
        </el-form-item>
         <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.description">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item> 
         <el-form-item label="规格属性" :label-width="formLabelWidth">
          <el-select v-model="form.specsid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in menuList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item> 
         <el-form-item label="是否新品" :label-width="formLabelWidth">
            <template>
            <el-radio el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.type" :label="2">否</el-radio>
            </template>
        </el-form-item>
         <el-form-item label="是否热卖" :label-width="formLabelWidth">
            <template>
            <el-radio el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.type" :label="2">否</el-radio>
            </template>
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
export default {
    props:['info'],
    data(){
        return {
            formLabelWidth:'120px',
            form:{
                first_cateid:'',
                second_cateid:'',
                goodsname:'',
                price:'',
                market_price:'',
                img:'',
                description:'',
                specsid:'',
                specsattr:'',
                isnew:1,
                ishot:1,
                status:1
            }
        }
    }
}
</script scoped>

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