
const initialState = {
  toPath: ''
}
const Login_Redirect_Event = 'Login_Redirect_Event'
const loginRedirectPath = (state = initialState, action) => {
  if(action.type === Login_Redirect_Event) {
    return Object.assign({}, state, {
      toPath: action.toPath
    })
  }
  return state;
}

export default loginRedirectPath