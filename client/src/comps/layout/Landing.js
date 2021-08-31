import React from 'react';
import { useSelector } from 'react-redux';
import {
  Link, Redirect
} from "react-router-dom";

const Landing = () => { 
const {isAuthenticated} = useSelector(state => state.auth);

if(isAuthenticated){
  return <Redirect to="/dashboard"/>
}

return(
  <section className="landing">
  <div className="dark-overlay">
    <div className="landing-inner">
      <h1 className="x-large" data-aos="flip-up" data-aos-duration="800">Social Network <span>4</span> Developers</h1>
      <p className="lead" data-aos="fade-in" data-aos-duration="1100">
        Create a developer profile/portfolio, share posts and get help from
        other developers
      </p>
      <div className="buttons">
        <Link to="/register" className="btn btn-primary" data-aos="fade-up"
data-aos-anchor-placement="top-bottom" data-aos-duration="1400">Sign Up</Link>
        <Link to="/login" className="btn btn-light" data-aos="fade-up"
data-aos-anchor-placement="top-bottom" data-aos-duration="1400">Login</Link>
      </div>
    </div>
  </div>
</section>


)
}

export default Landing