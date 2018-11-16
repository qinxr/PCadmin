<template>

	<Row>
		<Card dis-hover>
			<p slot="title">签名生成</p>
			<div class="signArea">

			</div>
			<div>
				<Row class="top">
					<Col span="3" offset="4" class="intro">公司类别:</Col>
					<Col span="8">
					<Select v-model="data.pc_state" style="width:300px">
						<i-option v-for="item in type" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">姓名:</Col>
					<Col span="8">
					<Input v-model="data.pc_type" placeholder="请输入姓名：" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">职位:</Col>
					<Col span="8">
					<Input v-model="data.job" placeholder="请输入所在职位" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">所在公司:</Col>
					<Col span="8">
					<Input v-model="data.job" placeholder="请输入所在公司" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">固定电话:</Col>
					<Col span="8">
					<Input v-model="data.job" placeholder="请输入固定电话" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">移动电话:</Col>
					<Col span="8">
					<Input v-model="data.job" placeholder="请输入移动电话" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">邮箱:</Col>
					<Col span="8">
					<Input v-model="data.job" placeholder="请输入邮箱" style="width: 300px" />
					</Col>
				</Row>

				
			</div>
		</Card>
	</Row>
</template>
<script>
	//引入ajax方法
	import axios from 'axios';

	export default {
		name: 'pcBrrow',
		data() {
			return {
				data: {
					pc_num: '',
					pc_type: '',
					pc_state: '1',
				},
				state: [{
						value: '1',
						label: '可用'
					},
					{
						value: '2',
						label: '不可用'
					},
				],
				type: [{
						value: '1',
						label: '医疗'
					},
					{
						value: '2',
						label: '环保'
					},
				]
			}
		},
		mounted() {

		},
		methods: {
			save() {
				var that = this;
				axios.post(that.pub.url + '/pc/addPcInfo', that.data)
					.then(function(response) {
						if(response.data.head == 200) {
							that.$Message.success(response.data.message);
						} else {
							that.$Message.error(response.data.message);
						}
						console.log(response.data);
					})
					.catch(function(error) {});
			}
		}
	}
</script>
<style>
	.intro {
		padding-top: 5px;
		font-size: 14px;
		font-weight: 600;
	}
	
	.top {
		margin: 15px 0;
	}
	
	.signArea {
		height: 300px;
		width: 100%;
	}
</style>