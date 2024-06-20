import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import New from "./pages/New.tsx";
import Diary from "./pages/Diary.tsx";
import React, {createContext, useEffect} from "react";
import Edit from "./pages/Edit.tsx";
import {useDiaryStore} from "./store/store.ts";
// import {mockData} from "./util/MockData.ts";

export type DiaryType = {
    id: number,
    createdDate: number,
    emotionId: number,
    content: string
}
const App = () => {

    const diaryStore = useDiaryStore();

    useEffect(() => {

        const storedData = localStorage.getItem("diary");
        if (!storedData) {
            diaryStore.setLoading(false);
            return;
        }

        const parsedData: DiaryType[] = JSON.parse(storedData);
        if (!Array.isArray(parsedData)) {
            diaryStore.setLoading(false);
            return;
        }

        diaryStore.init(parsedData);

    }, [])

    if (diaryStore.isLoading) {
        return <div>Loading ........ </div>;
    }

    return (
        <>

            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/new" element={<New/>}></Route>
                <Route path="/diary/:id" element={<Diary/>}></Route>
                <Route path="/diary/edit/:id" element={<Edit/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>

        </>
    )
}

export default App
