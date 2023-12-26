// src/services/api.ts
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust the URL based on your server
});
export default api;
