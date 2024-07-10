import {create} from "zustand";
import axios from "axios";
import {LoginInput} from "../components/LoginForm.tsx";
import {Cookies} from "react-cookie";
import {apiInstance} from "../util/AxiosInstance.ts";

export type AuthStore = {

    isAuthenticated?: boolean,
    loginWithEmail: (data?: LoginInput) => Promise<boolean>,
}

export const useAuthStore = create<AuthStore>((set,get) => {

    const cookies = new Cookies();

    return{
        isAuthenticated: cookies.get('access_token')!=null,

        loginWithEmail: async (data?: LoginInput) => {

            console.log(`call loginWithEmail`)

            let cond: boolean = false;

            await axios.post("http://localhost:8080/auth/loginV2",{
                email: data?.email,
                password: data?.password
            }).then(response => {
                console.log(response);
                if (response.status === 200) {

                    cookies.set(`access_token`,response.headers[`authorization`].split(" ")[1]);
                    cookies.set(`refresh_token`, response.headers[`refresh_token`]);
                    cond = true;
                }
            }).catch((err) => {
                console.log(err);
                const {error, message, statusCode} = err.response.data;

                if (statusCode === 401) {
                }
            });

            set(() => {
                return {
                    isAuthenticated: cond
                }
            })
            return cond;
        },
    }
});

