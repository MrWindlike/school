<template>
  <transition name="slide" @enter="active++">
    <div class="synopsis">
      <ul class="content"  @mousewheel="changePage" :style="[top]">
          <li 
          v-for="(item,index) in str"
          :style="{background: 'url(\'../resource/img/introduction/'+index+'.jpg\')  0 / cover'}">
            <transition name="moveToRight">
              <div class="matter" v-show="active === index">
                <div class="blur" :style="{background: 'url(\'../resource/img/introduction/'+index+'.jpg\')  0 / cover fixed'}"></div>
                <div class="text">
                  <img :src="msg[index].img" v-if="msg[index].img" width="80px" class="logo">
                    {{msg[index].content}}
                </div>
                <div class="vborder"></div>
                <div class="hborder"></div>
              </div>
            </transition>
          </li>
      </ul>
      <div  class="navigation">
        <ul>
            <li v-for="(item,index) in point" >
              <span class="whitepoint" :class="{'bluepoint':(index === active)}" @click = "jump(index)"></span>
              <!-- <div class="line"></div> -->
            </li>
        </ul>
      </div>
      <div class="closeButton" @click="close($event)" @animationend="animationend"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name:'app',
  props:['msg'],
  data () {
    return {
        str:[1,2,3,4,5],
        point:[1,2,3,4,5],
        top:{top: 0},
        active:-1,
        number:5
    }
  },
  methods : {
    changePage(){
      
      var delta = event.deltaY || -event.detail;
      if(delta < 0)
      {
        if(this.active !=0)
        {
          this.top.top =  parseInt(this.top.top);
          this.top.top += 100;
          this.top.top = this.top.top+'%';
          this.active--;
        }
      }
      else
      {
        if(this.active!=this.number-1)
          {
            this.top.top =  parseInt(this.top.top);
            this.top.top += -100;
            this.top.top = this.top.top+'%';
            this.active++;
          }
      }
    },
    jump(index){
      this.top.top = parseInt(this.top.top);
      this.top.top +=-(index-this.active)*100;
      this.top.top = this.top.top+'%';
      this.active = index;
    },
    close : function(event){
      event.target.style.animation = "pull ease .2s alternate 2";
    },
    animationend : function(){
      window.location.hash = '#/';
    }
  }

}
</script>

<style lang="scss">
  @keyframes pull{
    from { top:-50px; }
    to {top: 0px;}
  }
  .slide-enter, .slide-leave-active{
    height: 0 !important;
  }

  .moveToRight-enter,{
    opacity: 0;
    transform: translateX(-100px);
  }

  ul,li{
    list-style: none;
  }
  .synopsis{
    transition: height ease .4s;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    z-index:2;
    color:white;
    .content{
      width: 100%;
      height: 500%;
      position: absolute;
      top: 0px;
      transition: top ease .5s;
      display: inline-block;

      li{
        
        position: relative;
        width: 100%;
        height: 20%;
        display: flex;

        .vborder{
          position: absolute;
          top:15px;
          left:14.2px;
          z-index: 3;
          border-left: 1px white solid;
          border-right: 1px white solid;
          height: 290px;
          width: 560px;
          //transform: skewY(1deg);
        }
        .hborder{
          position: absolute;
          top:29.2px;
          left:5px;
          z-index: 3;
          border-top: 1px white solid;
          border-bottom: 1px white solid;
          height: 260px;
          width: 580px;
          //transform: skewY(1deg);
        }
        .matter{
          margin: auto;
          box-sizing:border-box;
          padding: 30px;
          border-radius: 6px;
          position: relative;
          background-color: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 590px;
          height: 320px;
          text-align: center;
          font-size: 18px;
          word-wrap: break-word;
          transition: all ease .4s;
          transition-delay:.4s;
          //background: hsla(0,0%,100%,.3);
          overflow: hidden;

          .text{
              position: relative;
              z-index: 3;
              vertical-align: top;

              .logo{
                float: left;
                margin-right: 10px;

              }
          }
        }
        .blur{
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          -webkit-filter:blur(20px);
          filter: blur(20px);
          margin:-30px;
          opacity: .5;
        }
      }
    }
    .navigation{
      position: fixed;
      top:50%;
      transform: translateY(-50%);
      right: 2%;
      ul{
        display: inline-block;
        width: 15px;
        li{
          float: left;
          height: 12.5px;
          &:nth-of-type(1)~li{
            margin-top:10px;
          }
          .whitepoint{
            cursor: pointer;
            display: block;
            width: 12.5px;
            height: 12.5px;
            border-radius: 7.5px;
            background-color: rgba(255,255,255,0.8);
          }
          .bluepoint{
            cursor: pointer;
            background-color: #4fc1e9;
          } 
        }
        .line{
          display: block;
          margin-left: 7.3px;
          width: 1px;
          height: 80px;
          background-color: rgba(255,255,255,0.7);  
        }
      }
    }

    .closeButton{
      position: absolute;
      top: -50px;
      height: 200px;
      width: 20px;
      right: 8%;


      &:before{
        content:"";
        display: block;
        width: 1.5px;
        height: 180px;
        background-color: white;
        margin: auto;
      }

      &:after{
        content:"";
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: red;
        cursor: pointer;
        background-image: radial-gradient(20px 20px at 3px 7px, rgba(248,248,248,.8), red);
      }
    }
  }
</style>
