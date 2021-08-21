import { useEffect } from 'react';
import {Provider} from 'react-redux';
import Landing from './comps/layout/Landing';
import Navbar from './comps/layout/Navbar';
import Login from './comps/auth/Login';
import Alert from './comps/layout/Alert';
import Register from './comps/auth/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
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
        </Switch>
      </section>
    </Router>
    </Provider>
  </>
)}

export default App;
