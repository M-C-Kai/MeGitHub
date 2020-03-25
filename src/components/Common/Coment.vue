<template>
    <div id="Coment">
        <!-- 小说组件 -->
         <div class="list" v-show="list.list">
                <ul>
                    <li v-for="(item,index) in list.list" :key="index"> 
                        <router-link :to="{name:'Bookcommon',params:{id:item.url}}">
                        <div class="imgs">
                        <img :src="item.cover" onerror='this.src="https://www.x23qb.com/modules/article/images/nocover.jpg"'/>
                        </div>
                        <div class="right">
                        <p>{{item.name}}</p>
                        <p>{{item.author}}.{{item.tag}}.{{item.time}}</p>
                        <p>{{item.introduce}}</p>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="top" @click="gettop">
               <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584360586265&di=6e45ccefe2bb645ad0b12ac6289f7de0&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F01%2F47%2F98%2F6957440cd4253fc.jpg">
            </div>
            <!-- 电影组件 -->
            <div class="Movie" v-show="list.Movie">
                <ul>
                    <li v-for="(item,index) in list.Movie" :key="index">
                        <router-link :to="{name:'Moviecommon',params:{id:item.url}}">
                        <div class="imgs">
                        <img src="https://www.x23qb.com/modules/article/images/nocover.jpg"/>
                        </div>
                        <div class="right">
                        <p>{{item.name}}</p>
                        <p>时间:{{item.time}}</p>
                        <p>类型:{{item.genre}}</p>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- 动漫组件 -->
            <div class="compen" v-show="list.compen">
                <ul>
                    <li v-for="(item,index) in list.compen" :key="index">
                        <router-link :to="{name:'Piccommon',params:{id:item.url}}">
                        <div class="imgs">
                        <img :src="item.cover" onerror='this.src="https://www.x23qb.com/modules/article/images/nocover.jpg"'/>
                        </div>
                        <div class="right">
                        <p>{{item.name}}</p>
                        <p v-show="item.latest">最新章节:{{item.latest}}</p>
                        <p>{{item.tag}}</p>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <keep-alive>
            <router-view></router-view>
            </keep-alive>
    </div>
</template>

<script>
export default {
    name:'Coment',
    props:['list'],
    methods:{
        gettop:function(){
            document.documentElement.scrollTop = 0;
            console.log(document.documentElement.scrollTop)
            console.log(this.list)
            console.log(' go home')
        }
    }
}
</script>
<style>
.list{
    width: 100%;
    padding: 0;
    margin: 0;
}
.list ul li  a{
   display: flex;
   flex-wrap: wrap;
}
.Movie ul li  a{
   display: flex;
   flex-wrap: wrap;
}
.compen ul li  a{
   display: flex;
   flex-wrap: wrap;
}
.list ul {
    display: block;
}
.list ul li{
    display:block;
    display: flex;
    flex-wrap: wrap;
}
.Movie{
    width: 100%;
    padding: 0;
    margin: 0;
}
.Movie ul {
    display: block;
}
.Movie ul li{
    display:block;
    display: flex;
    flex-wrap: wrap;
}
.compen{
    width: 100%;
    padding: 0;
    margin: 0;
}
.compen ul {
    display: block;
}
.compen ul li{
    display:block;
    display: flex;
    flex-wrap: wrap;
}
.right{
    width:60%;
    margin-top: 15px;
    margin-left: -15px;
}
.right p{
    display: inline-block;
    word-wrap: break-word;
	word-break: break-all;
    width: 100%;
    margin-top: 5px;
    overflow: hidden;
}
.right p:nth-child(1){
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.right p:nth-child(2){
    font-size: 12px;
    color: #999;
}
.right p:nth-child(3){
    color: #666;
    font-size: 14px;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp:4;
    -webkit-box-orient: vertical;
}
.imgs{
    width:40%;
}
.list img{
    margin:20px;
    width:65%;
    height:130px;
}
.Movie img{
    margin:20px;
    width:65%;
    height:130px;
}
.compen img{
    margin:20px;
    width:65%;
    height:130px;
}
.top{
    position: fixed;
    bottom:10%;
    right: 20px;
    height: 50px;
    width: 50px;
    background: #33344456;
}
.top img{
    width: 50px;
    height: 50px;
}
</style>