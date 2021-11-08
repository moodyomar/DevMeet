import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './profileEducation';
import ProfileGithub from './ProfileGithub';
import '../styles/Profiles.css'


const Profile = ({ match }) => {

  const { profile: { profile, loading }, auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [match.params.id, dispatch])

  return (

    <>
      {profile === null || loading ? (<>
      <h4 className="text-center">if it's still loading then the user has not created a profile...</h4>
      <Spinner />
      </>) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          {auth.isAuthenticated && !auth.loading
            && auth.user._id === profile.user._id
            && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map(experience => (
                    <ProfileExperience
                      key={experience._id} experience={experience} />
                  ))}
                </>
              ) : (<h4>No Experience Credentials</h4>)}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map(education => (
                    <ProfileEducation
                      key={education._id} education={education} />
                  ))}
                </>
              ) : (<h4>No Education Credentials</h4>)}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>

  );
};

export default Profile