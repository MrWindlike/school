<template>
  <div id="app">
    <audio :src="msg.music[0].src" ></audio>
    <v-main></v-main>
    <router-view :books="msg.books" :msg="msg.introduction"></router-view>
  </div>
</template>

<script>
import main from './components/main.vue'
import bus from './bus.js'

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

      bus.$on('changeMusic', function(index){
        _this.$el.removeChild(_this.$el.children[0]);
        var audio = document.createElement('audio');
        audio.setAttribute('src', "http://www.sfengyong.cn/" + _this.msg.music[index].name + ".m4a");
        _this.$el.insertBefore(audio, _this.$el.children[0]);
        audio.play();
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
