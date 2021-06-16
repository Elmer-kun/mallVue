<template>
  <div>
    <img src="../assets/logo.png" alt="" class="img-rounded">
    <div style="bottom: 10%;">
      <div class="row">
        <div class="col-lg-6 container">
          <router-link to="/login">[商城后台]</router-link>
          <div class="input-group ">
            <input type="text" class="form-control" v-model="textInput">
            <span class="input-group-btn">
						<Button class="btn btn-default" type="submit" @click="getMood()">
							bored
						</Button>
					</span>
          </div><!-- /input-group -->
        </div><!-- /.col-lg-6 -->
      </div><!-- /.row -->
      <div class="col-lg-6 container" style="padding: 20px 0;">
        <p> 您今天心情： {{mood}}</p>
      </div>
      <div class="col-lg-6 container">
        <ul v-for="item in textList">
          <li>{{item.text}}</li>
        </ul>
      </div>
    </div>
    <div style="width:300px;margin:0 auto; padding:20px 0;">
      <img src="../assets/img/beiAn.png" alt="">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13052302000201" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">冀公网安备 13052302000201号</p></a>
      <a target="_blank" href="https://beian.miit.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">@{{year}} boredno 冀ICP备18030797号-1</p></a>
    </div>
  </div>
</template>

<script>
  import footer from "./footer";
    export default {
        name: "index",
        data(){
            return {
                year: new Date().getFullYear(),
                mood: '',
                textInput: '',
                textList:[]
            }
        },
        methods:{
            getMood(){
              this.$axios.post('/api/textSubmit', {
                  textInput: this.textInput
              }).then((response)=>{
                  this.mood = response.data.mood;
                  this.textList = response.data.text;
              });
            }
        }
    }
</script>

<style scoped>

</style>
