<template>
    <div id="Movie">
        <keep-alive>
       <Server :title="api"/>
       </keep-alive>

    </div>
</template>

<script>
export default {
    name:'Movie',
    data(){
        return{
            api:'http://api.pingcc.cn/?ysname='
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>