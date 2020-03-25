<template>
    <div id="Pic">
       <Server :title="api" />

    </div>
</template>

<script>
export default {
    name:'Pic',
    data(){
        return{
            api:'http://api.pingcc.cn/?mhname='
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
