<template>
	<div class="bg" @resize="getHeight">
		<div class="note"></div>
		<audio :src="music[now].src" autoplay ></audio>
    	<div class="wrapper">
    		<div class="main">
    			
    			<div class="list">
    				<ul>    			
    					<li v-for="(item,index) of music"  @click="change(index)" :class="{'active':(index === nowindex)}">
    						{{music[index].name}}
    					</li>
    				</ul>
    			</div>
    			<div class="detail">
    				<ul  @scroll="changeList" > 
    					<li v-for="(item,index) in music" >
    						<div class="title">{{music[index].name}}</div><!-- 
    					 --><span class="icon-play3"
    					  :class="{'icon-pause2':now===index && status}"
    					   @click="pause(index)"></span>
    						<div class="text">{{text(index)}}</div>
    						<div class="line"></div>    						
    					</li>    					
    				</ul>
    			</div>
    		</div>
    		<div class="control">
    			<div class="progressBar">
    				<div class="slider" @click="jump($event)">
    					<div class="buffer"></div>
    					<div class="processor" :style="progress"  @click="jump($event)">
    						<div class="controller"  @mousedown="controlBlock($event)" ></div>
    					</div>    					
    				</div>    				
    			</div>
    			<div class="button">
	    			<span class="icon-backward2" @click="last"></span><!-- 
	    			 --><span class="icon-play3" :class="{'icon-pause2':status}" @click="pause(-1)"></span><!-- 
	    			 --><span class="icon-forward3" @click="next"></span>
    			</div>    			
    			
    		</div>
    	</div>
    	<div class="background"></div>
    </div>
</template>
	
