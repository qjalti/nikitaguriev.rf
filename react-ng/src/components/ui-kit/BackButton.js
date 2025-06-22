import React from 'react';

import {useLocation, useNavigate} from 'react-router-dom';

import {
  Fab,
  Grow,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * BackButton
 * @return {JSX.Element}
 */
export const BackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  if (isHome) {
    return null;
  }
  return (
    <div>
      <Grow
        in
      >
        <Fab
          color={'primary'}
          aria-label={'back'}
          sx={{position: 'fixed', bottom: 16, right: 160}}
          onClick={() => {
            if (!window.history.length) {
              navigate('/');
            } else {
              navigate(-1);
            }
          }}
        >
          <ArrowBackIcon/>
        </Fab>
      </Grow>
    </div>
  );
};
