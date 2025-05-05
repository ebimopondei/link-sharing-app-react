import useAuth from '../hooks/auth-provider';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const API = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const backendHost = "http://localhost:3001";
    const backendHost = "http://10.0.12.7:3001";
    // const backendHost = "http://192.168.174.172:3001";
    // const backendHost = "https://api.sammy.reneaureits.com"

    const { setIsLoggedIn, setToken } = useAuth();
    const api = axios.create({ baseURL: backendHost });
    const apiPrivate = axios.create({ baseURL: backendHost, withCredentials: true });
    apiPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 401) {
                setIsLoggedIn(false);
                if(location.pathname.includes('/dashboard') || location.pathname.includes('/admin')){
                    setTimeout( ()=>navigate('/login'), 300);
                }
            }
              
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;

                const res = await apiPrivate.get(`/auth/refresh`, { withCredentials: true });
                setToken( res.data.token );
                const newToken = res.data.token;
                prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return apiPrivate(prevRequest);
            }
            // return Promise.reject(error.response ? error.response.data : error);
            return error.response.data;
        }
    );

    return { api, apiPrivate, backendHost }
}

export default API;
