export default {
	install(Vue, options) {

		Vue.prototype.pub = {
			//淄博IP（无线）
//			url: 'http://192.168.102.193:8081',
			//青州IP（固定）
			url: 'http://192.168.129.57:8081',

		};

	}
}