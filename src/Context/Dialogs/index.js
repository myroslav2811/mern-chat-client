import React, { createContext, useReducer } from 'react';
import { getAllDialogs, createNewDialog, getFilteredDialogs } from '../../services/dialogs';
import { DialogsReducer, initialValue } from './DialogsReducer';
import { socket } from '../../services/socket';
import { SET_DIALOGS, SET_FILTERED, SET_DIALOG, SET_RECEIVER, SET_IS_LOADING, ADD_DIALOG } from '../types';

export const DialogContext = createContext();

export const Dialog = ({ children }) => {

    const [state, dispatch] = useReducer(DialogsReducer, initialValue);
    const { dialogs, filtered, dialog, receiver, isLoading } = state

    const getDialogs = () => {
        dispatch({ type: SET_IS_LOADING, payload: true });
        getAllDialogs()
            .then(dialogs => {
                dispatch({ type: SET_DIALOGS, payload: dialogs });
                dispatch({ type: SET_FILTERED, payload: dialogs });
            })
            .then(res => dispatch({ type: SET_IS_LOADING, payload: false }))
            .catch(err => dispatch({ type: SET_IS_LOADING, payload: false }))
    }

    const chooseDialog = (item) => {
        if (dialog) {
            socket.emit('leave', dialog._id);
        }
        dispatch({ type: SET_DIALOG, payload: item });
        dispatch({ type: SET_RECEIVER, payload: item.to });
        socket.emit('join', item._id);
    }

    const filterDialogs = (value) => {
        dispatch({ type: SET_FILTERED, payload: getFilteredDialogs(value, dialogs) });
    }

    const createDialog = (id) => {
        createNewDialog(id, dialog, dialogs, filtered)
            .then(([newDialog, items, filteredItems]) => {
                dispatch({ type: SET_DIALOGS, payload: items });
                dispatch({ type: SET_FILTERED, payload: filteredItems });
                dispatch({ type: SET_DIALOG, payload: newDialog });
                dispatch({ type: SET_RECEIVER, payload: newDialog.to }); 
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