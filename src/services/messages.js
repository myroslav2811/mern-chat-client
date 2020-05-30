import axios from './axios';

export const getAllMessages = (id) => {
    return axios.get(`/messages/${id}/`)
        .then(res => res.data)
}