import axios from "axios";


axios.defaults.timeout = 5000; 
// 请求拦截器 
axios.interceptors.request.use( 
    config => { 
        if (window.sessionStorage.getItem('userId')) {
          let  userToken = window.sessionStorage.getItem('userId')
          config.headers.common["Authorization"] = `Bearer ${userToken}`; 
        } 
        return config; 
    }, 
    err => { 
        return Promise.reject(err); 
    } 
);



// 响应拦截器 
axios.interceptors.response.use( 
    response => { 
        return response; 
    }, 
    error => { 
        if (error.response) { 
            switch (error.response.status) { 
                case 401: 
                  this.logout()
            } 
        } 
        console.log(error);//console : Error: Request failed with status code 402 
        return Promise.reject(error) 
}) 

  function logout () {
     window.sessionStorage.removeItem('userId');
      window.location.href='/#/login'
  }

/* 用户登录 */
export function getUsers(userInfo){
  return axios.post('/users/login',{
    username: userInfo.account,
    password: userInfo.password
  }
  )
}
/* 配置列表 */
export function getConfList(parms){
  return axios.get('/configs',{
    page: parms.pageNum,
  })
}
export function removeConfig(confId) {
  return axios.delete('/configs',{
    params:{
      id:confId
    }
  })
}






/* 管理员列表 */
export function getAdminList(pageNum){
  return axios.get('/users',{
    params:{
      page: pageNum, 
    }
  })
}