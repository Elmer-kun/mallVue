<template>
    <div>
      <img src="../assets/img/beiAn.png" alt="">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13052302000201" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">冀公网安备 13052302000201号</p></a>
      <a target="_blank" href="https://beian.miit.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">@{{year}} boredno 冀ICP备18030797号-1</p></a>
      <a target="_blank" href="" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">版权所有 侵权必究</p></a>
    </div>
</template>

<script>
    export default {
        name: "lawLooter",
        data(){
            return{
                year: new Date().getFullYear()
            }
        },
    }
</script>

<style scoped>

</style>
