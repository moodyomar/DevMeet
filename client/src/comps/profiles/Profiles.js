import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../actions/profile';

import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector(state => state.profile)

  useEffect(() => {
    dispatch(getProfiles())
  }, [dispatch]);

  return (

    <>
      {loading ? <Spinner /> : 
      <>
        <h1 className="large text-primary" data-aos="fade-right">Developers</h1>
        <p className="lead" data-aos="fade-in" data-aos-duration="2000">
          <i className="fab fa-connectdevelop"></i> Browse and connect with developers
        </p>
        <div className="profiles">
          {profiles.length > 0 ? (
            profiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile}/>
            ))
          ) : <h4>No profiles found ....</h4>}
        </div>
      </>}
    </>

  )
}

export default Profiles