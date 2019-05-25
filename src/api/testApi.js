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
