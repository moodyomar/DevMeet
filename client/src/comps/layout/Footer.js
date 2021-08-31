import React from 'react';
import '../styling/Footer.css'
import {Link} from "react-router-dom";

const Footer = () => {

  return (

    <footer className="footer-distributed">

			<div className="footer-left">

				<h3>Dev<span>Meet</span></h3>

				<p className="footer-links">
					<Link to="/">Home</Link>
					{' '} | {' '}
					<Link to="/developers">Developers</Link>
					{' '} | {' '}
					<Link to="/login">Login</Link>
					{' '} | {' '}
					<Link to="/register">Register</Link>
				</p>

				<p className="footer-company-name">DevMeet &copy; 2021</p>
			</div>

			<div className="footer-center">

				<div className="icon-row">
					<i className="fa fa-map-marker"></i>
					<p><span>21 McLovin Street</span> Haifa, Israel</p>
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

					<a href="#"><i className="fa fa-facebook"></i></a>
					<a href="#"><i className="fa fa-twitter"></i></a>
					<a href="#"><i className="fa fa-linkedin"></i></a>
					<a href="#"><i className="fa fa-github"></i></a>

				</div>

			</div>

		</footer>

  )
}

export default Footer