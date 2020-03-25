<template>
    <div id="Book">
        <Server :title="api" />
    </div>
</template>

<script>
export default {
    name:'Book',
    data(){
        return{
            api:'http://api.pingcc.cn/?xsname='
        }
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>