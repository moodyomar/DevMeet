import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link
} from "react-router-dom";
import { logout } from '../../actions/auth';


const Navbar = () => {
  let auth = useSelector(state => state.auth)
  let dispatch = useDispatch()
  let { isAuthenticated, loading } = auth;
  const authLinks = (
    <ul>
      <li><Link to="/dashboard">
        <i className="fas fa-user"></i>{' '}
        <span className="hide-sm">Dashboard</span></Link></li>
      <li onClick={() => dispatch(logout())}>
        <i className="fas fa-sign-out-alt"></i>{' '}
        <span className="hide-sm">Logout</span>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li><Link to="#!">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )
  return (

    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevMeet</Link>
      </h1>
      {!loading && (<>{isAuthenticated ? authLinks : guestLinks}</>)}
    </nav>

  )
}

export default Navbar