import React, { createContext, useReducer } from 'react';
import { getAllMessages } from '../../services/messages';
import { MessagesReducer, initialValue } from './MessagesReducer';
import { GET_MESSAGES, PUSH_NEW_MESSAGE, SET_IS_LOADING } from '../types'

export const MessagesContext = createContext();

export const Messages = ({ children }) => {
    const [state, dispatch] = useReducer(MessagesReducer, initialValue);
    const { messages, isLoading } = state;

    const getMessages = (id) => {
        dispatch({ type: SET_IS_LOADING, payload: true });
        getAllMessages(id)
            .then(items => {
                dispatch({ type: GET_MESSAGES, payload: items });
                dispatch({ type: SET_IS_LOADING, payload: false });
            })
            .catch(() => {
                dispatch({ type: SET_IS_LOADING, payload: false });
            })
    }

    const pushNewMessage = (message) => {
        dispatch({ type: PUSH_NEW_MESSAGE, payload: message });
    }


    return (
        <MessagesContext.Provider value={{ messages, isLoading, getMessages, pushNewMessage }}>
            {children}
        </MessagesContext.Provider>
    );
}