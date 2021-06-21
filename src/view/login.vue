<template>
<div>
  <img src="../assets/logo.png" alt="" class="img-rounded">
  <div class="container">
    <div class="text-center">
      <div class="col-md-6 offset-3">
        <div class="form-group">
          <label>用户名</label>
          <input class="form-control" type="text" v-model="userName" placeholder="请输入用户名" />
        </div>
        <div class="form-group">
          <label>密  码</label>
          <input class="form-control" type="password" v-model="passWord" placeholder="密 码" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="doLogin()">登 录</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return{
                userName: '',
                passWord: ''
            }
        },
        methods:{
            doLogin(){
                this.$axios.post("/api/login", {
                    userName: this.userName,
                    passWord: this.passWord
                }).then((response) =>{
                    if(response.data.errno === 0){
                        this.$router.push('mallIndex');
                    }else{
                        this.$message.error(response.data.errmsg);
                    }
                });
            }
        }
    }
</script>

<style type="text/css">
label {
  margin-right: 90%;
  margin-bottom: 0;
}
</style>
