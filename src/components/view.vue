<template>
	<div id="view">
		<div id="pictureWrap">
			<div class="picture"></div>
			学校于1990年筹办，1992年4月经原国家教委批准成立，2002年3月经教育部批准变更为本科全日制普通高等院校，2006年5月获批为学士学位授予单位，2008年5月提前参加教育部本科教学工作水平评估并以良好成绩通过，2010年6月与清华大学等61所高校一起被批准为教育部第一批“卓越工程师教育培养计划”实施高校，2010年8月获批为广东省立项建设的新增硕士学位授予单位，2012年获批为“广东省国际科技合作基地”，2015年9月被确定为省市共建高水平理工科大学建设单位。
		</div>
		<div id="envelope"></div>
	</div>
</template>

<script>
export default {

  name: 'view',

  data () {
    return {

    };
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
	
	&>#pictureWrap{
		z-index: 3;
		width: 800px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		box-shadow: 0 0 0 20px white, 3px 3px 3px 20px rgba(7,17,27,.6);
		background-color: white;

		&>.picture{
			width: 100%;
			padding-bottom: 56.25%;
			background-image: url('../../resource/img/introduction/0.jpg');
			background-size: 100% 100%;
			margin-bottom: 10px;
		}
	}

	&>#envelope{
		background-color: #EBB97A;
		width: 320px;
		padding-bottom: 56.25%;
	}
}
</style>