<template>
<div>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <p class="title"><b>后台管理系统</b></p>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-button @click="outSystem" size="mini" plain type="primary">退出</el-button>
    </el-header>
    <el-container class="app_wrapper">
      <el-aside width="200px">
        <el-menu :default-openeds="['1']" :default-active="this.$route.path" router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
            <el-menu-item index="/mallIndex/goods">商品信息</el-menu-item>
        </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
            <el-menu-item index="/mallIndex/orders">订单信息</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
            <el-menu-item index="/mallIndex/user">用户信息</el-menu-item>
          </el-submenu>
      </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-container>
        <el-main>
          <!-- 二级路由跳转 -->
          <router-view></router-view>
        </el-main>
        <el-footer style="height: 30px">
          <lawFooter></lawFooter>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
  import {menus} from '../router'
  import lawFooter from "./footer";
    export default {
        name: "mallIndex",
        components: {
            'lawFooter':lawFooter
        },
        data(){
            return{
                year: new Date().getFullYear()
            }
        },
        methods: {
            outSystem(){
                this.$router.push("login");
            },
            getRoutes(){
              return menus;
            }
        }
    }
</script>

<style scoped>
  .title {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 24px;
    /*collapse: 4px;*/
    color: #062c33;
    float: left;
  }
  .app_wrapper {
    /*position: relative;*/
    height: 100%;
    width: 100%;
  }

  .el-container{
    height: 100%;
    min-height: 600px;
  }

  .app_content {
    min-height: 500px;
    /*margin-left: 180px;*/
    /*border: 1px solid #eee;*/
    /*box-sizing: border-box;*/
  }

  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 30px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/
    height: 100%;
  }

  .app_wrapper .el-aside,
  .slider_container .el-menu {
    /*color: #333;*/
    transition: width .28s;
    width: 200px !important;
    height: 100%;
    /*position: fixed;*/
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    background-color: rgb(48, 65, 86);
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
</style>
