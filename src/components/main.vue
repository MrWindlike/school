<template>
	<div class="wrap">
	  <div class="logo">阳光校园</div>
	  <div class="typeWrap">
	    <router-link to="/music" id="music">
	      <div class="typeBox">
	        <div class="icon"></div>
	        <img src="../../resource/img/musicStick.png" class="stick">
	        <div class="text centered">校园音乐</div>
	        <div class="cover"></div>
	      </div>
	    </router-link><!-- 
	     --><router-link to="/introduction" id="introduction">
	      <div class="typeBox">
	        <div class="icon"></div>
	        <div class="line" v-for="i of 3"></div>
	        <div class="text centered">校园简介</div>
	        <div class="vBorder centered"></div>
	        <div class="hBorder centered"></div>
	        <div class="cover"></div>
	      </div>
	    </router-link><!-- 
	     --><router-link to="/book" id="book">
	      <div class="typeBox">
	        <div class="page" v-for="i of 3">
	          <div class="line" v-for="i of 4"></div>
	        </div>
	        <div class="text centered">校园图书</div>
	        <div class="cover"></div>
	        <div class="border centered"></div>
	      </div>
	    </router-link><!-- 
	     --><router-link to="view" id="view">
	      <div class="typeBox">
	        <div class="icon"></div>
	        <div class="text centered">校园美景</div>
	        <div class="cover"></div>
	        <div class="sun"></div>
	      </div>
	    </router-link>
	  </div>
	</div>
</template>

