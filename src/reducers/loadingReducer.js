
export default function(state = {count:0,isDisabled:false}, action){


	switch( action.type ){

		case "LOADING_START":
				var newState = Object.assign({},state);
				newState.count++;
			return newState;

		case "LOADING_STOP":
				var newState = Object.assign({},state);
				newState.count--;
			return newState;

		case "LOADING_DISABLE": //暂停loading layer的功能
				var newState = Object.assign({},state);
				newState.isDisabled = true;
			return newState;

		case "LOADING_ENABLE": //开启loading layer的功能
				var newState = Object.assign({},state);
				newState.isDisabled = false;
			return newState;

		default :

			return state;
	}
}
