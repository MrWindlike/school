<template>
	<transition name="scale">
	<div id="bookWrap">
		<div id="book">
			<div 
			:class="{pageWrap : true, leftPage : index === 0}"
			 v-for="(i, index) of 2">
				<div class="page">
					<template v-if="index === 0">
						<div class="cover" 
						:style="{backgroundImage: 'url(\'../resource/img/book/'+nowPage+'.jpg\')'}"></div>
					</template>
					<template v-else>
						<div class="cover" 
						:style="{backgroundImage: 'url(\'../resource/img/book/'+leftPage+'.jpg\')'}"></div>
					</template>
					<template v-if="index === 0">{{books[nowPage].content}}</template>
					<template v-else>{{books[leftPage].content}}</template>
				</div>
				<div class="pre" @click="prePage" v-show="leftPage > 0">
					上一页
					<div class="note"></div>
				</div>
			</div><!-- 
		 --><div 
		 :class="{pageWrap : true, leftPage : direction, rightPage : !direction}">
				<div class="page">
					<div :class="{move : !direction}">
						<div class="cover" 
						:style="{backgroundImage: 'url(\'../resource/img/book/'+middlePage+'.jpg\')'}"></div>{{books[middlePage].content}}
					</div>
				</div>
				<div class="pre" v-if="direction === 1">
					上一页
					<div class="note"></div>
				</div>
				<div class="next" v-else>
					下一页
					<div class="note"></div>
				</div>
			</div><!-- 
		 --><div
		  :class="{pageWrap : true, rightPage : index === 0}"
		   v-for="(i, index) of 2">
		 		<div class="page">
		 			<div class="move">
			 			<div class="cover" 
			 			:style="{backgroundImage: 'url(\'../resource/img/book/'+nowPage+'.jpg\')'}"></div>
					 	<template v-if="index === 0">{{books[nowPage].content}}</template>
						<template v-else>{{books[rightPage].content}}</template>
					</div>
				</div>
				<div class="next" @click="nextPage" v-show="rightPage < books.length-1">
					下一页
					<div class="note"></div>
				</div>
			</div>
			<div class="pageWrap leftPage">
				<div class="page">
					<div :class="{move : SGPageNum}">
						<div class="cover" 
						:style="{backgroundImage: 'url(\'../resource/img/book/'+nowSGPage+'.jpg\')'}"></div>{{books[nowSGPage].content}}
					</div>
				</div>
				<div class="pre" @click="preSinglePage"
				 v-show="singlePageNum > 0">
					上一页
					<div class="note"></div>
				</div>
				<div class="next" @click="nextSinglePage"
				 v-show="singlePageNum/2 < this.books.length - 0.5">
					下一页
					<div class="note"></div>
				</div>
			</div>
			<router-link to="/" class="Bookmark" style="right:auto;left: -60px;top:20px;transform: rotateY(180deg);">
				<div style="display: inline-block;transform: rotateY(180deg);">关闭</div>
			</router-link>
			<div class="Bookmark"
			v-for="(i, index) of books"
			:style="{top:(index+1)*35 + 'px'}"
			@click="jumpTo(index)"
			:class="{top : index === nowPage}">{{books[index].name}}</div>
		</div>
	</div>
	</transition>
</template>

<script>

