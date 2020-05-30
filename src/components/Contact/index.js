import React, { useContext } from 'react';
import Moment from 'react-moment';
import classNames from 'classnames';

import './Contact.css';
import { DialogContext } from '../../Context/Dialogs';
import { dateFormat } from '../../helper';

export const Contact = ({ item, userId, username, lastMessage, updatedAt, isSearching, avatar }) => {

    const { createDialog, chooseDialog, dialog } = useContext(DialogContext);

    const handleChoose = () => {
        chooseDialog(item);
    }
    const handleCreate = () => {
        createDialog(userId)
    }

    const classes = classNames('contact', {
        'selectedContact': !isSearching && dialog && dialog._id === item._id
    })

    return (
        <div className={classes} onClick={isSearching ? handleCreate : handleChoose} >
            <div className='contactAvatar' >
                <p className='contactAvatar' style={{ backgroundColor: avatar }}>{username[0]}</p>
            </div>
            <div className='contactContent'>
                {isSearching
                    ? <p className='contactUsername'>{username}</p>
                    : <><p className='contactUsername'>{username}</p>
                        <p className='lastMessage'>{lastMessage ? lastMessage.text : 'No messages...'}</p>
                        <p className='contactDate'><Moment date={updatedAt} fromNowDuring={300000} format={dateFormat(updatedAt)} /></p>
                    </>}
            </div>
        </div >
    );
}