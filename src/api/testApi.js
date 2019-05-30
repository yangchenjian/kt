import axios from "axios";

export function	getItems(){
  return axios.get("/testapi.json");
}

export function	createItem(item){
	return axios.post("/testapi.json",item);
}

export function	updateItem(item){
	return axios.put("/testapi.json/" + item.ID ,item);
}

export function	deleteItem(id){
	return axios.delete("/testapi.json/" + id);
}



  /*
  http://192.168.50.21:8082/users/login
  http://rap2api.taobao.org/app/mock/177373/userInfo

export function getUsers(userInfo){

  return axios.post('http://192.168.50.21:8082/users/login',{
    username: userInfo.account,
    password: userInfo.password
  },

  {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }

  )
}
   */



async function getUsers (url, params = {}) {
    let data = new URLSearchParams()
    for(let key in params) {
        data.append(params[key])
    }
    const res = await axios.post(url, data)

    // 处理数据
    
    return res.data
}

export default getUsers('http://192.168.50.21:8082/users/login',{ username: userInfo.account,password: userInfo.password})