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
  a:-1,
  b:1
})

  useEffect(() => {
    dispatch(getProfiles())
    
  }, [dispatch,status]);

  const sortBy = (a,b) => Number(a.date.replace( /^\D+/g, '')) < Number(b.date.replace( /^\D+/g, '')) ? sorting.a : sorting.b


  return (

    <>
      {loading ? <Spinner /> : 
      <>
        <h1 className="large text-primary" data-aos="fade-right">Developers</h1>
        <p className="lead" data-aos="fade-in" data-aos-duration="2000">
          <i className="fab fa-connectdevelop"></i> Browse and connect with developers
        </p>
        <div className="searchNdFilter form my-1">
        <input className="my-1" type="text" placeholder="Search By Position : Senior Developer..." onChange={e => setStatus(e.target.value)} />
        <select onChange={e => {
          e.target.value === 'recently-joined' ? setSorting({a:-1,b:1}) : setSorting({a:1,b:-1})
        }}>
          <option value="recently-joined">Recently Joined</option>
          <option value="first-joined">First Joined</option>
        </select>
        </div>
        <div className="profiles">
          {profiles.length > 0 ? (
            profiles
            .filter(profile => !status ? profile : profile.status.toLowerCase().includes(status.toLowerCase()))
            .sort((a,b) => sortBy(a,b))
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