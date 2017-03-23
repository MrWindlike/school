<template>
	<div id="view">
		<div class="pictureWrap">
				<div class="picture"
					:class="{'move':(index>4-i)}" 
					@click.stop="addindex(i)"
					:style="{zIndex : 6-i}"
					 v-for="(item, i) of 5">
					<div 
					class="img" 
					:style="{backgroundImage: 'url(\'../resource/img/introduction/'+i+'.jpg\')'}"></div>
					学校于1990年筹办，1992年4月经原国家教委批准成立，2002年3月经教育部批准变更为本科全日制普通高等院校，2006年5月获批为学士学位授予单位，2008年5月提前参加教育部本科教学工作水平评估并以良好成绩通过，2010年6月与清华大学等61所高校一起被批准为教育部第一批“卓越工程师教育培养计划”实施高校，2010年8月获批为广东省立项建设的新增硕士学位授予单位，2012年获批为“广东省国际科技合作基地”，2015年9月被确定为省市共建高水平理工科大学建设单位。
				</div>
		</div>
		<div class="envelopeDown"></div>
		<div class="envelopeUp"></div>
		<div class="envelopeButton"></div>
		<div class="envelopePageWrap">
			<div class="envelopePageDowm"></div>
		</div>
	</div>
</template>

<script>

export default {
  name: 'view',
  data () {
	    return {
	    	index:1,
	    };
  },
  methods:{
	  	addindex(i){
	  		if(this.index<=4-i){
		  		if(this.index!=5)
		  			this.index++;
		  		else
		  			this.index = 1;
	  		}
	  		else{
	  			if(this.index!=1)
		  			this.index--;
	  		}
	  	}
  }
};
</script>

<style lang="scss" scoped>

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
			right: -250px;
			transform: translate(50%, -50%);
			transition:right ease .6s;
			box-shadow: 2px 2px 2px 0px rgba(7,17,27,.2);
			border: 20px white solid;
			background: white;
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
		right: -250px;
		width: 660px;
		height: 550px;
		transform: translate(50%, -50%);
	}
	
	.envelopeDown{
		background: #8b603a;
		box-shadow: 0 0 0 20px #8b603a, 0 0 2px 20px black;
	}

	.envelopeUp{
		z-index: 6;
		background: #B77F4C;
		box-shadow: 0 0 0 20px #B77F4C, -5px 0 5px 20px rgba(0,0,0,.6);
		width: 600px;
	}

	.envelopeButton{
		z-index: 7;
		position: absolute;
		top: 50%;
		right: 10px;
		width: 50px;
		height: 50px;
		transform: translate(0%, -50%);
		background: red;
		border-radius: 50%;
	}

	.envelopePageDowm{
		width: 80px;
		height: 590px;
		position: absolute;
		top: 50%;
		right: 99px;
		z-index: 1;
		background: #8b603a;
		transition: transform .3s ease;
		transform:perspective(400px) translate(0%, -50%);
		transform-origin: right center;
	}
}
</style>