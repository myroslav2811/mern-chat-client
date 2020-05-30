import React, { createContext, useContext, useEffect } from 'react';
import { socket } from '../../services/socket';
import { MessagesContext } from '../Messages'
import { DialogContext } from '../Dialogs'

export const SocketContext = createContext();

export const Socket = ({ children }) => {

    const { pushNewMessage } = useContext(MessagesContext)
    const { updateDialog } = useContext(DialogContext)

    useEffect(() => {
        socket.on('updateDialog', updateDialog);
        socket.on('newMessage', pushNewMessage);
        // eslint-disable-next-line
    }, [])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}