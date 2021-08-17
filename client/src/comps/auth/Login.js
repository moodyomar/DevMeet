import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";
import {API_URL} from '../auth/api';
import axios from 'axios';



const Login = () => { 

  let [formData,setFormData] = useState({
    email:'',
    password:'',
  });

  const {email,password} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async(e) => {
    e.preventDefault();
    console.log('SUCCESS');
    }

return(

<>
<h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
       
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} onChange={e => onChange(e)} required
            minLength="6"
          />
        </div>
       
        <input type="submit" className="btn bg-dark" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
</>

)
}

export default Login