
export default function(state = [], action){

	switch( action.type ){

		case "SET_TEST":
		return action.data;
		default :
			return state;
  }
}