export default {
  name: 'book',
  props : ['books'],

  data () {
    return {
    	pages : null,
    	leftPage : 0,
    	rightPage : 0,
    	middlePage : 0,
    	nowPage : 0,
    	singlePageNum : 0,
    	direction : 1,
    	flag :false,
    	index : -1
    };
  },
  methods : {
  	nextPage : function(){
  		var _this = this;
  		if(_this.flag === false && _this.rightPage < _this.books.length - 1)
	  		_this.flag = true;
	  	else
	  		return ;
  		var pages = document.getElementsByClassName('pageWrap');
  		pages[2].setAttribute("style", "transform: rotateY(90deg)");
  		pages[4].setAttribute("style", "animation:shadowDelete linear.3s");
  		_this.direction = 1;
  		if(_this.rightPage < _this.books.length - 1){
  			pages[3].setAttribute("style", "transition-duration:.3s;transform:perspective(1920px) rotateY(-90deg)");
  			if(_this.index === -1){
	  			_this.rightPage++;
	  			_this.middlePage++;
	  			_this.singlePageNum += 2;
	  		}
	  		else{
	  			_this.rightPage = _this.index;
	  			_this.middlePage = _this.index;
	  			_this.singlePageNum  = _this.index*2;
	  		}

  		}
  		
  		pages[3].addEventListener('transitionend', function(){
  			pages[0].setAttribute("style", "animation:shadowPlus linear .3s");
  			pages[2].setAttribute("style", "transition-duration:.3s;transform:perspective(1920px) rotateY(0deg);z-index:3");
  			
  		});

  		pages[2].addEventListener('transitionend', function(){
  			for(var i = 0 ; i < 6;i++)
  				pages[i].setAttribute("style", "");
  			
  			if(_this.flag){
				if(_this.direction === 1  && _this.leftPage < _this.books.length - 1){
					if(_this.index === -1)
						_this.leftPage++;
					else
						_this.leftPage = _this.index;
				}
				else if(_this.direction === 0 &&  _this.rightPage > 0){
					if(_this.index === -1)
						_this.rightPage--;
					else
						_this.rightPage = _this.index;
				}

				if(_this.nowPage < _this.books.length - 1 && _this.direction === 1){
					if(_this.index === -1)
		  				_this.nowPage++;
		  			else
		  				_this.nowPage = _this.index;
				}
	  			else if(_this.nowPage > 0 && _this.direction === 0){
					if(_this.index === -1)
		  				_this.nowPage--;
		  			else
		  				_this.nowPage = _this.index;
	  			}

	  			_this.index = -1;
	  			_this.flag = false;
			}
  		});
  	},
  	prePage : function(){
  		var _this = this;
  		if(_this.flag === false && _this.leftPage > 0)
	  		_this.flag = true;  //防止transitionend执行两次造成的后果
	  	else
	  		return ;
  		var pages = document.getElementsByClassName('pageWrap');
  		pages[1].setAttribute("style", "animation:shadowDelete linear .3s");
  		pages[2].setAttribute("style", "transform: rotateY(-90deg)");
  		_this.direction = 0;
  		if(_this.leftPage > 0){
  			pages[0].setAttribute("style", "transition-duration:.3s;transform:perspective(1920px) rotateY(90deg);");
	  		if(_this.index === -1){
	  			_this.leftPage--;
	  			_this.middlePage--;
	  			_this.singlePageNum -= 2;
	  		}
	  		else{
	  			_this.leftPage = _this.index;
	  			_this.middlePage = _this.index;
	  			_this.singlePageNum  = _this.index*2;
	  		}
  		}
  		
  		pages[0].addEventListener('transitionend', function(){
  			pages[3].setAttribute("style", "animation:shadowPlus linear .3s");
  			pages[2].setAttribute("style", "transition-duration:.3s;transform:perspective(1920px) rotateY(0deg);z-index:5");				
  		});
  	},
  	nextSinglePage : function(){
  		if(this.index !== -1){
  			this.leftPage = this.index;
  			this.rightPage = this.index;
  			this.middlePage = this.index;
  			this.nowPage = this.index;
  			this.singlePageNum = this.index*2;
  			this.index = -1;
  			return ;
  		}
  		if(this.singlePageNum / 2 < this.books.length - 0.5)
  			this.singlePageNum++;

  		if(this.rightPage < this.books.length - 1
  		 && this.singlePageNum/2 === parseInt(this.singlePageNum/2)){
  			this.rightPage++;
  			this.leftPage++;
  			this.nowPage++;
  			this.middlePage++;
  		}
  	},
  	preSinglePage : function(){
  		if(this.index !== -1){
  			this.leftPage = this.index;
  			this.rightPage = this.index;
  			this.middlePage = this.index;
  			this.nowPage = this.index;
  			this.singlePageNum = this.index*2;
  			this.index = -1;
  			return ;
  		}
  		if(this.singlePageNum > 0)
  			this.singlePageNum--;

  		if(this.rightPage > 0
  		&& this.singlePageNum/2 == parseInt(this.singlePageNum/2) + 0.5){
  			this.rightPage--;
  			this.leftPage--;
  			this.nowPage--;
  			this.middlePage--;
  		}
  	},
  	jumpTo : function(index){
  		if(document.body.clientWidth >= 1080){
	  		if(this.nowPage > index){
	  			this.index = index;
	  			this.prePage();
	  		}
	  		else if(this.nowPage < index){
	  			this.index = index;
	  			this.nextPage();
	  		}
		}
		else{
			if(this.nowPage > index){
	  			this.index = index;
	  			this.preSinglePage();
	  		}
	  		else if(this.nowPage < index){
	  			this.index = index;
	  			this.nextSinglePage();
	  		}
		}
  	}
  },
  computed : {
  	SGPageNum : function(){
  		return this.singlePageNum % 2;
  	},
  	nowSGPage : function(){
  		return parseInt(this.singlePageNum / 2);
  	}
  }
};
</script>

