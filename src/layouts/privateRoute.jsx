import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Login from "layouts/Login.jsx";
import store from "../store.js";

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: window.sessionStorage.getItem("userId") != null ? true: false
        }
    }
    componentWillMount() {
        const {history} = this.props;
        if(!this.state.isAuthenticated){
          history.replace("/login");
        }else{
          /*
           let tempUrl = this.props.location.pathname
          store.dispatch({
             type: 'Login_Redirect_Event',
             toPath: tempUrl   
          })
           */ 
          history.replace("/admin/dashboard");
        }
    }

    render() {
        let { component: Component, ...rest} = this.props;
        return  this.state.isAuthenticated ?
        (<Route {...rest} render={(props) => ( <Component {...props} />
            )}/> ) : (<p style = {{"width": "100%", "textAlign": "center", "fontSize": "20px", "lineHeight": "50px"}}>请登录...</p>)

    }
}

export default withRouter(PrivateRoute);
