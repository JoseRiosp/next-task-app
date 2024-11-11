import React from 'react';
//Material MUI Components

import { Link } from '@mui/material';
import { Typography } from '@mui/material';

const Copyright = () => {


  return (
    <Typography variant='body2' color='GrayText' align='center'>
        {'Copyright (c)'}
        <Link color='inherit' href='https://github.com/JoseRiosp' >
        JoseRiosP</Link>
        { '' }
        {new Date().getFullYear()}
    </Typography>
  )
}

export default Copyright
