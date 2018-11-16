<template>

	<Row>
		<Card dis-hover>
			<p slot="title">电脑借用登记</p>
			<div>
				<Row class="top">
					<Col span="3" offset="4" class="intro">姓名:</Col>
					<Col span="8">
					<Input v-model="data.name" placeholder="请输入姓名" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">工号:</Col>
					<Col span="8">
					<Input v-model="data.job_num" placeholder="请输入工号" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">部门:</Col>
					<Col span="8">
					<Input v-model="data.dept" placeholder="请输入部门名称" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">职位:</Col>
					<Col span="8">
					<Input v-model="data.job" placeholder="请输入所在职位" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">入职日期:</Col>
					<Col span="8">
					<DatePicker v-model="data.ent_date" type="date" @on-change="data.ent_date=$event" format="yyyy-MM-dd" placeholder="请选入职日期" style="width: 300px"></DatePicker>
					</Col>
				</Row>
				<!--离职日期默认为空-->
				<!--<Row class="top">
					<Col span="3" offset="4" class="intro">离职日期:</Col>
					<Col span="8">
					<DatePicker v-model="data.dim_date" type="date" @on-change="data.dim_date=$event" format="yyyy-MM-dd" placeholder="请离职日期可以为空" style="width: 300px"></DatePicker>
					</Col>
				</Row>-->
				<Row class="top">
					<Col span="3" offset="4" class="intro">计算机型号:</Col>
					<Col span="8">
					<Select v-model="data.pc_type" @on-change="numChange(data.pc_type)" style="width:300px" filterable placeholder="请选择（可输入搜索）">
						<i-option v-for="item in snum" :value="item.id" :key="item.id" v-if="item.pc_state==1">{{ item.pc_type }}</i-option>
					</Select>
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">计算机参数:</Col>
					<Col span="8">
					<Input v-model="data.pc_detail" placeholder="主要参数" disabled="" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">计算机序列号:</Col>
					<Col span="8">
					<Input v-model="data.pc_num" placeholder="序列号" disabled="" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">期限:</Col>
					<Col span="8">
					<Select v-model="data.pc_date" style="width:300px">
						<i-option v-for="item in date" :value="item.value" :key="item.value">{{ item.label }}</i-option>
					</Select>
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">借用日期:</Col>
					<Col span="8">
					<DatePicker v-model="data.get_date" type="date" @on-change="data.get_date=$event" format="yyyy-MM-dd" placeholder="请选择借用日期" style="width: 300px"></DatePicker>
					</Col>
				</Row>
				<!--归还日期默认为空-->
				<!--<Row class="top">
					<Col span="3" offset="4" class="intro">归还日期:</Col>
					<Col span="8">
					<DatePicker v-model="data.back_date" type="date" @on-change="data.back_date=$event" format="yyyy-MM-dd" placeholder="请选择归还日期" style="width: 300px"></DatePicker>
					</Col>
				</Row>-->
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

	import qs from 'qs'

	export default {
		name: 'pcBrrow',
		data() {
			return {
				data: {
					pc_type: '',
					pc_detail: '',
					pc_num: ''
				},
				snum: {

				},
				date: [{
						value: '1',
						label: '短期借用'
					},
					{
						value: '2',
						label: '长期借用'
					},
				]
			}
		},
		mounted() {
			var that = this;
			axios.get(that.pub.url + '/pc/getPcInfos')
				.then(function(response) {
					that.snum = response.data.data
					console.log(response.that.snum);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			save() {
				var that = this;
				axios.post(that.pub.url + '/user/addUser', qs.stringify(that.data))
					.then(function(response) {
						if(response.data.head == 200) {
							that.$Message.success(response.data.message);

							axios.get(that.pub.url + '/pc/getPcInfos')
								.then(function(response) {
									that.snum = response.data.data;
									that.data.pc_detail = '';
									that.data.pc_type = '';
									that.data.pc_num = '';

								})
								.catch(function(error) {
									console.log(error);
								});


						} else {
							that.$Message.error(response.data.message);
						}
						console.log(response.data);
					})
					.catch(function(error) {});
			},
			numChange(index) {
				console.log(index)
				var that = this;
				axios.post(that.pub.url + '/pc/getPcAsNum/' + index)
					.then(function(response) {
						that.data.pc_detail = response.data.data.pc_detail;
						that.data.pc_num = response.data.data.pc_num;
						console.log(response.data.data);
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