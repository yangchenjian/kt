import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createHashHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./layouts/privateRoute.jsx";


// core components
import Admin from "layouts/Admin.jsx";
import Login from "layouts/Login.jsx";

// import RTL from "layouts/RTL.jsx";

import "assets/css/material-dashboard-react.css?v=1.6.0";

import Util   from "./util/PageUtil";
import store  from "./store";

const hist = createHashHistory();

Util.initLoadingMethod();

ReactDOM.render(

  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {/*
          <PrivateRoute path="/admin" component={Admin} />
        <Route path="/admin" component={Admin} />
        */}
        <PrivateRoute path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")

);
      // <Route path="/rtl" component={RTL} />
