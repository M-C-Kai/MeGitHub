<template>

  <div id="app">
    <!-- 头部 -->
    <mt-header title="首页" fixed>
      <router-link to="/" slot="left" v-show="isShow">
        <mt-button icon="back" @click="$router.back(-1)">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 内容栏 -->

    <!-- 底部栏 -->
    <div class="Tabbar" v-show="!isShow">
      <ul>
        <li v-for="(item,index) in Tabbar" :key="index">
            <router-link :to="item.to">
              <img :src="item.src"/>
              <p>{{item.title}}</p>
            </router-link>
        </li>
      </ul>
    </div>

<!-- 路由出口 编程导航 -->
<keep-alive>
    <router-view />
</keep-alive>
  </div>
</template>

<script>
import index from '../src/assets/me_sel.png'
import Pic from '../src/assets/pic_sel.png'
import Movie from '../src/assets/muv_sel.png'
import Book from '../src/assets/link_sel.png'
var Tabbar=[
  {id:1,src:index,title:'首页',to:{name:'Home'}},
  {id:2,src:Pic,title:'动漫',to:{name:'Pic'}},
  {id:3,src:Movie,title:'电影',to:{name:'Movie'}},
  {id:4,src:Book,title:'小说',to:{name:'Book'}}
  ]
export default {
  name: "App",
  data(){
    return {
      selected:'',
      Tabbar:Tabbar,
      isShow:false
    }
  },
  components:{
  },
  watch:{
    $route(now,old){     //监控路由变换，控制返回按钮的显示
     if(now.name=="Moviecommon" || now.name=="Piccommon" || now.name=="Bookcommon" || now.name=="LookBook" || now.name=="LookPic"){
            this.isShow=true;
     } else{
         this.isShow=false;
     }
    }
    },
    selected:function(newV,oldV){
    // 编程导航
      this.$router.push({name:this.selected});
    }
  }
</script>

<style>
.Tabbar{
  position:fixed;
  bottom: 0px;
  height:50px;
  width: 100%;
  background: lightgoldenrodyellow;
}
.Tabbar ul{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.Tabbar ul li{
  width: 25%;
}
.Tabbar ul li{
  display:inline-block;
  display: flex;
  flex-direction:column
}
.Tabbar ul li p{
  color: #666;
  margin-top: -6px;
 text-align: center;
 font-size: 12px;
}
.Tabbar ul li img{
  margin-left:32%;  
  width:35%;
  height:34px;
}
.Tabbar ul li a.link-active{
background:lightseagreen;
}

</style>
