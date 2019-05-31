
export default function(state = [], action){

	switch( action.type ){
		case "GET_CONFLIST":
		return action.configListData;
    debugger
		default :
			return state;
  }
}
