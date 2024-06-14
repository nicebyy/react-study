import './App.css'
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import New from "./pages/New.tsx";
import Diary from "./pages/Diary.tsx";
import React from "react";

const App = ()=> {

    const nav = useNavigate();

    const onClickButton = ()=>{
        nav("/new");
    };

    return (
        <>

            <div>
                <Link to={"/"}>Home</Link>
                <Link to={"/new"}>New</Link>
                <Link to={"/diary"}>Diary</Link>
            </div>
            <button onClick={onClickButton}>
                New 페이지로 이동
            </button>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/new" element={<New />}></Route>
                <Route path="/diary:id" element={<Diary />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </>
    )
}

export default App
