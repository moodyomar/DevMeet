import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addExperience } from '../../actions/profile';


const AddExperience = () => { 

  const dispatch = useDispatch();
  const history = useHistory();
  const [formData,setFormData] = useState({
    comapny:'',
    title:'',
    location:'',
    from:'',
    to:'',
    current:false,
    description:''
  });
  const [toDateDisabled,toggleDisabled] = useState(false);
  const {company,title,location,from,to,current,description} = formData;

  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});

return(
<>
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        dispatch(addExperience(formData,history))
      } }>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required value={title} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => onChange(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" value="" checked={current} value={current} onChange={e => {
            setFormData({...formData,current: !current});
            toggleDisabled(!toDateDisabled);
          }} /> {' '}Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
</>

)
}

export default AddExperience