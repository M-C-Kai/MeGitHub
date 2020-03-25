<template>
  <div id="Bookcommon">
    <div class="list_Bookcommon" v-show="isShow">
    <ul>
      <li  v-for="(item,index) in Book_list" :key="index" @click="Styleopen(index)">
          <p  :class="generateClassName(index)">{{item.num}}</p>
      </li>
    </ul>
    </div>
    <div>
      <a :href="this.router" v-show="!isShow">外网资源请点击跳转</a>
    </div>
<!-- <mt-cell-swipe title="标题文字" value='222nidfhe r'>
  <Slot>asfrwqf</Slot>
</mt-cell-swipe> -->
  </div>
</template>
<script>
export default {
  name:'Bookcommon',
  data(){
    return{
      url:'http://api.pingcc.cn/?xsurl1=',
      Book_list:'',
      show:false,
      router:'',
      isShow:true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    }
  },
  deactivated:function(){
    console.log('停用组件')
    this.url = "http://api.pingcc.cn/?xsurl1="
    this.router = this.$route.params.id;
  },
  activated:function(){
      //获取对象路径
      console.log(this.$route.params.id);
      this.router=this.$route.params.id;
      this.url = this.url+this.$route.params.id;
      //无传值时的判断
      if(this.$route.params.id===undefined){
        console.log('没有路由值')
       this.$route.params.id =this.router;
        return false
      }else{
        //请求数据
      this.$axios.get(this.url)
      .then(res=>{
        //获取返回数据
        console.log(res)
        if(res.data.code == 1){
            alert('页面404')
        }else{
          //章节数据
          this.Book_list = res.data.list
      }
    })
    }
  },
  updated:function(){
    //判断页面是否是外部网页
    var http = this.$route.params.id;
    var reUrl=/http[s]{0,1}:\/\/([\w.]+\/?)\S*/
    if(reUrl.test(http) === true){
    console.log('这是外部网页')
    this.isShow = false;
    }else if(reUrl.test(http) === false){
      this.isShow = true;
      console.log('这是api支撑得网页')
    }
  },
  methods:{
  generateClassName:function(index){
      return "p"+index
  },
  Styleopen:function(index){
    var arr=JSON.stringify(this.Book_list)
    this.$router.push({name:"LookBook",params:{id:arr,num:index}});
    }
  }
}
</script>

<style>
.list_Bookcommon ul li p{
  display:block;
  height: 40px;
  padding-left:20px;
  font-size: 14px;
  border-bottom: 1px solid #666;
  text-align: left;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.class1{
  background: black;
}
</style>