<script>
export default {
	props : ['music'],
  data () {
    return {
    	height:[],
    	nowindex:0,
    	listHeight:[],
    	status:false,
    	duration:0,
    	progress:{
    		width:'0%'
    	},
    	now:0,
    	flag : true		//是否检测滚动条滑动
    };
  },
  mounted(){
  		var audio = document.getElementsByTagName('audio')[0];
  		audio.addEventListener('loadeddata',function(){
  			this.duration = audio.duration;  					
  		}.bind(this));
  		audio.addEventListener('timeupdate',function(){
  			this.progress.width = audio.currentTime/audio.duration*100+"%";
  		}.bind(this));
  		audio.pause();
  },
  updated(){
	  	
  		this.getHeight();
	  	
  },
  watch:{
  		src:function(){
  			var audio = document.getElementsByTagName('audio')[0];
  			this.duration = audio.duration;
  			this.progress.width = audio.currentTime/audio.duration*100+"%";
  		},
	  	nowindex:function(){
	  		this.flag = false;
	  		var listUl = document.getElementsByClassName('list')[0].getElementsByTagName('ul')[0];
	  		if((this.nowindex-1)%3 == 0 )
	  		{
	  			listUl.scrollTop = this.listHeight[(this.nowindex-1)/3-1];
	  		}
	  	}
  },
  methods:{
  	creatNote : function(){

  	},
  	text : function(index){
  		return this.music[index].text.replace(/\|/g, "\n\n");
  	},
  	getHeight : function(){
  		var li = document.getElementsByClassName("detail")[0].getElementsByTagName('ul')[0].getElementsByTagName('li');

  		var listLi = document.getElementsByClassName('list')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');

  		for( var i = 0 ; i < li.length ; i++ )
  		{
  			if( i == 0 )
  			{
  				this.height[i] = li[i].offsetHeight;
  			}
  			else
  			{
  				this.height[i] = li[i].offsetHeight + this.height[i-1];
  			}
  		}
  		for( var i = 0 ; i < listLi.length/3+1 ; i++)
  		{
  			this.listHeight[i] = 0;
  		}
  		for(var i = 0,num = 0 ; i < listLi.length ; i++ )
  		{
  			if(num==0)
  			{
  				this.listHeight[num] += listLi[i].offsetHeight;
  				if((i+1)%3 == 0)
  					num++;
  			}
  			else
  			{
  				this.listHeight[num] += listLi[i].offsetHeight;
  				if((i+1)%3 == 0 || (i+1)==listLi.length)
  				{
  					this.listHeight[num]+=(this.listHeight[num-1]);
  					num++;
  				}
  			}
  		}	  
  	},
  	change(index){
  		var ul = document.getElementsByClassName("detail")[0].getElementsByTagName('ul')[0];
  		ul.scrollTop = this.height[index-1];
  		this.nowindex = index;
  		
  	},
  	changeList(){
  		if(this.flag === false)
  		{
  			this.flag = true;
  			return ;
  		}

  		var ul = document.getElementsByClassName("detail")[0].getElementsByTagName('ul')[0];
  		var listUl = document.getElementsByClassName('list')[0].getElementsByTagName('ul')[0];

  		for( var i = 0 ; i < this.height.length ; i++ )
  		{
  			if(ul.scrollTop<this.height[0])
  			{
  				this.nowindex = 0;
  			}
  			else if((ul.scrollTop)>=this.height[i-1] && (ul.scrollTop) <= this.height[i])
  			{
  				this.nowindex = i;
  			}
  			else if((ul.scrollTop)>=(this.height[i-1]-24) && i == this.height.length-1)
  			{
  				this.nowindex = i;
  			}

  		}
  	},
  	last(){
  		if(this.now != 0){
  			this.now--;
  			this.status = true;
  		}
  		
  	},
  	next(){
		if(this.now!=this.music.length){
			this.now++;
			this.status = true;
		}
  	},
  	pause(index){
  		var audio = document.getElementsByTagName('audio')[0];
  		if(index !== -1 && this.now !== index){
			this.now = index;
			audio.play();
  			this.play = true;
  			this.status = true;
			return;
  		}

  		if(this.status == false)
  		{
	  		audio.play();
  			this.play = true;
  		}
  		else
  		{
  			audio.pause();
  			this.play = false;
  		}

  		this.status = !this.status;
  	},
  	controlBlock(e){
  		var slider = document.getElementsByClassName('slider')[0];
  		var controller = document.getElementsByClassName('controller')[0];
  		var disX = e.clientX - controller.offsetLeft;
  		var audio = document.getElementsByTagName('audio')[0];  		
  		if(this.status)
  			audio.pause();

  		document.onmousemove = function(ev){
  			var l = (ev.clientX-disX)/slider.offsetWidth*100;  	
  			this.progress.width = l+'%';
  			audio.currentTime = audio.duration*(l/100);
  		}.bind(this);
  		document.onmouseup = function(){
  			if(this.status)
  				audio.play();
  			document.onmousemove = null;
  			document.onmouseup = null;
  			
  		}.bind(this);
  	},
  	jump(e){
  		var wrapper = document.getElementsByClassName('wrapper')[0];
  		var progressBar = document.getElementsByClassName('progressBar')[0];
  		var slider = document.getElementsByClassName('slider')[0];
  		var disX = wrapper.offsetLeft+progressBar.offsetLeft;
  		var audio = document.getElementsByTagName('audio')[0];
  		this.progress.width = (e.clientX - disX)/slider.offsetWidth*100 + "%";
  		audio.currentTime = audio.duration * (e.clientX - disX)/slider.offsetWidth;
  	}
  }
};
</script>

