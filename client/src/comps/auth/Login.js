import React, { useState } from 'react';
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../actions/auth';


const Login = () => { 
  let dispatch = useDispatch();
  let isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  let [formData,setFormData] = useState({
    email:'',
    password:'',
  });

  const {email,password} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = async(e) => {
    e.preventDefault();
    dispatch(login(email,password))
    }
    
    if(isAuthenticated) return <Redirect to="/dashboard"/>
    
return(

<>
<h1 className="large text-primary" data-aos="fade-right">Sign In</h1>
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

// Login.propTypes = {
//   login:PropTypes.func.isRequired,
//   isAuthenticated:PropTypes.bool,
// }

// const mapStateToProps = state => ({
//   isAuthenticated:state.auth.isAuthenticated
// })

export default Login
// export default connect(mapStateToProps,{login})(Login)