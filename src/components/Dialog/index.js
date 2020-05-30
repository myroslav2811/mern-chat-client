import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendRounded from '@material-ui/icons/SendRounded'

import { MessageList } from '../MessageList';
import { DialogContext } from '../../Context/Dialogs';
import { AuthContext } from '../../Context/Auth';
import { SocketContext } from '../../Context/Socket';
import './Dialog.css'
import { EmptyComponent } from '../EmptyComponent';

export const Dialog = () => {

    const [value, setValue] = useState('');
    const { dialog, receiver } = useContext(DialogContext);
    const { user } = useContext(AuthContext);
    const { socket } = useContext(SocketContext)



    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim()) {
            const message = {
                dialog: dialog._id,
                text: value.trim(),
                author: user._id,
                to: receiver._id
            }
            socket.emit('createMessage', message)
        }
        setValue('');
    }

    return (
        dialog
            ? <div className='dialog'>
                <div className='dialogHeader'>
                    <p>{receiver && receiver.username}</p>
                </div>
                <MessageList />
                <div className='dialogInput'>
                    <form onSubmit={handleSubmit}>
                        <TextField type="text"
                            value={value}
                            placeholder='Write message here...'
                            onChange={handleChange}
                            fullWidth
                            variant="outlined" />
                        <Button type='submit'>
                            <SendRounded fontSize='large' color='primary' />
                        </Button>
                    </form>
                </div>
            </div>
            : <EmptyComponent text='Choose dialog to start messaging' />
    );
}