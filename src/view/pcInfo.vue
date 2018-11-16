<template>

	<Row>
		<Card dis-hover>
			<p slot="title">电脑库存一览</p>
			
			<div class="edittable-table-height-con">
				<Row style="text-align: right;">
					<Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入序列号搜索..." style="width: 200px" />
				</Row>
				<Row>
					&nbsp;
				</Row>
				<!--<Table border stripe :columns="columns" :data="data"></Table>-->
				<Table border stripe :columns="columns" v-model="pcData" :data="pcData"></Table>
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
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				pcData: [],
				pcId: '',
				ModalBool: false,
				searchConName1: "",
				columns: [{
						title: '编号',
						key: 'num',
					},
					{
						title: '计算机序序号',
						key: 'pc_num',
					},
					{
						title: '品牌型号',
						key: 'pc_type',
					},
					{
						title: '详细参数',
						key: 'pc_detail',
					},
					{
						title: '计算机序序号',
						key: 'pc_num',
					},
					{
						title: '状态',
						key: 'pc_state',
						render: (h, params) => {
							return h('div', [
								params.row.pc_state==1?"可用":'已借出'
							]);
						}
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
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
											let argu = { id: params.row.id };
											this.$router.push({ name: 'pcEdit', params: argu})
										}
									}
								}, '更改'),
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
											this.pcId = argu.id;
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
			axios.get(copy.pub.url + '/pc/getPcInfos')
				.then(function(response) {
					
					copy.historyData = response.data.data;

					copy.dataCount = copy.historyData.length;
					// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
					if(copy.historyData.length < copy.pageSize) {
						copy.pcData = copy.historyData;
					} else {
						copy.pcData = copy.historyData.slice(0, copy.pageSize);
					}

					
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			remove() {
				var copy = this;
				axios.post(copy.pub.url + '/pc/deletePc', {
						delete_id: copy.pcId
					})
					.then(function(response) {
						if(response.data.head == 200) {

							copy.historyData = response.data.data;

							copy.dataCount = copy.historyData.length;
							// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
							if(copy.historyData.length < copy.pageSize) {
								copy.pcData = copy.historyData;
							} else {
								copy.pcData = copy.historyData.slice(0, copy.pageSize);
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
					this.pcData = this.historyData.slice(0, this.pageSize);
				} else {

					this.pcData = this.historyData;
					this.pcData = this.search(this.pcData, {
						pc_num: this.searchConName1
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
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = (index - 1) * this.pageSize;
				var _end = index * this.pageSize;
				this.pcData = this.historyData.slice(_start, _end);
			},
		}
	}
</script>