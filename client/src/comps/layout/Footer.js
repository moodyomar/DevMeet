import React from 'react';
import '../styles/Footer.css'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Footer = () => {

  let { isAuthenticated, loading } = useSelector(state => state.auth)
  const authLinks = (
    <ul>
      <li><Link to="/profiles">
       Developers</Link></li>
      <li><Link to="/posts">
        Posts</Link></li>
      <li><Link to="/dashboard">
        Dashboard</Link></li>
    </ul>
   
  )

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">
       Developers</Link></li>
      <li><Link to="/register">
        Register</Link></li>
      <li><Link to="/login">
        Login</Link></li>
    </ul>
  )

  return (

    <footer className="footer-distributed">

      <div className="footer-left">

        <h3>Dev<span>Meet</span></h3>

        <ul className="footer-links">
          {!loading && (<>{isAuthenticated ? authLinks : guestLinks}</>)}

        </ul>

        <p className="footer-company-name">DevMeet &copy; 2021</p>
      </div>

      <div className="footer-center">

        <div className="icon-row">
          <i className="fa fa-map-marker"></i>
          <p><span>21 McMoody Street</span> Haifa, Israel</p>
        </div>

        <div className="icon-row">
          <i className="fa fa-phone"></i>
          <p>+972 04 123456</p>
        </div>

        <div className="icon-row">
          <i className="fa fa-envelope"></i>
          <p><a href="mailto:support@company.com">contact@devmeet.com</a></p>
        </div>

      </div>

      <div className="footer-right">

        <p className="footer-company-about">
          <span>About the company</span>
          DevMeet is a social platform for web developers, graphic designers, web designers &amp; DevOps.
        </p>

        <div className="footer-icons">

          <a href="https://www.facebook.com/Moodyomar"><i className="fa fa-facebook"></i></a>
          <a href="https://twitter.com/moodyomarz"><i className="fa fa-twitter"></i></a>
          <a href="https://il.linkedin.com/in/moodyomar"><i className="fa fa-linkedin"></i></a>
          <a href="https://github.com/moodyomar"><i className="fa fa-github"></i></a>

        </div>

      </div>

    </footer>

  )
}

export default Footer