<style lang="scss" scoped>
.scale-enter, .scale-leave-active{
	transform: scale(0);
}

@keyframes shadowDelete{
	from { background-color: #ac9e4c; }
	to { background-color: #fce76d; }
}

@keyframes shadowPlus{
	from { background-color: #fce76d; }
	to { background-color: #ac9e4c; }
}

.top{
	z-index: 4;
}

#bookWrap{
	position: absolute;
	left: 0; top: 0;
	z-index: 2;
	display: flex;
	width: 100%;
	height: 100%;
	background:rgb(255, 238, 102) linear-gradient(rgb(244, 243, 158) 0, rgb(245, 218, 65) 60%, rgb(255, 238, 102) 100%) no-repeat;
	background-size: 100% 100%;
	transition: transform ease .3s;

	&>#book{
		position: relative;
		font-size: 20px;
		margin: auto;
		height: 624px;
		border: 15px #514815 solid;
		border-top: 0;
		background: linear-gradient(-45deg, #f7e78b 0, #fce76d 100%);
		box-shadow: 5px 5px 8px rgba(7,17,27,.6);
		& .leftPage{
			z-index:3;
			transform-origin: right center;
			position:absolute;
			left: 0;
		}

		& .rightPage{
			z-index:3;
			transform-origin: left center;
			position:absolute;
			right: 0;
		}

		& .pageWrap{
			display: inline-block;
			padding:30px;
			border: 2px #514815 solid;
			background: 
			linear-gradient(transparent, transparent 29px
				,#00bc96 0, #00bc96 30px);
			background-size:100% 30px;
			box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 10px 1px;
			border-radius: 2px;
			background-color: #fce76d;
			height: 560px;
			transition: all ease 0s;

			&:nth-of-type(3){
				z-index:4;
				transform:perspective(1920px) rotateY(90deg);
			}
			&:nth-of-type(6){
				display: none;
			}

			& .note{
				position: absolute;
				width: 1.2em;
				height: 2em;
			}
			& .next{
				-webkit-user-select: none;
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
				-webkit-user-select: none;
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
				height: 569px;
				line-height: 1.5em;
				color:rgb(7,17,27);

				& .move{
					position: absolute;
					top: -566px; 
				}
			}
		}

		& .cover{
			width: 120px;
			height: 160px;
			margin-right: 20px;
			margin-bottom: 10px;
			float:left;
			background-size: 100% 100%;
		}
		
		& .Bookmark{
			position: absolute;
			top: 20px;
			left: 845px;
			min-width: 60px;
			height: 21.21px;
			background: #de3076;
			background-image: linear-gradient(to right, rgba(255,255,255,.5) 0, #de3076 40%);
			color: white;
			text-align: center;
			line-height: 21.21px;
			font-size: 16px;
			word-break:keep-all;
			cursor: pointer;

			&:before, &:after{
				content: "";
				position: absolute;
				right: -30px;
				//left: 60px;
				width: 30px;
				height: 21.21px; 
				background: linear-gradient(150deg, #de3076 50%, transparent 0);
				background-size: 100% 100%;
			}

			&:after{
				background: linear-gradient(30deg, #de3076 50%, transparent 0);
			}
		}
	}

	@media screen and(max-width: 1080px){
		#bookWrap{
			overflow: hidden;
		}
		#book{
			width: 420px;
			
			& .pageWrap{
				position: absolute;

				&:nth-of-type(6){
					display: inline-block;
				}
			}

			& .Bookmark{
				left: 422px;
			}
			

		}
	}
}
</style>