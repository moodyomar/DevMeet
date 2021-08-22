import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {

  const {isAuthenticated,loading} = useSelector(state => state.auth);

  return (
    <Route {...rest} render={props => !isAuthenticated && !loading ?
      (<Redirect to='/login' />) :
      (<Component {...props} />)} />
  )
}


export default PrivateRoute