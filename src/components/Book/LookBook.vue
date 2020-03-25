<template>
  <div id="LookBook">
      <ul>
         <li  v-for="(item,index) in Book_list" :key="index">
             <p>{{item}}</p>
      </li>
      </ul>
      <div id="btn">
          <button @click="goold()">上一章</button>
          <button @click="$router.back(-1)">目录</button>
          <button @click="gonew()">下一章</button>
      </div>
  </div>
</template>

<script>
export default {
    name:'LookBook',
     data(){
    return{
      url:'http://api.pingcc.cn/?xsurl2=',
      Book_list:'',
      Book_Arry:'',
      num:'',
    }
  },
    deactivated:function(){
    this.url = "http://api.pingcc.cn/?xsurl2="
  },
    activated:function(){
      //通过这两个对象可以对对象执行操作
        // console.log(this.$route.params.id);
        var list = decodeURIComponent(this.$route.params.id);
        this.num = this.$route.params.num;
        this.Book_Arry = JSON.parse(list);
        this.url = this.url+this.Book_Arry[this.num].url
        console.log(this.url)
        if(this.$route.params.id.startsWith("http")){
        console.log('外网') 
        }else{
        this.$axios.get(this.url)
        .then(res=>{
        if(res.data.code == 1){
        alert('页面404')
        }else{
            // console.log(this.Book_list);
        this.Book_list = res.data.content
      }
})
 }
  },
  methods:{
      goold(){
          if(this.num == 0){
            //判断是否是数组第一
            console.log('已经是第一章')
            return false
          }else{
            //调用方法函数，传递数值
            this.Common(-1);
          }
      },
      gonew(){
          if(this.num == this.Book_Arry.length){
            //判断是否是数组最后
            console.log('已经是最后一章')
            return false
          }else{
            //调用方法函数，传递数值
            this.Common(1);
          }
      },
      Common:function(int){
        console.log('这是一个全局动用函数',int)
        //回到顶部
        document.documentElement.scrollTop = 0;
        //获取对应路径
        this.num= Number(this.num+int)
        this.url =  "http://api.pingcc.cn/?xsurl2="
        this.url = this.url+this.Book_Arry[this.num].url
        //发送请求
        if(this.$route.params.id.startsWith("http")){
            console.log('外网') 
        }else{
        this.$axios.get(this.url)
        .then(res=>{
            if(res.data.code == 1){
            alert('页面404')
        }else{
        //更新数据
            this.Book_list = res.data.content
        }
        })
        }
      }
  },
//   updated:function(){
//       console.log('数据更新了')
//   }
}
</script>

<style>

</style>