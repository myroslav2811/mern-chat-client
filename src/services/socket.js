import io from 'socket.io-client';
import localStorageService from './localStorageService';

export const socket = io('', { query: 'auth_token=' + localStorageService.getAccessToken() });

export const updateAccessToken = () => {
    socket.close();
    socket.io.opts.query = 'auth_token=' + localStorageService.getAccessToken();
    socket.connect();
}