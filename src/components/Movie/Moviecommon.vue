<template>
  <div id="Moviecommon">
    <div class="top_Moviecommon">
    <div class="img_Moviecommon">
    <img :src="common.cover" onerror='this.src="https://www.x23qb.com/modules/article/images/nocover.jpg"'/>
    </div>
    <div class="size_Moviecommon">
    <p>{{common.name}}</p>
    <p>{{common.genre}}.{{common.Release}}</p>
    <p>{{common.region}}.{{common.Language}}</p>
    <p>{{common.performer}}</p>
    </div>
    </div>

    <div class="common_Moviecommon">
       <a :href="list.m3u8url">
         <span style="font-size:14px">种子(m3u8)</span>
       </a>
       <a :href="list.onlineurl">
         <span >在线观看</span>
       </a>
       <a :href="list.download">
         <span>下载到本地</span>
       </a>
    </div>
  </div>
</template>
<script>
export default {
  name:'Moviecommon',
  data(){
    return{
      url:'http://api.pingcc.cn/?ysurl=',
      common:'',
      list:'',
      src:"",
      gohome:true
    }
  },
  methods:{
    jeep:function(){
      console.log('2222')
    }
  },
  mounted:function(){ 
    console.log('组件激活')
   },
        deactivated:function(){
            console.log('停用组件')
            this.url = "http://api.pingcc.cn/?ysurl="
            this.list = ""
        },
  activated:function(){
    console.log('组件启动')
      //通过这两个对象可以对对象执行操作
      console.log(this.$route.params.id);
      this.url = this.url+this.$route.params.id
      console.log(this.url);

      this.$axios.get(this.url)
      .then(res=>{
        console.log(res);
        if(res.data.code == 1){
            alert('页面404')
        }else{
          console.log(res.data.list[0]);
        this.common = res.data.data
        console.log(this.common);
        this.list = res.data.list[0]
        }
        
      })
  },
}
 
</script>

<style>
.top_Moviecommon{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
   border-bottom: 1px solid #999;
}
.img_Moviecommon{
  width:40%;
}
.img_Moviecommon img{
 padding-left: 15px;
 margin:10%;
 width: 65%;
 
}
.size_Moviecommon{
  width:59.7%;border-left:1px solid #999;    
}
.size_Moviecommon p{
  display: block;
  height:40px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-bottom: 1px solid #999;
}
.size_Moviecommon p:nth-child(1){
  font-size: 18px;
}
.size_Moviecommon p:nth-child(4){
  font-size: 14px;
  color: #666;
 border-bottom: 0px;
 overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.common_Moviecommon{
  display: flex;
  justify-content:space-around;
  margin-top: 30px;
}

.common_Moviecommon span{
  text-align: center;
  line-height: 50px;
  display: block;
  height:50px;
  width:80px;
  background: red;
}
</style>