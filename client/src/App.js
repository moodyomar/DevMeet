import './App.css';
import Landing from './comps/layout/Landing';
import Navbar from './comps/layout/Navbar';
import Login from './comps/auth/Login';
import Register from './comps/auth/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => (
  <>
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>

    </Router>
  </>
)

export default App;
