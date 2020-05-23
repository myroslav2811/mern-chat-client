import React, { useContext } from 'react';
import { AuthContext } from '../../Context/Auth'
import Moment from 'react-moment';
import { dateFormat } from '../../helper';

import './Message.css'

export const Message = ({ text, createdAt, author }) => {

    const { user } = useContext(AuthContext);

    return (
        <p className='message' style={user._id === author ? { alignSelf: 'flex-end' } : null}>
            <span className='messageText'>{text}</span>
            <span className='messageDate'><Moment date={createdAt} format={dateFormat(createdAt)} /></span>
        </p>
    )
}