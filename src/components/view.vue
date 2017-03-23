<template>
	<transition name="move">
	<div id="view" @transitionend.stop="begin">
		<div class="pictureWrap">
				<div class="picture"
					:class="{'move':(index>i)}" 
					@click.stop="addindex(i)"
					@transitionend="close"
					:style="{zIndex : zIndex[i]}"
					 v-for="(item, i) of view">
					<div 
					class="img" 
					:style="{backgroundImage: 'url(\'../resource/img/view/'+i+'.jpg\')'}"></div>
					<div class="title">{{item.name}}</div>
					<div class="content">{{item.content}}</div>
				</div>
		</div>
		<div class="envelopeDown"></div>
		<div class="envelopeUp"></div>
		<div @click="index=0" class="envelopeButton"></div>
		<div class="envelopePageWrap">
			<div class="envelopePageDowm"></div>
		</div>
	</div>
	</transition>
</template>

<script>

export default {
  name: 'view',
  props : ['view'],
  data () {
	    return {
	    	index:-1,
	    	zIndex:[]
	    };
  },
  created () {
  	
  	for(var i = 0 ; i<this.view.length ;i++ )
  	{
  		this.zIndex[i] = this.view.length+2-i;
  	}
  },
  methods:{
	  	addindex(i){
	  		if(this.index<=i){
		  		if(this.index!=this.view.length)
		  		{
		  			this.index++;
		  			this.$set(this.zIndex,i,this.view.length+1+2*i);
		  		}
		  		else
		  			this.index = 1;
	  		}
	  		else{
	  			if(this.index!=0)
	  			{
		  			this.index--;
		  			if(i!=this.view.length-1)
		  			{
		  				console.log(1);
		  				this.$set(this.zIndex,i+1,this.view.length+1-i);
		  			}
	  			}
	  		}
	  	},
	  	close : function(){
	  		if(this.index === 0)
	  			window.location.hash = '#/';
	  	},
	  	begin : function(){
	  		if(this.index===-1)
	  			this.index=1;
	  	}
  }
};
</script>

<style lang="scss" scoped>
.move-enter, .move-leave-active{
	transform: translate(50%);
}

#view{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	transition: transform .6s ease;
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
	.pictureWrap{
		position: relative;
		width: 100%;
		height: 100%;
		.picture{
			z-index: 2;
			width: 650px;
			height: 510px;
			position: absolute;
			top: 50%;
			right: -270px;
			transform: translate(50%, -50%);
			transition:right ease .6s;
			box-shadow: 2px 2px 2px 0px rgba(7,17,27,.2);
			border: 20px white solid;
			background: white;
			cursor: pointer;
			.title{
				font-size: 24px;
				margin-bottom: 10px;
			}
			.content{
				color: rgb(7,17,27);
				margin-left: 8px;
			}
			.img{
				width: 100%;
				padding-bottom: 56.25%;
				background-size: 100% 100%;
				margin-bottom: 20px;
			}
		}
		.move{
			right:50% !important;
		}
	}

	.envelopeDown, .envelopeUp{
		z-index: 1;
		position: absolute;
		top: 50%;
		right: -270px;
		width: 660px;
		height: 550px;
		transform: translate(50%, -50%);
	}
	
	.envelopeDown{
		background: #8b603a;
		box-shadow: 0 0 0 20px #8b603a, 0 0 2px 20px black;
	}

	.envelopeUp{
		z-index: 15;
		background: #B77F4C;
		box-shadow: -5px 0 5px 0px rgba(0,0,0,.6);
		border: 20px #B77F4C solid;
		width: 600px;
	}

	.envelopeButton{
		z-index: 16;
		position: absolute;
		top: 50%;
		right: 0px;
		width: 40px;
		height: 40px;
		transform: translate(0%, -50%);
		background: #c9171e;
		border-radius: 50%;
		animation: light ease .6s infinite alternate;
		cursor: pointer;
	}

	@keyframes light{
		from{box-shadow: 0 0 0px 0 #c9171e;}
		to{box-shadow: 0 0 15px 1px #c9171e;}
	}

	.envelopePageDowm{
		width: 70px;
		height: 590px;
		position: absolute;
		top: 50%;
		right: 70px;
		z-index: 1;
		background: #8b603a;
		transition: transform .3s ease;
		transform:perspective(400px) translate(0%, -50%);
		transform-origin: right center;
	}
}

@media screen and (max-width: 800px){
	.picture{
		width: 600px !important;
	}
	.envelopeDown{
		width: 600px !important;

	}
	.envelopeUp{
		width: 560px !important;
	}
	.envelopePageDowm{
		right: 50px !important;
	}
	.envelopeButton{
		width: 30px !important;
		height: 30px !important;
	}
}
</style>