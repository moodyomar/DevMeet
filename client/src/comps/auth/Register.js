import React, {useState } from 'react';
import {connect} from 'react-redux';
import { toast } from "react-toastify";
import { Link, Redirect} from "react-router-dom";
import {register} from '../../actions/auth';
import PropTypes from 'prop-types'



const Register = ({register,isAuthenticated}) => { 
// const dispatch = useDispatch();

  let [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });
  const {name,email,password,password2} = formData;

let [unvalidName,setUnvalidName] = useState(false);
let [unvalidEmail,setUnvalidEmail] = useState(false);
let [unvalidPass,setUnvalidPass] = useState(false);



  const onChange = e => {
    switch (e.target.name) {
      case 'email':
        (e.target.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) ?
        setUnvalidEmail(false) : setUnvalidEmail(true)
        break;
      case 'name':
        (e.target.value.match(/([A-Za-z])\w+/g)) ?
        setUnvalidName(false) : setUnvalidName(true)
        break;
        
      case 'password':
        (e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) ?
        setUnvalidPass(false) : setUnvalidPass(true)
        break;
        
      default:
        break;
    }

    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    if(unvalidEmail || unvalidName || unvalidPass !== false) toast.warning("Please Make sure you entered valid and strong credintals");
    else register({name,email,password});
  }

  if(isAuthenticated) return <Redirect to="/dashboard"/>
return(

<>
<h1 className="large text-primary" data-aos="fade-right">Sign Up</h1>
      <p className="lead" data-aos="fade-in" data-aos-duration="2000"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Full Name" name="name" value={name} onChange={e => onChange(e)}  />
          {unvalidName && <span style={{color:'red'}}>Enter min 2 charts name</span>}
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)}  />
          {unvalidEmail && <span style={{color:'red'}}>Enter a valid email</span>}
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
            value={password} onChange={e => onChange(e)} />
            {unvalidPass && <span style={{color:'red'}}>Let's avoid hackers, Password must be 8 chars, at least one letter, one number and one special character</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password2} onChange={e => onChange(e)} 
            placeholder="Confirm Password"
            name="password2"/>
            {password !== password2 && <span style={{color:'red'}}>Please make sure you type the same password above!</span>}
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
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps,{register})(Register)