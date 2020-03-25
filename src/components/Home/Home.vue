<template>
  <div id="Home">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000"  class="swipe">
      <mt-swipe-item v-for="(item,index) in picArry" :key="index">
          <img :src="item.data" />
      </mt-swipe-item>
    </mt-swipe>

  <div class="Linst">
      <ul>
          <li v-for="(item,index) in Features" :key="index">
            <a href="javascipt:void(0)">
            <img :src="item.src"/>
            </a>
            <p>{{item.name}}</p>
          </li>
      </ul>
  </div>
  </div>
</template>

<script>
//直接导入图片路径使用
import src1 from '../../assets/ico/微信.png'
import src2 from '../../assets/ico/QQ.png'
import src3 from '../../assets/ico/支付宝.png'
import src4 from '../../assets/ico/Facebook.png'
import src5 from '../../assets/ico/github.png'
import src6 from '../../assets/ico/Touch ID.png'

var Features =[
    {id:1,src:src1,name:'首页'},
    {id:2,src:src2,name:'图片'},
    {id:3,src:src3,name:'联系我们'},
    {id:4,src:src4,name:'使用方法'},
    {id:5,src:src5,name:'联系我们'},
    {id:6,src:src6,name:'使用方法'},
]

export default {
  name: "Home",
  data() {
    return {
      picArry: [],
      Features:Features,
    };
  },
  created() {
    //==created:function()
    this.$axios
      .all([
        this.$axios.get("https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=url"),

        this.$axios.get("https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=url")
      ])
      .then(
        res => {
          this.picArry = res;
        }
        // this.$axios.spread(function(userResp, reposResp) {
        //   // 上面两个请求都完成后，才执行这个回调方法
        //   console.log("img1:", userResp.data);
        //   console.log("img2:", reposResp.data);
        //   this.picArry = userResp.data;
        // })
      );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only  局部注入-->
<style scoped>

.swipe{
    height:200px;
}
.swipe  img{
    width: 100%;
    height: 200px;
}
.Linst{
    width: 100%;
}
.Linst ul{
    display: flex;
    flex-wrap: wrap;
}
.Linst ul li{
    display: inline-block;
    margin-top: 15px;
    width: 33%;
    height: 100px;
    text-align: center;
    font-size: 14px;
}
.Linst ul li  a {
    margin: 0 auto;
    width:60px;
    height:60px;
}
.Linst ul li  img{
    width:60px;
    height:60px;
}
</style>
