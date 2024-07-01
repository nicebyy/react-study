import Button from "./Button.tsx";
import "./LoginForm.css";
import React, {useState} from "react";

export interface LoginInput{
    email?: string,
    password? : string
}

interface LoginFormProps {
    onLogin : (data?: LoginInput) => void;
}

export const LoginForm = ({onLogin} : LoginFormProps)=>{

    const [loginData,setLoginData] = useState<LoginInput>();

    const login = ()=>{
        onLogin(loginData);
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {

        const name: string = e.target.name;
        const value: string = e.target.value;

        setLoginData({
            ...loginData,
            [name]: value,
        })
    }

    return (
        <div className="LoginForm">
            <section className="login_section">
                <input
                    name="email"
                    type="email"
                    placeholder="이메일 입력"
                    onChange={onChangeInput}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="패스워드 입력"
                    onChange={onChangeInput}
                />
                <Button
                    text="로그인"
                    type={"POSITIVE"}
                    onClick={login}
                />
            </section>
        </div>
    )
}

