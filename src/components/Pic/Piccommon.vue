<template>
  <div id="Piccommon">
    <div class="top_Piccommon">
    <div class="img_Piccommon">
    <img :src="data.cover" onerror='this.src="https://www.x23qb.com/modules/article/images/nocover.jpg"'/>
    </div>
    <div class="size_Piccommon">
    <p>{{data.name}}</p>
    <p>{{data.author}}.{{data.tag}}</p>
    <p>{{data.status}}.{{data.time}}</p>
    <p>{{data.introduce}}</p>
    </div>
    </div>


    <div class="list_Bookcommon" v-show="isShow">
    <mt-cell-swipe title="目录" style="border-bottom: 1px solid black; text-align: center;font-size: 20px;"></mt-cell-swipe>
    <ul>
      <li  v-for="(item,index) in Book_list" :key="index"  @click="Styleopen(index)">
          <p  :class="generateClassName(index)">{{item.num}}</p>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
export default {
  name:'Piccommon',
  data(){
    return{
      url:'http://api.pingcc.cn/?mhurl1=',
      Book_list:'',
      data:'',
      show:false,
      router:'',
      isShow:true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    }
  },

  deactivated:function(){
    console.log('停用组件')
    this.url = "http://api.pingcc.cn/?mhurl1="
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
        //判断是否是外部资源
      if(this.$route.params.id.startsWith("http")){
      console.log('外网') 
      this.isShow = false;
       console.log(this.isShow)
      }else{
        //请求数据
      this.$axios.get(this.url)
      .then(res=>{
        //获取返回数据
        console.log(res)
        if(res.data.code == 1){
            alert('页面404')
        }else{
          this.Book_list = res.data.list;
           //详细数据
          this.data = res.data.data;
            }
                })
            }
          }
},
 methods:{
  generateClassName:function(index){
      return "p"+index
  },
  Styleopen:function(index){
    var arr=JSON.stringify(this.Book_list)
    this.$router.push({name:"LookPic",params:{id:arr,num:index}});
    }
  }
}
</script>

<style>
.top_Piccommon{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
   border-bottom: 1px solid #999;
}
.img_Piccommon{
  width:40%;
}
.img_Piccommon img{
 padding-left: 15px;
 margin:10%;
 width: 65%;
 
}
.size_Piccommon{
  width:59.7%;border-left:1px solid #999;    
}
.size_Piccommon p{
  display: block;
  height:40px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #999;
}
.size_Piccommon p:nth-child(1){
  font-size: 18px;
}
.size_Piccommon p:nth-child(4){
  font-size: 14px;
  color: #666;
 border-bottom: 0px;
 overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

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