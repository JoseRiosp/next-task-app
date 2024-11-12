
import React from 'react';
//Material MUI Components

import { Typography } from '@mui/material';

const Copyright = () => {

  return (
    <Typography variant='body2' color='GrayText' align='center'>
        {'Copyright (c)'}
        {new Date().getFullYear()}
    </Typography>
  )
}

export default Copyright