<style lang="scss" scoped>
	ul,li{
		list-style: none;
	}
	.bg{
		z-index:3;
		display: flex;
		position: absolute;
		top: 0; left: 0;
		width: 100%;
		height: 100%;
        overflow: hidden;
		.wrapper{
			position: relative;
			width: 920px;
			height: 70%;
          	margin: auto;
          	
			.main{
				display: flex;
				width: 100%;
				height: 80%;
			    margin-bottom: 30px;
			    border: 1px solid black;
				.list{
					display: inline-block;
					flex: .3;
					height:100%;
					
					ul{
						overflow-y:scroll;
						width: 100%;
						height: 100%;
						box-sizing:border-box;					
						overflow-y: auto;
						li{
							box-sizing: border-box;
						    padding: 12px;
						    width: 100%;
						    border-bottom: 1px solid black;;
						    background-color: rgba(0,0,0,.1);
						}							
					}
					.active{
						color: black;
						font-weight: bold;
					    border-left: none;
					    background: transparent;
					    box-shadow: 0px 0px 4px #090909;
					}
				}
				.detail{
					white-space: pre-line;
					display: inline-block;
				    flex: 2;
				    height: 100%;
				    border-right: none;
					line-height: 1.5em;

					ul{
						height: 100%;
						overflow-y: scroll;
						li{
							color: #333;
							box-sizing:border-box;
							padding: 20px;

							.title{
								display: inline-block;
								margin-right: 20px;
								font-size: 24px;
								line-height: 2em;
							}

							.icon-play3:before {
							  	content: "\e052";
							  	font-family: 'icomoon';
							  	font-size: 20px;
							}
							.icon-pause2:before {
							 	content: "\e053";
							 	font-family: 'icomoon';
							 	font-size: 20px;
							}

							.text{
								margin-left: 5px;
							}


							.line{
								width: 100%;
								margin-top: 30px;
								&:before{
									content:"";
									display: inline-block;
									width: 50%;
									height: 1px;
									background:linear-gradient(to right, rgba(255,255,255,0), black);
								}
								&:after{
									content:"";
									display: inline-block;
									width: 50%;
									height: 1px;
									background:linear-gradient(to left, rgba(255,255,255,0), black);
								}
							}
							
						}
					}
				}
			}
		 	.control{
				margin: auto;
				height: 50px;
				text-align: center;
				margin-left: 20px;

		 		.button{
		 			float: left;
		 			margin: auto 0;
		 			width: 110px;
		 			vertical-align: top;
		 			display: inline-block;
			 		box-sizing:border-box;
			 		font-size: 30px;
			 		
			 		span{
						display: inline-block;
						color: rgb(7,17,27);

						&:nth-of-type(2),&:nth-of-type(3){
							margin-left: 10px;
						}
					}
		 		}		 				 								
				.icon-play3:before {
				  	content: "\e052";
				  	font-family: 'icomoon';
				}
				.icon-pause2:before {
				 	content: "\e053";
				 	font-family: 'icomoon';
				}
				.icon-backward2:before {
				 	content: "\e902";
				 	font-family: 'icomoon';
				}
				.icon-forward3:before {
				  	content: "\e901";
				  	font-family: 'icomoon';
				}
				.progressBar{
					float: right;
					margin: auto;
					display: inline-block;
					position: relative;
					margin-top: 15px;
					margin-left: 20px;
					margin-right: 20px;
					width: calc(100% - 160px);
			
					.slider{
						background-color: #313132;
						width: 100%;
						height: 5px;
						position: relative;
						cursor: pointer;

						.buffer{
							background-color: #979EA6;
						}
						.processor{
							background-color: rgb(247,237,227);
							position: absolute;
							z-index: 1;
							height: 100%;
							.controller{
								background-color: white;
								width: 10px;
								height: 10px;
								border-radius: 5px;
								position: absolute;
								z-index: 3;
								cursor: pointer;	
								top: -3px;	
								right: 0px;
							}
						}						
					}
				}
			}
		}
		.background{
		    background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		    position: absolute;
		    top: 0;right: 0;bottom: 0;left: 0;
		    z-index: -2;
		}
	

	}

	@media screen and (max-width: 1080px){
		.wrapper{
			width: 80% !important;
		}

		.progressBar{
			width: 100% !important;
			float: none !important;
			display: block !important;
			margin: 0 auto 40px auto !important;
		}

		.button{
			float: none !important;
			display: block !important;
			margin: 0 auto !important;
			font-size: 45px !important;
			width: 100% !important;
			
			.icon-play3:before {
			  	margin-left:200px;
			  	margin-right: 200px;
			}
			.icon-pause2:before {
			 	margin-left:200px;
			  	margin-right: 200px;
			}
		}
	}
</style>