import React from 'react';
import {Switch,Route} from "react-router-dom";
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import PrivateRoute from '../routing/PrivateRoute';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import AutoScrollUp from '../routing/AutoScrollUp'

const Routes = () => { 

return(

  <section className="container">
<AutoScrollUp>
  <Switch>
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/profiles" component={Profiles} />
    <Route exact path="/profile/:id" component={Profile} />
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <PrivateRoute exact path="/create-profile" component={ProfileForm} />
    <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
    <PrivateRoute exact path="/add-experience" component={AddExperience} />
    <PrivateRoute exact path="/add-education" component={AddEducation} />
    <PrivateRoute exact path="/posts" component={Posts} />
    <PrivateRoute exact path="/posts/:id" component={Post} />
    <Route path="*" component={NotFound} />
  </Switch>
  </AutoScrollUp>
</section>

)
}

export default Routes