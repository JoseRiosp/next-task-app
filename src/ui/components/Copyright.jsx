import React, { useState } from 'react';
//Material MUI Components

import { Link } from '@mui/material';
import { Typography } from '@mui/material';

const Copyright = () => {
 const [date, setDate] = useState('');
 setDate(new Date().getFullYear())
  return (
    <Typography variant='body2' color='GrayText' align='center'>
        {'Copyright (c)'}
        <Link color='inherit' href='https://github.com/JoseRiosp' >
        JoseRiosP</Link>
        { '' }
        {date}
    </Typography>
  )
}

export default Copyright
