import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../actions/profile';

import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(state => state.profile)
  let [status,setStatus] = useState('')
  let [sorting,setSorting] = useState({
  a:1,
  b:-1
})

  useEffect(() => {
    dispatch(getProfiles())
    console.log(status);
    
  }, [dispatch,status]);

console.log(profiles);


  return (

    <>
      {loading ? <Spinner /> : 
      <>
        <h1 className="large text-primary" data-aos="fade-right">Developers</h1>
        <p className="lead" data-aos="fade-in" data-aos-duration="2000">
          <i className="fab fa-connectdevelop"></i> Browse and connect with developers
        </p>
        <div className="searchNdFilter form my-1">
        <input type="text" placeholder="Search By Position Junior Developer..." onChange={e => setStatus(e.target.value)} />
        <select name="" id="">
          <option value="recently-joined">Recently Joined</option>
          <option value="first-joined">First Joined</option>
        </select>
        </div>
        <div className="profiles">
          {profiles.length > 0 ? (
            profiles
            .filter(profile => !status ? profile : profile.status.toLowerCase().includes(status.toLowerCase()))
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