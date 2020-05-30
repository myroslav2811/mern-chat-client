import React, { useContext } from 'react';
import { AuthContext } from '../../Context/Auth'
import Moment from 'react-moment';
import { dateFormat } from '../../helper';
import classNames from 'classnames';

import './Message.css'

export const Message = ({ text, createdAt, author }) => {

    const { user } = useContext(AuthContext);

    const classes = classNames('message', {
        'myMessage': user._id === author,
    })

    return (
        <p className={classes} >
            <span className='messageText'>{text}</span>
            <span className='messageDate'><Moment date={createdAt} format={dateFormat(createdAt)} /></span>
        </p >
    )
}