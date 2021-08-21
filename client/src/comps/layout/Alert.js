import React from 'react';
import { connect, useSelector } from 'react-redux';

const Alert = () => {
  let alerts = useSelector(state => state.alert)
  return (
    alerts !== null && alerts.length > 0 && alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>

    ))
  )
}



export default Alert