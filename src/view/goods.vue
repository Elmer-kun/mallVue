<template>
  <div>
    <el-button style="float: left;margin-bottom: 3px;" icon="el-icon-plus" circle></el-button>
    <el-table :data="goodsData"  elemen-loding-text="正在加载中....">
      <el-table-column prop="id" v-if="false"></el-table-column>
      <el-table-column prop="date" label="商品编号"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="address" label="商品简介"></el-table-column>
      <el-table-column prop="address" label="原价"></el-table-column>
      <el-table-column prop="address" label="现价"></el-table-column>
      <el-table-column prop="address" label="商品单位"></el-table-column>
      <el-table-column prop="address" label="销量"></el-table-column>
      <el-table-column prop="address" label="是否上架"></el-table-column>
      <el-table-column label="操作" align="center" min-width="110">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="detail(scope.row)">详情</el-button>
          <el-button type="primary" size="mini" round>编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" circle></el-button>
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
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    id: 4,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods:{
            detail(data){
                alert(data.id);
            }
        }
    }
</script>

<style scoped>

</style>
