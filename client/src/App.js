import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// comps
import Landing from './comps/layout/Landing';
import Navbar from './comps/layout/Navbar';
import Routes from './comps/routing/Routes';
import Footer from './comps/layout/Footer';
// redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// css
import './App.css';
import "react-toastify/dist/ReactToastify.css";


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
          <header>
          <Navbar />
          </header>
          <main>
          <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes}/>
          </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
          <ToastContainer position="bottom-left" />
        </Router>
      </Provider>
    </>
  )
}

export default App;
