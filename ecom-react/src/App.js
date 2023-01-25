import React from 'react';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import MasterLayout from './assets/layouts/admin/MasterLayout';
import Home from './assets/components/frontend/Home';
import Login from './assets/components/frontend/auth/Login';
import Register from './assets/components/frontend/auth/Register';
import AdminPrivateRoute from './AdminPrivateRoute';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/ecom-lara-react/ecom-lara/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
  let token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? "Bearer " +`${token}` : '';
  return config;
});


let App = () => {
  return (
    <div className="App">
        <Router>
	       <Switch>
	            <Route exact path="/" component = {Home} />
              <Route path = "/login">
                { localStorage.getItem('auth_token')?<Redirect to="/" />:<Login/>}
              </Route>
              {/*<Route path="/login" component = {Login} /> */}
              <Route path = "/register">
                { localStorage.getItem('auth_token')?<Redirect to="/" />:<Register/>}
              </Route>
             {/* <Route path="/register" component = {Register} /> */}
	            // <Route path="/admin" name="Admin" render={(props)=><MasterLayout {...props} />} />
              <AdminPrivateRoute path="/admin" name="Admin" />
	        </Switch>
        </Router>
    </div>
  );
}

export default App;
