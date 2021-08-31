import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from './comps/layout/Landing';
import Navbar from './comps/layout/Navbar';
import Routes from './comps/routing/Routes';

// redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';


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
          <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes}/>
          </Switch>
        </Router>
      </Provider>
    </>
  )
}

export default App;
