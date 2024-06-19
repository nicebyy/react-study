import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import New from "./pages/New.tsx";
import Diary from "./pages/Diary.tsx";
import React, {createContext, Dispatch, useContext, useEffect, useReducer, useRef, useState} from "react";
import Edit from "./pages/Edit.tsx";
// import {mockData} from "./util/MockData.ts";

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
}

type ActionType =
    | { type: 'CREATE', data: DiaryType }
    | { type: 'UPDATE', data: DiaryType }
    | { type: 'DELETE', data: { id: number } }
    | { type: 'INIT', data: DiaryType[]}
    ;

const reducer = (state: DiaryType[], action: ActionType): DiaryType[] => {

    let nextState;
    switch (action.type) {
        case "CREATE" :{
            nextState =  [action.data, ...state];
            break;
        }
        case "UPDATE" :{
            nextState =  state.map((item) =>
                String(item.id) === String(action.data.id)
                    ? action.data
                    : item
            );
            break;
        }
        case "DELETE" :{
            nextState = state.filter((item) => String(item.id) !== String(action.data.id));
            break;
        }
        case "INIT":
            return action.data;
        default :
            return state ;
    }
    localStorage.setItem("diary",JSON.stringify(nextState));
    return nextState;
}

export const DiaryStateContext = createContext<DiaryType[] | undefined>([]);
export const DiaryDispatchContext = createContext<DiaryDispatchType | undefined>(undefined);

const App = () => {

    // const nav = useNavigate();
    const [data, dispatch] = useReducer(reducer, []);
    const idRef = useRef(0);

    const[isLoading,setIsLoading] = useState(true);
    useEffect(() =>{

        const storedData = localStorage.getItem("diary");
        if(!storedData){
            setIsLoading(false);
            return;
        }

        const parsedData : DiaryType[] = JSON.parse(storedData);
        if(!Array.isArray(parsedData)){
            setIsLoading(false);
            return;
        }

        let maxId = 0;
        parsedData.forEach((item) => {
            if(item.id > maxId){
                maxId = item.id;
            }
        });

        idRef.current = idRef.current+maxId+1;

        dispatch({
            type : "INIT",
            data : parsedData,
        });
        setIsLoading(false);

    },[])

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

    if(isLoading){
        return <div>Loading ........ </div>;
    }

    return (
        <>
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
                        <Route path="/diary/:id" element={<Diary/>}></Route>
                        <Route path="/diary/edit/:id" element={<Edit/>}></Route>
                        <Route path="*" element={<NotFound/>}></Route>
                    </Routes>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
        </>
    )
}

export default App
