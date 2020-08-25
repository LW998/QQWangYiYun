import axios from 'axios'
import QS from 'qs'


//是否运行后端携带cookies
// axios.defaults.withCredentials = true
//处理post请求
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//经过全局接口路径
axios.defaults.baseURL = '/api';
//请求拦截器
axios.interceptors.request.use(
    function(config) {
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
);
//响应拦截器
axios.interceptors.response.use(
    function(response) {
        return response.data
    },
    function(error) {
        return Promise.reject(error)
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return axios.get(url, {
        params: params,
    })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return axios.post(url, QS.stringify(params))
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
    return axios.put(url, QS.stringify(params))
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function Delete(url, params) {
    return axios.delete(url, {
        params: params,
    })
}