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
					<DatePicker :value="data.ent_date"  type="date" @on-change="data.ent_date=$event" format="yyyy-MM-dd" placeholder="请选入职日期" style="width: 300px"></DatePicker>
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">离职日期:</Col>
					<Col span="8">
					<DatePicker :value="data.dim_date" type="date" @on-change="data.dim_date=$event" format="yyyy-MM-dd" placeholder="请离职日期可以为空" style="width: 300px"></DatePicker>
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">计算机序列号:</Col>
					<Col span="8">
					<Input v-model="data.pc_num" placeholder="请输入计算机序列号" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">计算机型号:</Col>
					<Col span="8">
					<Input v-model="data.pc_type" placeholder="请输入计算机型号" style="width: 300px" />
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">借用日期:</Col>
					<Col span="8">
					<DatePicker :value="data.get_date" type="date" @on-change="data.get_date=$event" format="yyyy-MM-dd" placeholder="请选择借用日期" style="width: 300px"></DatePicker>
					</Col>
				</Row>
				<Row class="top">
					<Col span="3" offset="4" class="intro">归还日期:</Col>
					<Col span="8">
					<DatePicker :value="data.back_date" type="date" @on-change="data.back_date=$event" format="yyyy-MM-dd" placeholder="请选择归还日期" style="width: 300px"></DatePicker>
					</Col>
				</Row>
				<Row style="margin: 25px 0;">
					<Col span="3" offset="7">
					<Button type="primary" @click="save">确认修改</Button>
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
		name: 'pcChange',
		data() {
			return {
				data: {
					
				}
			}
		},
		mounted(){
			let index = parseInt(this.$route.params.id.toString());
			var that =this;
				axios.post(that.pub.url + '/user/getUserAsId/'+index)
				.then(function(response) {
					that.data=response.data.data
					console.log(response.data);
				})
				.catch(function(error) {
				});
		},
		methods: {
			save() {
				let index = parseInt(this.$route.params.id.toString());
				var that =this;
				axios.post(that.pub.url + '/user/editUser/'+index,that.data)
				.then(function(response) {
					if(response.data.head==200){
						that.$Message.success(response.data.message);
					}else{
						that.$Message.error(response.data.message);
					}
					console.log(response.data);
				})
				.catch(function(error) {
				});
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