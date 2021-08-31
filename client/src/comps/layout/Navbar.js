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
      <li><Link to="/profiles"><i class="fa fa-users" aria-hidden="true"></i>{' '}
        <span className="hide-sm">Developers</span></Link></li>
      <li><Link to="/posts"><i class="fa fa-newspaper-o" aria-hidden="true"></i>{' '}
        <span className="hide-sm">Posts</span></Link></li>
      <li><Link to="/dashboard">
        <i className="fas fa-user"></i>{' '}
        <span className="hide-sm">Dashboard</span></Link></li>
      <li onClick={() => dispatch(logout())}><Link>
        <i className="fas fa-sign-out-alt"></i>{' '}
        <span className="hide-sm">Logout</span></Link>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li><Link to="/profiles"><i class="fa fa-users" aria-hidden="true"></i>{' '}
        <span className="hide-sm">Developers</span></Link></li>
      <li><Link to="/register"><i class="fa fa-user-plus" aria-hidden="true"></i>{' '}
        <span className="hide-sm">Register</span></Link></li>
      <li><Link to="/login"><i class="fa fa-sign-in" aria-hidden="true"></i>{' '}
        <span className="hide-sm">Login</span></Link></li>
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