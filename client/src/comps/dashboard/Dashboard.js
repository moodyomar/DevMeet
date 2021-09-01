import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';

import Spinner from '../layout/Spinner';
import Education from './Education';



const Dashboard = () => {
  let { user } = useSelector(state => state.auth);
  let { profile, loading } = useSelector(state => state.profile);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile())
  },[dispatch])

  return loading && profile === null ? <Spinner /> : <>
    <h1 className="large text-primary" data-aos="fade-right">Dashboard</h1>
    <p className="lead" data-aos="fade-in" data-aos-duration="2000"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
    {profile !== null ? (
    <>
    <DashboardActions />
    <Experience experience={profile.experience} />
    <Education education={profile.education} />
    <div className="my-2">
      <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
        <i className="fas fa-user-minus"> Delete My Account</i>
      </button>
    </div>
    </>
    ) : (
    <>
    <p>You have not yet setup a profile, Please add some info</p>
    <Link to="/create-profile" className="btn btn-primary my-1">
      Create Profile
    </Link>
    </>
    )}
  </>
}

export default Dashboard