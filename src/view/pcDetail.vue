<template>

	<Row>
		<Card dis-hover>
			<p slot="title">电脑借用明细一览</p>
			<div class="edittable-table-height-con">
				<Row style="text-align: right;">
					<Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入工号搜索..." style="width: 200px" />
				</Row>
				<Row>
					&nbsp;
				</Row>
				<Table border stripe :columns="columns" v-model="userData" :data="userData"></Table>
			</div>
			<div style="padding: 20px;overflow: hidden">
				<div style="float: right;">
					<Page :page-size="pageSize" :total="dataCount" :current="1" @on-change="changePage" show-elevator></Page>
				</div>
			</div>
			<Modal v-model="ModalBool" width="360">
				<p slot="header" style="color:#f60;text-align:center">
					<Icon type="information-circled"></Icon>
					<span>删除确认</span>
				</p>
				<div style="text-align:center">
					<p>
						<h1>确定删除?</h1></p>
				</div>
				<div slot="footer">
					<Button type="error" size="large" long @click="remove()">删除</Button>
				</div>
			</Modal>
		</Card>
	</Row>

</template>
<script>
	import axios from 'axios'

	export default {
		//在需要当前页面刷新的页面中注入App.vue组件提供（provide）的 reload 依赖，然后直接用this.reload来调用就行
		inject:['reload'],
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				userData: [],//当前页显示数据
				userId: '',
				ModalBool: false,
				searchConName1: "",
				columns: [{
						title: 'ID',
						key: 'id',
					}, {
						title: '工号',
						key: 'job_num',
					},
					{
						title: '姓名',
						key: 'name',
					},
					{
						title: '部门',
						key: 'dept',
					}, {
						title: '职位',
						key: 'job',
					}, {
						title: '入职日期',
						key: 'ent_date',
					}, {
						title: '离职日期',
						key: 'dim_date',
						render: (h, params) => {
							return h('div', [
								params.row.dim_date ? params.row.dim_date : "在职"
							])
						}
					}, {
						title: '计算机序列号',
						key: 'pc_num',
					},
					{
						title: '计算机型号',
						key: 'pc_type',
					},
					{
						title: '借用期限',
						key: 'pc_date',
						render: (h, params) => {
							return h('div', [
								params.row.pc_date == 1 ? "短期" : '长期'
							]);
						}
					},
					{
						title: '领用日期',
						key: 'get_date',
					},
					{
						title: '归还日期',
						key: 'back_date',
						render: (h, params) => {
							return h('div', [
								params.row.back_date ? params.row.back_date : '借用中'
							])
						}
					},
					{
						title: '操作',
						key: 'action',
						width: 200,
						align: 'center',
						render: (h, params) => {
							const row = params.row;
                            const color = row.back_date  ? 'dashed' : 'success';
                            const text = row.back_date  ? '已归还' : '归还';
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											let argu = {
												id: params.row.id
											};
											this.$router.push({
												name: 'pcChange',
												params: argu
											})
										}
									}
								}, '查看'),
								h('Button', {
									props: {
										type: color,
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											let argu = {
												id: params.row.id,
												pc_num: params.row.pc_num
											};
											if (text=="已归还") {
												console.log("已归还")
											} else{
												this.back(argu.id, argu.pc_num);
											}
										}
									}
								}, text),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											let argu = {
												id: params.row.id
											};
											this.userId = argu.id;
											this.ModalBool = true;
										}
									}
								}, '删除')
							]);
						}
					}
				],
				data: [

				]
			}
		},
		mounted() {
			var copy = this;
			sessionStorage.setItem("page",1);
			axios.get(copy.pub.url + '/user/getAllUserInfos')
				.then(function(response) {
					//					copy.userData = response.data.data;

					copy.historyData = response.data.data;

					copy.dataCount = copy.historyData.length;
					// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
					if(copy.historyData.length < copy.pageSize) {
						copy.userData = copy.historyData;
					} else {
						copy.userData = copy.historyData.slice(0, copy.pageSize);
					}

					console.log(response.data);
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			//归还功能函数
			back(e, m) {
				console.log(e);
				var copy = this;
				axios.post(copy.pub.url + '/pc/backPc', {
						id: e,
						pc_num: m,
					})
					.then(function(response) {
						if(response.data.head == 200) {
							copy.$Message.success(response.data.message);
							
							copy.historyData = response.data.data;
							copy.dataCount = copy.historyData.length;
							// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
							if(copy.historyData.length < copy.pageSize) {
								copy.userData = copy.historyData;
							} else {
								copy.userData = copy.historyData.slice(0, copy.pageSize);
							}
							var a = sessionStorage.getItem("page");
							copy.changePage(a);
						} else {
							copy.$Message.error(response.data.message);
						}
						console.log(response.data);
					})
					.catch(function(error) {});
			},
			remove() {
				var copy = this;
				axios.post(copy.pub.url + '/user/deleteUser', {
						delete_id: copy.userId
					})
					.then(function(response) {
						if(response.data.head == 200) {

							copy.historyData = response.data.data;

							copy.dataCount = copy.historyData.length;
							// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
							if(copy.historyData.length < copy.pageSize) {
								copy.userData = copy.historyData;
							} else {
								copy.userData = copy.historyData.slice(0, copy.pageSize);
							}
							copy.userId = '';
							if(response.data.head == 200) {
								copy.ModalBool = false;
								copy.$Message.success(response.data.message);
							}

						} else {
							copy.$Message.error(response.data.message);
						}
						console.log(response.data);
					})
					.catch(function(error) {});
			},
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1 == "") {
					this.userData = this.historyData.slice(0, this.pageSize);
				} else {

					this.userData = this.historyData;
					this.userData = this.search(this.userData, {
						job_num: this.searchConName1
					});
				}
			},
			//搜索功能函数
			search(data, argumentObj) {
				let res = data;
				let dataClone = data;
				for(let argu in argumentObj) {
					if(argumentObj[argu].length > 0) {
						res = dataClone.filter(d => {
							return d[argu].indexOf(argumentObj[argu]) > -1;
						});
						dataClone = res;
					}
				}
				return res;
			},
			//分页功能
			changePage(index) {
				sessionStorage.setItem("page",index);
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = (index - 1) * this.pageSize;
				var _end = index * this.pageSize;
				this.userData = this.historyData.slice(_start, _end);
			},
		}
	}
</script>