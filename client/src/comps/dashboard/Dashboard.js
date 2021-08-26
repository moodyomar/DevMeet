import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import DashboardActions from './DashboardActions';

import Spinner from '../layout/Spinner';



const Dashboard = () => {
  let { user } = useSelector(state => state.auth);
  let { profile, loading } = useSelector(state => state.profile);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile())
  },[dispatch])

  return loading && profile === null ? <Spinner /> : <>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
    {profile !== null ? (
    <>
    <DashboardActions />
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