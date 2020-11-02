import fly from 'flyio';
import { Toast } from 'vant';
//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.config.baseURL = process.env.VUE_APP_BASE_API;
// console.log(fly.config.baseURL)
fly.interceptors.response.use(
    (res) => {
        res = typeof res === 'string'? JSON.parse(JSON.stringify(res.trim())): res;
        // console.log(typeof res.data === 'string');
        var data = typeof res.data === 'string'? JSON.parse(res.data.trim()): res.data;
        // console.log(data);
        if (data.errcode === 0) {
            // 请求成功
            return data.data
        }else {
            Toast(data.errmsg || '请求失败');
            return Promise.reject('请求失败');
        }
    },
    (err) => {
      console.log(err, 'err')
        //发生网络错误后会走到这里
        var errMsg = err.message || '请求失败';
        Toast(errMsg);
        return Promise.reject(errMsg)
    }
)

export default fly;
