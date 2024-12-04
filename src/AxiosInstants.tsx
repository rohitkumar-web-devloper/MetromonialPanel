// api.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

// Add request interceptor
api.interceptors.request.use(
    async config => {
        let token = localStorage.getItem('accessToken');
        if (token) {
            try {
                const { exp }: { exp: number } = jwtDecode(token);
                if (exp < Date.now() / 1000 && config.url !== 'auth/refresh-token') {
                    // 
                }
            } catch (err) {
                console.log(err);
            }
            console.log('Final Request Config:', config.url);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// // Add response interceptor
// api.interceptors.response.use(
//     response => response,
//     async error => {
//         console.log(error);
//         const originalRequest = error.config;
//         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             console.log(error);

//         }
//         return Promise.reject(error);
//     }
// );

export { api };