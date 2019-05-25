
export default function(state = [], action){

	switch( action.type ){

		case "SET_TEST":
    console.log(state);
			return action.data;

		default :
			return state;
  }
}