<script>
export default {

  name: 'main',
  data () {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
@function longshadow($color_a,$color_b,$stepnum, $opacity: 1){
 
  $gradient_steps: null;
 
  @for $i from 1 through $stepnum {
 
    $weight: ( ( $i - 1 ) / $stepnum ) * 100;
 
    $colour_mix: mix($color_b, rgba($color_a, $opacity), $weight);
 
    $seperator: null;
 
    @if($i != $stepnum){
      $seperator: #{','};
    }
 
    $gradient_steps: append( #{$gradient_steps}, #{$i}px #{$i}px $colour_mix $seperator );
 
  }
 
  @return $gradient_steps;
 
}

a{
  $bg : #fae462;
  background:$bg;
  box-shadow:longshadow(darken($bg,30%),darken($bg,10%),20, 0.5);
  font-size: 18px;
  color:#4d555d;
  line-height: 60px;
  text-decoration: none;
}

.wrap{
  display:flex;
  margin:auto;
  align-items:center;
  justify-content:center;
  flex-flow:column;
}

.logo{
  $bg : #f5da41;
  display: inline-block;
  font-size: 60px;
  padding: .4em 1.5em;
  border:1px black solid;
  margin:0 auto;
  margin-bottom: 80px;
  text-shadow:(longshadow(darken($bg,30%),$bg,18, 0.5));
  box-shadow:longshadow(darken($bg,30%),$bg,20, 0.5);
  cursor:default;
  -webkit-user-select: none;
}

.icon{
  width:100%;
  height:100%;
}

.typeBox{
  position:relative;
  width:120px;
  height:120px;
}

.typeWrap{
  width:650px;
  position:relative;

  & .text{
    z-index:2;
    width:100%;
    text-align:center;
    border:1px white solid;
    font-size:20px;
    color:white;
    opacity:0;
    transition:all ease .2s;
  }

  &:hover .cover{
    z-index:1;
    position:absolute;
    top:-10px; 
    left:-10px;
    width:calc(100% + 20px);
    height:calc(100% + 20px);
  }

  &>#music{
    vertical-align:top;
    position:relative;
    display:inline-block;
    width: 120px; height: 120px;
    padding:10px;

    &:hover .icon{
        animation: musicRotate linear 1s infinite;
    }

    &:hover .cover{
      background:rgba(0,0,0,.5);
    }
  
    &:hover .text{
      opacity:1;
      animation:scale ease .3s 1;
    }

    @keyframes scale{
      0%{
        font-size:20px;
        width:100%;
      }

      50% {
        font-size:28px;
        width:120%;
      }

      100%{
        font-size:20px;
        width:100%;
      }
    }

    & .icon{
      background: url('../../resource/img/music.png');
      background-size: 100% 100%;
    }

    & .stick{
        position:absolute;
        width:40px;
        height:40px;
        left:80px;
        top:80px;
    }
  }

  #introduction{
    vertical-align:top;
    position:relative;
    display:inline-block;
    width: 120px; height: 120px;
    margin-left:30px;
    padding:10px;
    &:hover .line{
        animation: linear 1.2s infinite;
    }
    
    &:hover .cover{
      background:rgba(0,0,0,.5);
    }

    &:hover .text{
      opacity:1;
      border:0;
    }

    & .vBorder{
      z-index:2;
      width:70%;
      height:0;
      border-left:1px white solid;
      border-right:1px white solid;
      transition:all ease .5s;
    }

    &:hover .vBorder{
      height:90%;
    }

    & .hBorder{
      z-index:2;
      width:0%;
      height:70%;
      border-top:1px white solid;
      border-bottom:1px white solid;
      transition:all ease .5s;
    }

    &:hover .hBorder{
      width:90%;
    }

    & .icon{
      background: url('../../resource/img/introduction.png');
      background-size: 100% 100%;
      
    }
    & .line{
      position:absolute;
      height:2px;
      background:black;
      width:55%;

      &:nth-of-type(2){
        top:30%;
        left:20%;
        animation-name:writeFirst;
      }

      &:nth-of-type(3){
        top:50%;
        left:20%;
        animation-name:writeSecond;
      }

      &:nth-of-type(4){
        top:70%;
        left:20%;
        animation-name:writeThird;
      }
    }
  }

  #book{
    vertical-align:top;
    position:relative;
    display:inline-block;
    width: 120px; height: 120px;
    margin-left:30px;
    padding:10px;
    overflow:hidden;

    &:hover .cover{
      background:rgba(0,0,0,.5);
    }

    &:hover .text{
      border:0;
      opacity:1;
    }

    &:hover .page:nth-of-type(1){
      animation:addShadow 1s linear infinite;
    }
    &:hover .page:nth-of-type(2){
      animation:removeShadow 1s linear infinite;
    }
    &:hover .page:nth-of-type(3){
      animation:changePage 1s linear infinite;
    }

    & .page{
      border-radius:2px;
      position:relative;
      border:1px black solid;
      width:calc(50% - 11px); height:calc(100% - 10px);
      display:inline-block;
      background:white;
      &:nth-of-type(1){
        border-left:10px black solid;
        border-bottom:10px black solid;
      }
      &:nth-of-type(2){
        border-right:10px black solid;
        border-bottom:10px black solid;
      }
      &:nth-of-type(3){
        position:absolute;
        left:50%;
        transform-origin:left center;
      }

      & .line{
        position:absolute;
        height:2px; width:80%;
        background:black;
        left:10%;
        &:nth-of-type(1){
          top:20%;
        }

        &:nth-of-type(2){
          top:40%;
        }

        &:nth-of-type(3){
          top:60%;
        }

        &:nth-of-type(4){
          top:80%;
        }
      }
    }

    & .border{
      z-index:2;
      width:70%;
      height:70%;
      border:1px white solid;
      transform:translate(-50%, -250%) rotate(405deg);
      transition:transform ease .5s;
    }

    &:hover .border{
      transform:translate(-50%, -50%) rotate(45deg);
    }
  }

  #view{
    margin-left:30px;
    position:relative;
    display:inline-block;
    width: 120px; height: 120px;
    padding:10px;
    overflow:hidden;

    &:hover .cover{
      background:rgba(0,0,0,.5);
    }
  
    .text{
      transform:translate(-50%, -50%) skew(180deg);
    }

    &:hover .text{
      opacity:1;
      transform:translate(-50%, -50%) skew(0deg);

    }

    & .icon{
      background: url('../../resource/img/view.png') repeat;
      background-size: 100% 100%;
      width:100%; height:100%;
      border:1px black solid;
      transition:background ease 1.2s;
    }

    .sun{
      z-index:0;
      position:absolute;
      top:30px;
      left:20px;
      width:10px;
      height:10px;
      background:red;
      border-radius:50%;
    }

    &:hover .icon{
      animation:move linear 1.2s infinite;
    }

    @keyframes move{
      from {background-position:0px;}
      to { background-position:-120px;}
    }

  }
}

@media screen and (max-width: 650px){
	.typeWrap{
  		width:310px;
  	}

  	a{
  		&:nth-of-type(1){
  			margin-bottom:20px;
  		}
  		&:nth-of-type(3){
  			margin-left:0px !important;
  		}
  	}
}

@keyframes musicRotate{
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
}

@keyframes writeFirst{
  0% {width : 0;}
  33% { width : 55%;}
  100% { width : 55%;}
}
@keyframes writeSecond{
  0% {width : 0;}
  33% {width : 0;}
  66% { width : 55%;}
  100% { width : 55%;}
}@keyframes writeThird{
  0% {width : 0;}
  66% {width : 0;}
  100% { width : 55%;}
}

@keyframes changePage{
  from {
    transform : perspective(400px) rotateY(0deg);
  }
  to {
    transform : perspective(400px) rotateY(-180deg);
  }
}

@keyframes addShadow{
  50% {background:white;}
  100% {background:rgb(50,50,50);}
}

@keyframes removeShadow{
  0% {background:rgb(50,50,50);}
  50% {background:white;}
  100% {background:white;}
}
</style>