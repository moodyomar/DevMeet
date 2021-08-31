import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const AutoScrollUp = ({ children }) => {
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

export default AutoScrollUp;
