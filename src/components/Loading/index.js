import React from 'react';
import { CircularProgress } from '@material-ui/core/'

import './Loading.css'

export const Loading = ({ size = '40px' }) => {
    return (
        <div className='spinnerStyle' >
            <CircularProgress size={size} />
        </div>
    );
}