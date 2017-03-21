<template>
	<div class="pageWrap">
		<div class="page">
			<div class="cover" v-if="left"></div>
			{{msg.content}}
		</div>
		<div class="pre" v-if="left">
			上一页
			<div class="note"></div>
		</div>
		<div class="next" v-else>
			下一页
			<div class="note"></div>
		</div>
	</div>
</template>

<script>
export default {

  name: 'page',
  props : ['msg', 'left', 'up'],
  data () {
    return {
    	
    };
  }
};
</script>

<style lang="scss" scoped>
.pageWrap{
	display: inline-block;
	padding:30px;
	border: 2px #514815 solid;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 1px;
	background: 
	linear-gradient(transparent, transparent 29px
		,#00bc96 0, #00bc96 30px);
	background-size:100% 30px;
	box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 1px;
	border-radius: 2px;
	transform-origin: left center;
	&:nth-of-type(3){
		z-index:3;
		background-color: #fce76d;
		position:absolute;
		left: 0;
		transition: transform ease .3s;
	};
	&:nth-of-type(5){
		z-index:3;
		background-color: #fce76d;
		position:absolute;
		right: 0;
		transition: transform ease .3s;

	}
	& .note{
		position: absolute;
		width: 1.2em;
		height: 2em;
		transition: background ease .3s;
	}
	& .next{
		position: absolute;
		right: 1.5em;
		bottom: 0;
		font-size: 16px;
		cursor: pointer;
		color: #d1893c;
		line-height: 1.5em;

		& .note{
			bottom: 0;
			right:-1.5em;
			border-top-left-radius: .5em;
		}

		&:hover .note{
			background: linear-gradient(to left top,
				transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4)) 
				100% 0 no-repeat;
			background-color: rgba(0,0,0,.15);
			box-shadow: -.2em .2em .3em .1em rgba(0,0,0,.15);
		}
	}
	
	& .pre{
		position: absolute;
		left: 1.5em;
		bottom: 0;
		font-size: 16px;
		line-height: 1.5em;
		cursor: pointer;
		color: #d1893c;
		& .note{
			left: -1.5em;
			bottom: 0;
			border-top-right-radius: .5em;
		}

		&:hover .note{
			background: linear-gradient(to right top,
				transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4)) 
				100% 0 no-repeat;
			background-color: rgba(0,0,0,.15);
			border-top-right-radius: .5em;
			border-top-left-radius: 0;
			box-shadow: .2em -.2em .3em .1em rgba(0,0,0,.15);
		}
	}

	& .page{
		position: relative;
		overflow: hidden;
		width: 360px;
		height: 560px;
		line-height: 1.5em;
		color:rgb(7,17,27);
		& .move{
			position: absolute;
			top: -564px; 
		}
	}
}

.cover{
	width: 120px;
	height: 160px;
	margin-right: 20px;
	margin-bottom: 10px;
	float:left;
	background: url('../../resource/img/LittlePrince.jpg');
	background-size: 100% 100%;
}
</style>