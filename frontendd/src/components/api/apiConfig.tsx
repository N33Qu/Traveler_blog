import axios from 'axios';
import {getAuthToken} from "../services/BackendService";



    const api = axios.create(
        {
            baseURL: 'http://localhost:8080/api/v1',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });


export default api;