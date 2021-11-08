import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../actions/profile';

import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(state => state.profile)
  let [status,setStatus] = useState('');
  let [skills,setSkills] = useState([]);
  let [sorting,setSorting] = useState({
  a:-1,
  b:1
});

  useEffect(() => {
    dispatch(getProfiles())

  }, [dispatch,status,skills]);

  const sortBy = (a,b) => Number(a.date.replace( /^\D+/g, '')) < Number(b.date.replace( /^\D+/g, '')) ? sorting.a : sorting.b

  const onChange = e => {
    if(e.target.checked) setSkills([...skills,e.target.name.toUpperCase()]);
    else setSkills(skills.filter(s => s !== e.target.name.toUpperCase()))
    
  }

  return (

    <>
      {loading ? <Spinner /> : 
      <>
        <h1 className="large text-primary" data-aos="fade-right">Developers</h1>
        <p className="lead" data-aos="fade-in" data-aos-duration="2000">
          <i className="fab fa-connectdevelop"></i> Browse and connect with developers
        </p>
        <div className="searchNdFilter form my-1">
        <input className="my-1" type="text" placeholder="Search By Developer Position or Name" onChange={e => setStatus(e.target.value)} />
        <select onChange={e => {
          e.target.value === 'recently-joined' ? setSorting({a:-1,b:1}) : setSorting({a:1,b:-1})
        }}>
          <option value="recently-joined">Recently Joined</option>
          <option value="first-joined">First Joined</option>
        </select>
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
        <div className="profiles">
          {profiles.length > 0 ? (
            profiles
            .filter(profile => !status ? profile : profile.status.toLowerCase().includes(status.toLowerCase()) || 
            profile.user.name.toLowerCase().includes(status.toLowerCase()) )
            .sort((a,b) => sortBy(a,b))
            .filter(profile => skills.length < 1 ? profile : profile.skills.some(r => skills.includes(r.toUpperCase())))
            .map(profile => (
              <ProfileItem key={profile._id} profile={profile}/>
            ))
          ) : <h4>No profiles found ....</h4>}
        </div>
      </>}
    </>

  )
}

export default Profiles