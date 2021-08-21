import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Link, Redirect} from "react-router-dom";
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types'



const Register = ({setAlert,register,isAuthenticated}) => { 
// const dispatch = useDispatch();

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
      // 1st way
      setAlert("Password doesn't match",'danger');
      // 2nd way
      // dispatch(setAlert2("Password doesn't match",'danger'))
    }else{
      register({name,email,password})
    }
  }

  if(isAuthenticated) return <Redirect to="/dashboard"/>
return(

<>
<h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)}  />
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
            value={password} onChange={e => onChange(e)} 
            
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password2} onChange={e => onChange(e)} 
            placeholder="Confirm Password"
            name="password2"
            
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

Register.propTypes = {
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{setAlert,register})(Register)