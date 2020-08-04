
// SSR请求
let _baseURL = "";
if (process.env.APP_ENV === "dev") {
    _baseURL = 'http://10.1.220.5:9090/';        // 开发环境
} else if (process.env.APP_ENV === "pro") {
    _baseURL = 'https://zuul.louxun.com/';           // 正式环境
}

export default function ({store, redirect, app: { $axios }})  {
    const myToken = store.state.token;
    myToken && ($axios.defaults.headers.token = myToken);

	// 数据访问前缀
    $axios.defaults.baseURL = _baseURL;
    $axios.defaults.timeout = 10000; //设置请求时间
	
	$axios.onRequest(config => {
        config.headers.common['platform'] = '4',
        config.headers.common['apiVersion'] = '2.2.0'
	})
	$axios.onError(error => {
		
	})
    
    /**
     * 请求前拦截
     * 用于处理需要在请求前的操作
     */
    $axios.interceptors.request.use(config => {
        return config
    }, (error) => {
        console.log("请求发生错误");
        return Promise.reject(error)
    });

    /**
     * 请求响应拦截
     * 用于处理需要在请求返回后的操作
     */
    $axios.interceptors.response.use(response => {
        const responseCode = response.status
        if (responseCode === 200) {
            return Promise.resolve(response)
        } else {
            // this.$toast(response.data.retmsg || "服务器繁忙，请稍后再试");
            return Promise.reject(response)
        }
    }, error => {
        console.log("服务器繁忙，请稍后再试");
        return Promise.reject(error)
    });
}

// 非SSR
// import axios from 'axios';

// let _baseURL = "";
// if (process.env.APP_ENV === "dev") {
//     _baseURL = 'http://10.1.220.5:9090/';        // 开发环境
// } else if (process.env.APP_ENV === "test") {
//     _baseURL = "http://10.1.220.5:9090/";            // 测试环境
// } else if (process.env.APP_ENV === "pro") {
//     _baseURL = 'https://zuul.louxun.com/';           // 正式环境
// }

// axios.defaults.timeout = 10000; //设置请求时间
// axios.defaults.baseURL = _baseURL; //设置默认接口地址
// // axios.defaults.headers.platform = 4;
// // axios.defaults.headers.apiVersion = '2.2.0'

// /**
//  * 请求前拦截
//  * 用于处理需要在请求前的操作
//  */
// axios.interceptors.request.use(config => {
//     return config
// }, (error) => {
//     console.log("请求发生错误");
//     return Promise.reject(error)
// });

// /**
//  * 请求响应拦截
//  * 用于处理需要在请求返回后的操作
//  */
// axios.interceptors.response.use(response => {
//     const responseCode = response.status
//     if (responseCode === 200) {
//         return Promise.resolve(response)
//     } else {
//         // this.$toast(response.data.retmsg || "服务器繁忙，请稍后再试");
//         return Promise.reject(response)
//     }
// }, error => {
//     console.log("服务器繁忙，请稍后再试");
//     return Promise.reject(error)
// });

// export default axios;