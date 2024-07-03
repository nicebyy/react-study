import {create} from "zustand";
import axios from "axios";
import {LoginInput} from "../components/LoginForm.tsx";
import {Cookies} from "react-cookie";

export type AuthStore = {

    accessToken?: string,
    refreshToken?: string,
    isAuthenticated?: boolean,
    refreshAccessToken: () => void,
    setAccessToken: (token: string) => void,
    setRefreshToken: (token: string) => void,
    loginWithEmail: (data?: LoginInput) => Promise<boolean>,
}

export const useAuthStore = create<AuthStore>((set,get) => {

    const cookies = new Cookies();

    return{
        accessToken: cookies.get('access_token') || "",
        refreshToken: cookies.get('refresh_token') || "",
        isAuthenticated:cookies.get('access_token') && cookies.get('refresh_token'),

        refreshAccessToken: async () => {
            console.log(`refresh Accesstoken :::: `)
            const responseToken = {
                accessToken: "",
            };

            await axios.get("http://localhost:8080/auth/refresh", {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${get().refreshToken}`
                    },
                }
            ).then(response => {
                responseToken.accessToken = response.data.accessToken;
                cookies.set(`access_token`,responseToken.accessToken);

            }).catch((err) => {
                const {error, message, statusCode} = err.response.data;

                if (statusCode === 401) {
                    console.log(message);
                }
            });

            set(() => ({
                refreshToken : get().refreshToken,
                accessToken: responseToken.accessToken,
                isAuthenticated: true
            }));
        },
        setAccessToken: (token: string) => set(() => {
            return {accessToken: token};
        }),
        setRefreshToken: (token: string) => set(() => {
            return {refreshToken: token};
        }),
        loginWithEmail: async (data?: LoginInput) => {

            let cond: boolean = false;

            const responseToken = {
                accessToken: "",
                refreshToken: ""
            };

            await axios.post("http://localhost:8080/auth/login", {
                    email: data?.email,
                    password: data?.password
                }, {withCredentials: true}
            ).then(response => {
                if (response.status === 200) {

                    responseToken.accessToken = response.data.accessToken;
                    responseToken.refreshToken = response.data.refreshToken;
                    cookies.set(`access_token`,responseToken.accessToken);
                    cookies.set(`refresh_token`, responseToken.refreshToken);
                    cond = true;
                }
            }).catch((err) => {
                const {error, message, statusCode} = err.response.data;

                if (statusCode === 401) {
                    console.log(message);
                }
            });

            set(() => {
                return {
                    accessToken: responseToken.accessToken,
                    refreshToken: responseToken.refreshToken,
                    isAuthenticated: cond
                }
            })
            return cond;
        },
    }
});

