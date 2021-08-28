import React from 'react';


const ProfileAbout = ({profile:{
  bio,
  skills,
  user:{name}
}}) => (

<div className="profile-about bg-light p-2">
{ bio && (
  <>
  <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>
            {bio}
          </p>
          </>
          )}
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {skills.map((skill,idx) => <div key={idx} className="p-1">
        <i className="fas fa-check"></i> {skill}
            </div> )}
          </div>
        </div>

)

export default ProfileAbout