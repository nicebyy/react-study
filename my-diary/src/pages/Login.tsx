import Header from "../components/Header.tsx";
import React, {useState} from "react";
import {usePageTitle} from "../hooks/usePageTitle.tsx";
import {LoginForm, LoginInput} from "../components/LoginForm.tsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    usePageTitle(`로그인 화면`);

    const nav = useNavigate();

    const loginWithEmail = async (data?: LoginInput) => {

        console.log(`try login`);

        await axios.post("http://localhost:8080/auth/login", {
                email: data?.email,
                password: data?.password
            }, {withCredentials: true}
        )
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log(`ok`);
                    nav(`/`);
                }
                // console.log(response.headers);
            })
            .catch((err) => {
                const {error, message, statusCode} = err.response.data;

                if (statusCode === 401) {
                    console.log(message);
                }
                nav(0);
            });
    }

    return (

        <div>
            <Header
                title={`로그인`}
            />
            <LoginForm
                onLogin={loginWithEmail}
            />
        </div>
    );

}

export default Login;