<template>

	<Row>
		<Card dis-hover>
			<p slot="title">电脑库存新增</p>
			<div>
				<Row class="top">
					<Col span="3" offset="4" class="intro">编号:</Col>
					<Col span="8">
					<Input v-model="data.num" placeholder="请输入计算机编号" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">品牌型号:</Col>
					<Col span="8">
					<Input v-model="data.pc_type" placeholder="请输入品牌及型号" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">基本参数:</Col>
					<Col span="8">
					<Input v-model="data.pc_detail" placeholder="请输入基本参数" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">计算机序列号:</Col>
					<Col span="8">
					<Input v-model="data.pc_num" placeholder="请输入计算机序列号" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">状态:</Col>
					<Col span="8">
					<Select v-model="data.pc_state" style="width:300px">
						<i-option v-for="item in state" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
				</Row>

				<Row style="margin: 25px 0;">
					<Col span="3" offset="7">
					<Button type="primary" @click="save">保存</Button>
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
					num:'',
					pc_detail:'',
					pc_num:'',
					pc_type:'',
					pc_state:'1',
				},
				state: [
                    {
                        value: '1',
                        label: '可用'
                    },
                    {
                        value: '2',
                        label: '不可用'
                    },
                ],
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
</style>