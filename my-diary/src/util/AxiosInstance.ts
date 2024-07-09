import axios from "axios";
import {Cookies} from "react-cookie";

/**
 * todo
 * 환경 별 path 분리 및 url 상수화 할것 .
 */
const BASE_URL = "http://localhost:8080";
const REFRESH_AUTH_URL = "/auth/refresh";

const axiosInstance = ()=>{

    return axios.create({
        baseURL : BASE_URL,
        withCredentials: true,
    })
}

export const apiInstance = axiosInstance();

apiInstance.interceptors.request.use(

    config =>{
        const cookies = new Cookies();
        const token = cookies.get("access_token") ?? "";
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {

            const cookies = new Cookies();
            const refreshToken = cookies.get("refresh_token") ?? "";

            await axios.get(`${BASE_URL}${REFRESH_AUTH_URL}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${refreshToken}`
                    },
                }
            ).then(response => {
                console.log(`accesstoken saved`)
                cookies.set("access_token",response.data.accessToken);
            })
            return apiInstance(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    console.log(`fail to refresh accesstoken`);
    return Promise.reject(error);
});
