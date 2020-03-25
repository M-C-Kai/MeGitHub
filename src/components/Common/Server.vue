<template>
    <div id="Server">
        
            <span class="sub">
            <input class="input" v-model="Watch" autofocus="autofocus"/>
            <!-- <router-link to="{name:'Bookcoment'}"> -->
            <button @click="search">搜索</button>
            <!-- </router-link> -->
            <!-- <router-view></router-view> -->
            </span>
            <!-- <div class="list">
                <ul>
                    <li v-for="(item,index) in list" :key="index">
                        <span>
                        <img :src="item.cover"/>
                        <p>{{item.name}}</p>
                        <p>{{item.author}}.{{item.tag}}.{{item.time}}</p>
                        <p>{{item.introduce}}</p>
                        </span>
                    </li>
                </ul>
            </div> -->
            <Coment :list="{list,Movie,compen}"/>
    </div>
    
</template>

<script>
export default {
    name:'Server',
    props:['title'],
    data(){
        return{
            value:'',
            Watch:'请输入要搜索的值',
            api:'',
            name:'',
            list:false,
            Movie:false,
            compen:false,
        }
    },
    computeds:{
    },
    watch:{
        Watch:function(newVal,oldVal){
           },
    },
    created(){
 
    },
    methods:{
        search(){
            if(this.Watch.length == 0){
                console.log('2333')
                alert('输入得值不能为空')
            }else{
            this.$axios.get(this.title+this.Watch)
             .then(res=>{               
                //  判断不同路径，传到不同的子组件进行渲染
                 if(this.title == "http://api.pingcc.cn/?xsname="){
                     //小说
                    this.list = res.data.list
                 }else if(this.title == "http://api.pingcc.cn/?ysname="){
                     //电影
                     this.Movie = res.data.list
                 }else if(this.title == "http://api.pingcc.cn/?mhname="){
                        //图片
                    this.compen = res.data.list
                 }
                 if(res.data.code == 1){
                     alert('资源不在')
                 }
             })
             }
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.sub{
    display: flex;
    flex-wrap: wrap;
}
.sub button{
    width: 16%;
}
.input{
            font-size:12px;
             /* 设置输入框中字体的大小 */
            height:30px; 
            width: 80%;
            /* 设置输入框的高度 */
            border:1px solid #c8cccf;
            /* 设置输入框边框的粗细和颜色 */
            color:#986655; 
            /* 设置输入框中文字的颜色 */
            outline:0; 
            /* 将输入框点击的时候出现的边框去掉 */
            text-align:left; 
            /* 设置输入框中文字的位置 */
            padding-left: 10px;
            display:block; 
            /* 将输入框设置为块级元素 */
            cursor: pointer;
            box-shadow: 2px 2px 5px 1px #ccc;  
}
input::-webkit-input-placeholder{
             color: #986655;
             font-size: 12px; }
</style>