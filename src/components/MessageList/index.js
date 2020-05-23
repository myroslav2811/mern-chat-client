import React, { useContext, useRef, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { MessagesContext } from '../../Context/Messages';
import { DialogContext } from '../../Context/Dialogs'
import { EmptyComponent } from '../EmptyComponent';
import { Loading } from '../Loading';
import { Message } from '../Message';
import './MessageList.css'

export const MessageList = () => {

    const { messages, isLoading, getMessages } = useContext(MessagesContext);
    const { dialog } = useContext(DialogContext);
    const [flag, setFlag] = useState(true)

    const scrollbar = useRef()

    useEffect(() => {
        setFlag(true);
    }, [messages])

    useEffect(() => {
        if (dialog) {
            getMessages(dialog._id);
        }
        // eslint-disable-next-line
    }, [dialog])

    const handleUpdate = (e) => {
        if (flag) {
            scrollbar.current.scrollToBottom();
            setFlag(false);
        }
    }

    return (
        <div className='messagesContainer'>
            {isLoading
                ? <Loading />
                : <Scrollbars autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    ref={scrollbar}
                    onUpdate={handleUpdate}
                    renderTrackHorizontal={props => <div {...props} style={{ display: 'none' }}
                    />}>
                    <div className='messagesContainer'>
                        {messages.length
                            ? messages.map(item => <Message key={item._id}
                                text={item.text}
                                author={item.author}
                                createdAt={item.createdAt} />)
                            : <EmptyComponent text='There are no messages yet' />}
                    </div>
                </Scrollbars>}
        </div>
    );
}