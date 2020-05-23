import React, { useContext } from 'react';
import Moment from 'react-moment';

import './Contact.css';
import { DialogContext } from '../../Context/Dialogs';
import { SocketContext } from '../../Context/Socket';
import { dateFormat } from '../../helper';

export const Contact = ({ item, userId, username, lastMessage, updatedAt, isSearching, avatar }) => {

    const { createDialog, chooseDialog, dialog } = useContext(DialogContext);
    const { socket } = useContext(SocketContext);

    const handleChoose = () => {
        chooseDialog(item);
        socket.emit('join', item._id);
    }
    const handleCreate = () => {
        createDialog(userId)
    }


    return (
        <div className='contact' onClick={isSearching ? handleCreate : handleChoose} style={!isSearching && dialog && dialog._id === item._id ? { backgroundColor: 'gray' } : null} >
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