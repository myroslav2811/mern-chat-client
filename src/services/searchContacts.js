import axios from './axios';

export const searchContacts = (username) => {
    return axios.post('/search-contacts', { username })
        .then(res => res.data)
};