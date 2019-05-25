// import {getCurrentUser}   from "../api/user";
import store from "../store";
import axios from "axios";

class PageUtil {


    static initLoadingMethod=()=>{

         // return;  //return 可以 暂时禁用 loading layer 功能。 如果当调试时出现死循环

        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
          // Do something before request is sent
          store.dispatch({
            type:'LOADING_START'
          });

          return config;
        }, function (error) {
          store.dispatch({
            type:'LOADING_START'
          });
          // Do something with request error
          return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            // Do something with response data
            store.dispatch({
              type:'LOADING_STOP'
            });

            // console.log('response',response);

            return response;
          }, function (error) {
            store.dispatch({
              type:'LOADING_STOP'
            });
            // console.log("API Loading Error::", error );
            // Do something with response error
            // console.log(JSON.stringify(error));
            // console.log(error.response.status);
            if(error && error.response && error.response.status == 401 ){
              // alert('鉴权失败，请重新登录!');
              return window.location.href = "/api/user/login";
            }
            return Promise.reject(error);
          });
    }

}

export default PageUtil;
