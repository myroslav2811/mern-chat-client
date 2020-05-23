import axios from 'axios';

import localStorageService from './localStorageService';
import { updateAccessToken } from './socket';

// axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();

axios.interceptors.response.use((response) => {
    return response
},
    (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios.post('/refresh-tokens', { refreshToken: localStorageService.getRefreshToken() })
                .then(res => {
                    if (res.status === 201) {
                        localStorageService.setToken(res.data);

                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
                        updateAccessToken();

                        return axios(originalRequest);
                    }
                })
        }
        return Promise.reject(error);
    }
);

export default axios;
