import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from './comps/layout/Landing';
import Navbar from './comps/layout/Navbar';
import Login from './comps/auth/Login';
import Alert from './comps/layout/Alert';
import Register from './comps/auth/Register';
import Dashboard from './comps/dashboard/Dashboard';
import ProfileForm from './comps/profile-forms/ProfileForm';
import PrivateRoute from './comps/routing/PrivateRoute';
// redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import AddExperience from './comps/profile-forms/AddExperience';
import AddEducation from './comps/profile-forms/AddEducation';
import Profiles from './comps/profiles/Profiles';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

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
              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={ProfileForm} />
              <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
          </section>
        </Router>
      </Provider>
    </>
  )
}

export default App;
