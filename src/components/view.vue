<template>
	<div id="view">
		<div class="button" @click="addindex" ></div>
		<div class="picture">
				<img class="img" :class="{'move':(index>0)}" style="{z-index: 1;right: -58%;}" src="../../resource/img/introduction/0.jpg" alt="">
				<img class="img" :class="{'move':(index>1)}"  style="{z-index: 2;right: -58%;}"  src="../../resource/img/introduction/1.jpg" alt="">
				<img class="img" :class="{'move':(index>2)}"  style="{z-index: 3;right: -58%;}"  src="../../resource/img/introduction/2.jpg" alt="">
				<img class="img" :class="{'move':(index>3)}"  style="{z-index: 4;right: -58%;}"  src="../../resource/img/introduction/3.jpg" alt="">
				<img class="img" :class="{'move':(index>4)}"  style="{z-index: 5;right: -58%;}"  src="../../resource/img/introduction/4.jpg" alt="">

		</div>
	</div>
</template>

<script>

export default {
  name: 'view',
  data () {
	    return {
	    	index:0,
	    };
  },
  methods:{
	  	addindex(){
	  		if(this.index!=5)
	  			this.index++;
	  		else
	  			this.index = 0;
	  	}
  }
};
</script>

<style lang="scss" scoped>
@keyframes moveToCenter{
	0%{
		right: -58%;
	}
	25%{
		right: -30%;
	}
	50%{
		right: -10%;
	}
	75%{
		right: 8%;
	}
	100%{
		right: 16%;
	}
}
#view{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.button{
		width: 50px;
		height: 25px;
		position: absolute;
		right: 50px;
		top: 50px;
		background-color: gray;
		border-radius: 5px;
		z-index: 6;

	}
	.picture{
		position: relative;
		width: 100%;
		height: 100%;
		
		/*  .slide-fade-enter{
					transition: all .3s ease;
				}
				.slide-fade-enter-active{
					right: 16%;
				}  */

		.img{
			width: 70%;
			height: 73%;
			position: absolute;
			top: 15%;
		}
		.move{
			animation-name: moveToCenter;
			animation-duration: 1s;
			animation-timing-function: linear;
			animation-fill-mode:forwards;
		}
	}
	
	
}
</style>