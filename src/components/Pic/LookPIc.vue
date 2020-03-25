<template>
  <div id="LookPic">
  <div class="Pic_img">
      <ul>
         <li  v-for="(item,index) in Pic_list" :key="index">
             <img :src="item.img">
      </li>
      </ul>
  </div>


      <div id="btn">
          <button @click="goold()">上一章</button>
          <button @click="$router.back(-1)">目录</button>
          <button @click="gonew()">下一章</button>
      </div>
  </div>
</template>

<script>
export default {
    name:'LookPic',
     data(){
    return{
      url:'http://api.pingcc.cn/?mhurl2=',
      Pic_list:'',
      Pic_Arry:'',
      num:'',
    }
  },
    deactivated:function(){
    this.url = "http://api.pingcc.cn/?mhurl2="
  },
    activated:function(){
      //通过这两个对象可以对对象执行操作
        // console.log(this.$route.params.id);
        var list = decodeURIComponent(this.$route.params.id);
        this.num = this.$route.params.num;
        this.Pic_Arry = JSON.parse(list);
        this.url = this.url+this.Pic_Arry[this.num].url
        console.log(this.Pic_Arry[this.num].url)
        if(this.$route.params.id.startsWith("http")){
        console.log('外网') 
        }else{
        this.$axios.get(this.url)
        .then(res=>{
            console.log(res)
        if(res.data.code == 1){
        alert('页面404')
        }else{
            // console.log(this.Book_list);
        this.Pic_list = res.data.list

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
          if(this.num == this.Pic_Arry.length){
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
        this.url =  "http://api.pingcc.cn/?mhurl2="
        this.url = this.url+this.Pic_Arry[this.num].url
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
            this.Pic_list = res.data.list
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
.Pic_img{
    width: 100%;
}
.Pic_img img{
    width: 100%;
}
</style>