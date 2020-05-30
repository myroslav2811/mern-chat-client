import axios from './axios';
import { socket } from './socket';

export const getAllDialogs = () => {
    return axios.get('/dialogs')
        .then(res => res.data);
}

export const createNewDialog = (id, dialog, dialogs, filtered) => {
    if (dialog)
        socket.emit('leave', dialog._id);
    return axios.post('/create-dialog', { id })
        .then(res => {
            const newDialog = res.data;
            const items = dialogs.filter(item => item._id !== newDialog._id);
            const filteredItems = filtered.filter(item => item._id !== newDialog._id);
            socket.emit('join', newDialog._id);
            return [newDialog, [newDialog, ...items], [newDialog, ...filteredItems]];
        })
}

export const getFilteredDialogs = (value, dialogs) => {
    const pattern = new RegExp(value, 'i');
    return dialogs.filter(item => pattern.test(item.to.username))
}
