import { useEffect } from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Landing from './comps/layout/Landing';
import Navbar from './comps/layout/Navbar';
import Login from './comps/auth/Login';
import Alert from './comps/layout/Alert';
import Register from './comps/auth/Register';
import Dashboard from './comps/dashboard/Dashboard';
import CreateProfile from './comps/profile-forms/CreateProfile';
import PrivateRoute from './comps/routing/PrivateRoute';
// redux
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
},[]);

  return (
  <>
  <Provider store={store}>
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute  path="/dashboard" component={Dashboard} />
          <PrivateRoute  path="/create-profile" component={CreateProfile} />
        </Switch>
      </section>
    </Router>
    </Provider>
  </>
)}

export default App;
