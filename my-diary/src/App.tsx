import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import New from "./pages/New.tsx";
import Diary from "./pages/Diary.tsx";
import React, {createContext, Dispatch, useContext, useReducer, useRef} from "react";
import Edit from "./pages/Edit.tsx";

export type DiaryType = {
    id: number,
    createdDate: number,
    emotionId: number,
    content: string
}

export type DiaryDispatchType = {
    onCreate: (emotionId: number, createdDate: number, content: string) => void;
    onUpdate: (id: number, emotionId: number, createdDate: number, content: string) => void;
    onDelete: (id: number) => void;
} | undefined

type ActionType =
    | { type: 'CREATE', data: DiaryType }
    | { type: 'UPDATE', data: DiaryType }
    | { type: 'DELETE', data: { id: number } };

const mockData: DiaryType[] = [

    {
        id: 1,
        createdDate: new Date("2024-06-18").getTime(),
        emotionId: 1,
        content: "1번 일기 내용",
    },
    {
        id: 2,
        createdDate: new Date("2024-06-17").getTime(),
        emotionId: 2,
        content: "2번 일기 내용",
    },
    {
        id: 3,
        createdDate: new Date("2024-05-17").getTime(),
        emotionId: 2,
        content: "3번 일기 내용",
    },
];

const reducer = (state: DiaryType[], action: ActionType): DiaryType[] => {

    switch (action.type) {
        case "CREATE" :
            return [action.data, ...state];
        case "UPDATE" :
            return state.map((item) =>
                String(item.id) === String(action.data.id)
                    ? action.data
                    : item
            );
        case "DELETE" :
            return state.filter((item) => String(item.id) !== String(action.data.id));
        default :
            return state;
    }
}

export const DiaryStateContext = createContext<DiaryType[] | undefined>([]);
export const DiaryDispatchContext = createContext<DiaryDispatchType>(undefined);

const App = () => {

    // const nav = useNavigate();
    const [data, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(4);

    const onCreate = (emotionId: number, createdDate: number, content: string) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                createdDate,
                emotionId,
                content
            },
        })
    };
    const onUpdate = (id: number, emotionId: number, createdDate: number, content: string) => {
        dispatch({
            type: "UPDATE",
            data: {
                id,
                createdDate,
                emotionId,
                content
            },
        })
    };

    const onDelete = (id: number) => {
        dispatch({
            type: "DELETE",
            data: {
                id
            },
        })
    }

    return (
        <>
            {/*<button onClick={()=>onCreate(1,new Date().getTime(),"hello")}>*/}
            {/*    일기추가 테스트*/}
            {/*</button>*/}

            {/*<button onClick={()=>onUpdate(1,1,new Date().getTime(),"수정된 일기 입니다.")}>*/}
            {/*    일기수정 테스트*/}
            {/*</button>*/}

            {/*<button onClick={()=>onDelete(1)}>*/}
            {/*    일기삭제 테스트*/}
            {/*</button>*/}

            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext.Provider
                    value={{
                        onCreate,
                        onUpdate,
                        onDelete,
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/new" element={<New/>}></Route>
                        <Route path="/diary:id" element={<Diary/>}></Route>
                        <Route path="*" element={<NotFound/>}></Route>
                        <Route path={"/edit:id"} element={<Edit/>}></Route>
                    </Routes>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
        </>
    )
}

export default App
