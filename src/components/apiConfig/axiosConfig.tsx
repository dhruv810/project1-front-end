import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    // headers: {
    //     'Content-Type': 'application/json'

    // },
    withCredentials: true
});

export default api;