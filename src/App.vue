<template>
  <div id="app">
    <v-main></v-main>
    <router-view :books="msg.books" :msg="msg.introduction" :music="msg.music"></router-view>
  </div>
</template>

<script>
import main from './components/main.vue'

export default {
  name: 'app',
  data () {
    return {
      msg : {},
      audio : null
    }
  },
  components : {
    vMain : main
  },
  mounted : function(){
    var _this = this;
    _this.$http({
      url : './data.json', 
      method : 'get'}).then(function(result) {
        _this.msg = result.body;
      });
  }
}
</script>

<style lang="scss">
::-webkit-scrollBar{
  width: 0;
}

*{
  margin:0;
  padding:0;
}

html,body{
  width: 100%;
  height: 100%;
  overflow: hidden; 
  background: linear-gradient(rgb(244, 243, 158) 0, rgb(245, 218, 65) 60%, rgb(255, 238, 102) 100%) no-repeat;
  background-size: 100% 100%;
}

#app{
  width:100%;
  height:100%;
  display:flex;
}

.centered{
  position:absolute;
  top:50%; left:50%;
  transform:translate(-50%,-50%);
}
</style>
