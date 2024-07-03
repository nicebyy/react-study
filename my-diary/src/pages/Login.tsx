import Header from "../components/Header.tsx";
import React from "react";
import {usePageTitle} from "../hooks/usePageTitle.tsx";
import {LoginForm, LoginInput} from "../components/LoginForm.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/AuthStore.ts";
import {Cookies} from "react-cookie";

const Login = () => {
    usePageTitle(`로그인 화면`);

    const nav = useNavigate();
    const authStore = useAuthStore();

    const login = async (data?: LoginInput) => {

        const result = await authStore.loginWithEmail(data);

        if(result){
            nav(`/`);
        }else{
            nav(0);
        }
    }

    return (
        <div>
            <Header
                title={`로그인`}
            />
            <LoginForm
                onLogin={login}
            />
        </div>
    );

}
export default Login;