
import axios from 'axios'

//第一种方式
// export function request(config,success,failure){
//     //1.创建axios的实例
//     const instance = axios.create({
//         baseURL:'http://152.136.185.210:8000/api/n3',
//         timeout:5000
//     })

//     //发送真正的网络请求
//     instance(config).then(res => {
//         console.log(res);
//         success(res);
//     }).catch(err => {
//         console.log(err);
//         failure(err);
//     })
// }

//第二种方式
// export function request(config){
//     //1.创建axios的实例
//     const instance = axios.create({
//         baseURL:'http://152.136.185.210:8000/api/n3',
//         timeout:5000
//     })

//     //发送真正的网络请求
//     instance(config.baseConfig).then(res => {
//         console.log(res);
//         config.success(res);
//     }).catch(err => {
//         console.log(err);
//         config.failure(err);
//     })
// }

//第三种方式
// export function request(config){

//     return new Promise((resolve,reject)=>{
//         //1.创建axios的实例
//         const instance = axios.create({
//             baseURL:'http://152.136.185.210:8000/api/n3',
//             timeout:5000
//         })

//         //发送真正的网络请求
//         instance(config)
//         .then(res => {
//             resolve(res);
//         })
//         .catch(err => {
//             reject(err);
//         })
//     })
// }

//最简单的封装写法   instance本身就是promise
export function request(config){

   
    //1.创建axios的实例
    const instance = axios.create({
        baseURL:'http://152.136.185.210:8000/api/n3',
        timeout:5000
    })

    //2.axios拦截器
    instance.interceptors.request.use(config=>{
        //拦截的是config
        // console.log(config);


        //1.比如config中的一些信息不符合服务器的要求

        //2.比如每次请求时，都希望在界面中显示一个请求的图标

        //3.某些网络请求(比如登录(token)),必须携带一些特殊字段

        return config //拦截之后必须放行，否则报错
    },err=>{
        console.log(err);
    });//表示拦截请求


    //2.2响应拦截
    instance.interceptors.response.use(res=>{
        return res.data;
    },err=>{
        console.log(err);
    })
    
    //发送真正的网络请求
    return instance(config)
        
}

