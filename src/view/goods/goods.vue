<template>
  <div>
    <el-button style="float: left;margin-bottom: 3px;" icon="el-icon-plus" circle @click="addGoods"></el-button>
    <el-table :data="goodsData"  elemen-loding-text="正在加载中....">
      <el-table-column prop="id" v-if="false"></el-table-column>
      <el-table-column align="center" property="iconUrl" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" width="40">
        </template>
      </el-table-column>
      <el-table-column prop="goodsSn" label="商品编号"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="brief" label="商品简介"></el-table-column>
      <el-table-column prop="wholesalePrice" label="批发价格"></el-table-column>
      <el-table-column prop="counterPrice" label="原价"></el-table-column>
      <el-table-column prop="retailPrice" label="销售价格"></el-table-column>
      <el-table-column prop="unit" label="商品单位"></el-table-column>
      <el-table-column prop="sales" label="销量"></el-table-column>
      <el-table-column prop="stock" label="库存"></el-table-column>
      <el-table-column prop="isOnSale" label="是否上架">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isOnSale ? 'success': 'error'">{{scope.row.isOnSale ? '是': '否'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="150">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="detail(scope.row)">详情</el-button>
          <el-button type="primary" size="mini" round @click="editGoods(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="delGoods(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "goods",
        data(){
            return {
                goodsData: [{
                    isOnSale: false
                }]
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getList(){
                this.$axios.post('/api/getGoodsList',{}).then((response) =>{
                    this.goodsData = response.data.data;
                });
            },
            detail(data){
                this.$router.push({name:'editGoods', params :{goods: data}});
            },
            editGoods(data){
                this.$router.push({name:'editGoods', params :{goods: data}});
            },
            delGoods(id){
              this.$axios.post('/api/delGoods',{id:id}).then((response) =>{
                  if(response.data.errno === 0){
                      this.$message.success('删除成功');
                      this.getList();
                  }else{
                      this.$message.error(response.data.errmsg);
                  }
              });
            },
            addGoods(){
                this.$router.push('/addGoods');
            }
        }
    }
</script>

<style scoped>

</style>
