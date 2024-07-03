import './App.css'
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import New from "./pages/New.tsx";
import Diary from "./pages/Diary.tsx";
import React, {createContext, useEffect} from "react";
import Edit from "./pages/Edit.tsx";
import {useDiaryStore} from "./store/store.ts";
import Login from "./pages/Login.tsx";
import {useAuthStore} from "./store/AuthStore.ts";
import {useDiaryStoreV2} from "./store/DiaryStoreV2.ts";
// import {mockData} from "./util/MockData.ts";

export type DiaryType = {
    id: number,
    createdDate: number,
    emotionId: number,
    content: string
}
const App = () => {

    const authStore = useAuthStore();

    // useEffect(() => {
    //
    //     const storedData = localStorage.getItem("diary");
    //     if (!storedData) {
    //         diaryStore.setLoading(false);
    //         return;
    //     }
    //
    //     const parsedData: DiaryType[] = JSON.parse(storedData);
    //     if (!Array.isArray(parsedData)) {
    //         diaryStore.setLoading(false);
    //         return;
    //     }
    //
    //     diaryStore.init(parsedData);
    //
    // }, [])
    //
    // if (diaryStore.isLoading) {
    //     return <div>Loading ........ </div>;
    // }

    const PrivateRoute = () : React.ReactElement | null=>{

        if(authStore.isAuthenticated){
            return <Outlet/>;
        }
        return <Navigate to={"/login"}/>;
    }

    return (
        <>
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route element={<PrivateRoute/>}>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/new" element={<New/>}></Route>
                    <Route path="/diary/:id" element={<Diary/>}></Route>
                    <Route path="/diary/edit/:id" element={<Edit/>}></Route>
                    <Route path="*" element={<NotFound/>}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default App
