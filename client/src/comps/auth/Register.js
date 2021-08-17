import React, { useState } from 'react';
import {
  Link
} from "react-router-dom";
import {API_URL} from '../auth/api';

import axios from 'axios';


const Register = () => { 

  let [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });

  const {name,email,password,password2} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async(e) => {
    e.preventDefault();
    if(password !== password2){
      console.log("Password doesn't match");
    }else{
      const newUser ={
        name,
        email,
        password
      }

      try { 
        const config ={
          headers:{
            'Content-type':'application/json'
          }
        }
        const body = JSON.stringify(newUser);
        const res = await axios.post(`${API_URL}/api/users`,body,config);
        console.log(res.data);
        
      } catch (error) {
        console.error(error)

      }
    }
  }


return(

<>
<h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
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
        <div className="form-group">
          <input
            type="password"
            value={password2} onChange={e => onChange(e)} required
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn bg-dark" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
</>

)
}

export default Register