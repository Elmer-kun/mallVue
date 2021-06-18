<template>
    <div>
      <el-card>
        <h5>商品介绍</h5>
        <el-form ref="goods" :model="goods" :rules="rules">
          <el-form-item label="商品编号" prop="goodsSn" label-width="150px">
            <el-input v-model="goods.goodsSn"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="name" label-width="150px">
            <el-input v-model="goods.name"/>
          </el-form-item>
          <el-form-item label="专柜价格" prop="counterPrice" label-width="150px">
            <el-input v-model="goods.counterPrice" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="当前价格" prop="retailPrice" label-width="150px">
            <el-input v-model="goods.retailPrice" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="批发价格" prop="wholesalePrice" label-width="150px">
            <el-input v-model="goods.wholesalePrice" placeholder="0.00">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="stock" label="库存" label-width="150px">
            <el-input v-model="goods.stock"></el-input>
          </el-form-item>
          <el-form-item label="是否新品" prop="isNew" label-width="150px">
            <el-radio-group v-model="goods.isNew">
              <el-radio :label="true">新品</el-radio>
              <el-radio :label="false">非新品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否热卖" prop="isHot" label-width="150px">
            <el-radio-group v-model="goods.isHot">
              <el-radio :label="false">普通</el-radio>
              <el-radio :label="true">热卖</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否在售" prop="isOnSale" label-width="150px">
            <el-radio-group v-model="goods.isOnSale">
              <el-radio :label="true">在售</el-radio>
              <el-radio :label="false">未售</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品图片" label-width="150px">
            <el-upload
              :action="uploadPath"
              :show-file-list="false"
              class="avatar-uploader"
              :on-success="uploadPicUrl"
              accept=".jpg,.jpeg,.png,.gif"
            >
              <img v-if="goods.picUrl" :src="goods.picUrl" width="40">
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>

<!--          <el-form-item label="宣传画廊">-->
<!--            <el-upload-->
<!--              :action="uploadPath"-->
<!--              :limit="5"-->
<!--              :headers="headers"-->
<!--              :on-exceed="uploadOverrun"-->
<!--              :on-success="handleGalleryUrl"-->
<!--              :on-remove="handleRemove"-->
<!--              multiple-->
<!--              accept=".jpg,.jpeg,.png,.gif"-->
<!--              list-type="picture-card">-->
<!--              <i class="el-icon-plus"/>-->
<!--            </el-upload>-->
<!--          </el-form-item>-->

          <el-form-item label="商品单位" label-width="150px">
            <el-input v-model="goods.unit" placeholder="件 / 个 / 盒"/>
          </el-form-item>

<!--          <el-form-item label="关键字">-->
<!--            <el-tag v-for="tag in keywords" :key="tag" closable type="primary" @close="handleClose(tag)">-->
<!--              {{ tag }}-->
<!--            </el-tag>-->
<!--            <el-input-->
<!--              v-if="newKeywordVisible"-->
<!--              ref="newKeywordInput"-->
<!--              v-model="newKeyword"-->
<!--              class="input-new-keyword"-->
<!--              size="small"-->
<!--              @keyup.enter.native="handleInputConfirm"-->
<!--              @blur="handleInputConfirm"/>-->
<!--            <el-button v-else class="button-new-keyword" size="small" type="primary" @click="showInput">+ 增加</el-button>-->
<!--          </el-form-item>-->

<!--          <el-form-item label="所属分类">-->
<!--            <el-cascader :options="categoryList" expand-trigger="hover" @change="handleCategoryChange"/>-->
<!--          </el-form-item>-->

<!--          <el-form-item label="所属品牌商">-->
<!--            <el-select v-model="goods.brandId">-->
<!--              <el-option v-for="item in brandList" :key="item.value" :label="item.label" :value="item.value"/>-->
<!--            </el-select>-->
<!--          </el-form-item>-->

          <el-form-item label="商品简介" label-width="150px">
            <el-input v-model="goods.brief"/>
          </el-form-item>

<!--          <el-form-item label="商品详细介绍">-->
<!--            <editor :init="editorInit" v-model="goods.detail"/>-->
<!--          </el-form-item>-->
        </el-form>
      </el-card>
      <div class="op-container">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handlePublish">上架</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "goodsEdit",
        data(){
            return {
                uploadPath: '/api/goodsPic',
                goods: this.$route.params.goods,
                rules: {
                    goodsSn: [{ required: true, message: '商品编号不能为空', trigger: 'blur' }],
                    name: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
                    stock: [{ required: true, message: '商品库存不能为空', trigger: 'blur' }]
                },
                editorInit: {
                    language: 'zh_CN',
                    convert_urls: false,
                    plugins: ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'],
                    toolbar: ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'],
                    images_upload_handler: function(blobInfo, success, failure) {
                        const formData = new FormData()
                        formData.append('file', blobInfo.blob())
                        createStorage(formData).then(res => {
                            success(res.data.data.url)
                        }).catch(() => {
                            failure('上传失败，请重新上传')
                        })
                    }
                }
            }
        },
        methods:{
            handleCancel() {
                this.$router.push('/mallIndex/goods');
            },
            handlePublish(){
                this.$axios.post('/api/editGoods', this.goods).then((response) => {
                    if(response.data.errno === 0){
                        this.$message.success('上架成功');
                        this.$router.push('/mallIndex/goods');
                    }else{
                        this.$message.error(response.data.errmsg);
                    }
                }).catch(response => {
                    this.$message.error('上架错误');
                })
            },
            uploadPicUrl(response) {
                if(response.errno === 0) {
                    this.goods.picUrl = 'http://localhost:8080/mallImg/' + response.data;
                }
            }
        }
    }
</script>

<style scoped>
.op-container {
  margin-top: 3px;
}
</style>
