import React, { createContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../services/axios';
import { MessagesReducer, initialValue } from './MessagesReducer';
import { GET_MESSAGES, PUSH_NEW_MESSAGE, SET_IS_LOADING } from '../types'

export const MessagesContext = createContext();

export const Messages = ({ children }) => {
    const [state, dispatch] = useReducer(MessagesReducer, initialValue);

    const { messages, isLoading } = state;

    const history = useHistory();

    const getMessages = (id) => {
        dispatch({ type: SET_IS_LOADING, payload: true });
        axios.get(`/messages/${id}/`)
            .then(res => {
                dispatch({ type: GET_MESSAGES, payload: res.data });
                dispatch({ type: SET_IS_LOADING, payload: false });
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 400) {
                    history.push('/signin');
                }
                console.log(err.response);
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