import React, { createContext, useReducer } from 'react';
import axios from '../../services/axios';
import { socket } from '../../services/socket';
import { DialogsReducer, initialValue } from './DialogsReducer';
import { SET_DIALOGS, SET_FILTERED, SET_DIALOG, SET_RECEIVER, SET_IS_LOADING, ADD_DIALOG } from '../types';

export const DialogContext = createContext();

export const Dialog = ({ children }) => {

    const [state, dispatch] = useReducer(DialogsReducer, initialValue);
    const { dialogs, filtered, dialog, receiver, isLoading } = state

    const getDialogs = () => {
        dispatch({ type: SET_IS_LOADING, payload: true });
        axios.get('/dialogs')
            .then(res => {
                dispatch({ type: SET_DIALOGS, payload: res.data });
                dispatch({ type: SET_FILTERED, payload: res.data });
                dispatch({ type: SET_IS_LOADING, payload: false });
            })
            .catch(err => {
                dispatch({ type: SET_IS_LOADING, payload: false });
                console.log(err);
            })
    }

    const chooseDialog = (item) => {
        dispatch({ type: SET_DIALOG, payload: item });
        dispatch({ type: SET_RECEIVER, payload: item.to });
    }

    const filterDialogs = (value) => {
        const pattern = new RegExp(value, 'i');
        const items = dialogs.filter(item => pattern.test(item.to.username))
        dispatch({ type: SET_FILTERED, payload: items });
    }

    const createDialog = (id) => {
        axios.post('/create-dialog', { id })
            .then(res => {
                if (dialog)
                    socket.emit('leave', dialog._id);
                console.log(res.data);
                const items = dialogs.filter(item => item._id === res.data._id);
                if (!items[0]) {
                    dispatch({ type: SET_DIALOGS, payload: [res.data, ...dialogs] });
                    dispatch({ type: SET_FILTERED, payload: [res.data, ...filtered] });
                }
                dispatch({ type: SET_DIALOG, payload: res.data });
                socket.emit('join', res.data._id);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const updateDialog = (dialog) => {
        dispatch({ type: ADD_DIALOG, payload: dialog });
    }

    return (
        <DialogContext.Provider value={{ getDialogs, updateDialog, chooseDialog, createDialog, dialogs, dialog, filtered, filterDialogs, receiver, isLoading }}>
            {children}
        </DialogContext.Provider>
    );
}