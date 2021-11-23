import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfiles } from '../../actions/profile';

import Spinner from '../layout/Spinner';
import ProfileItem from '../profiles/ProfileItem';

const Favorites = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(state => state.profile)
  const { user } = useSelector(state => state.auth)
  let [skills,setSkills] = useState([]);

  useEffect(() => {
    dispatch(getProfiles())
  }, [dispatch,skills,user]);

  const onChange = e => {
    if(e.target.checked) setSkills([...skills,e.target.name.toUpperCase()]);
    else setSkills(skills.filter(s => s !== e.target.name.toUpperCase()))
    
  }

  return (

    <>
      {loading ? <Spinner /> : 
      <>
        <h1 className="large text-primary" data-aos="fade-right">Favorites</h1>
        <p className="lead" data-aos="fade-in" data-aos-duration="2000">
          <i className="fab fa-connectdevelop"></i> Developers that I'm following
        </p>
        <div className="searchNdFilter form my-1">
        <div className="filterBySkillWrapper">
        <label className="skills-filtering-label">Only who knows : </label>

        <div className="checkbox">
        <input type="checkbox" name="CSS" onChange={e => onChange(e)}/>
        <label  style={{marginLeft:'5px'}}>CSS</label>
        </div>
        
        <div className="checkbox">
        <input type="checkbox" name="Javascript" onChange={e => onChange(e)}/>
        <label  style={{marginLeft:'5px'}}>JS</label>
        </div>
        
        <div className="checkbox">
        <input type="checkbox" name="Python" onChange={e => onChange(e)}/>
        <label  style={{marginLeft:'5px'}}>Python</label>
        </div>
        
        <div className="checkbox">
        <input type="checkbox" name="PHP" onChange={e => onChange(e)}/>
        <label  style={{marginLeft:'5px'}}>PHP</label>
        </div>
        
        <div className="checkbox">
        <input type="checkbox" name="Java" onChange={e => onChange(e)}/>
        <label  style={{marginLeft:'5px'}}>Java</label>
        </div>
        
        </div>
        </div>
        <div className="profiles text-center">
          {profiles.length > 0 && user?.favorites?.length > 0 ? (
            profiles
            .filter(profile => user?.favorites?.includes(profile._id) )
            .filter(profile => skills.length < 1 ? profile : profile.skills.some(r => skills.includes(r.toUpperCase())))
            .map(profile => (
              <ProfileItem key={profile._id} profile={profile}/>
            ))
          ) : <h4 className=" my-3"><span className="lead">No profiles found.</span><br/>Looks like you haven't followed any developer yet ....</h4>
          }
                  <Link to="/profiles" className="btn btn-light"
          ><i className="fa icon-sm fa-users text-primary"></i> Developers</Link>
        </div>
      </>}
    </>

  )
}

export default Favorites