import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';


const Dashboard = (props) => { 
let auth = useSelector(state => state.auth);
let profile = useSelector(state => state.profile);
let dispatch = useDispatch();

  useEffect(() => {
  dispatch(getCurrentProfile())
},[])

return(

<div className=''>

</div>

)
}

export default Dashboard