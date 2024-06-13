import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import {useCallback, useReducer} from "react";
import {todoData} from "./data/mockData";

const mockData = [
    todoData(false, "React 공부하기"),
    todoData(false, "React 공부하기2"),
    todoData(false, "React 공부하기3"),
];

// const reducer = (state,action)=>{
//
//     switch (action.type) {
//
//         case "CREATE" :
//             return [action.data, ...state];
//         case "UPDATE" :
//             return state.map(todo => todo.id === action.targetId?
//                 {... todo, isDone: !todo.isDone} : todo
//             );
//         case "DELETE" :
//             return state.filter(todo => todo.id !== action.targetId);
//         default :
//             return state;
//
//     }
// }

const reducerV2 = (state, action) => {

    const actions = {
        "CREATE": () => [action.data, ...state],
        "UPDATE": () => state.map(item =>
            item.id === action.targetId ? {...item, isDone: !item.isDone} : item
        ),
        "DELETE": () => state.filter(item => item.id !== action.targetId)
    };

    return (actions[action.type] || (() => state))();
}

const App = () => {

    const [todoList, dispatch] = useReducer(reducerV2, mockData);

    // const onCreate = (content) => {
    //
    //     dispatch({
    //         type: "CREATE",
    //         data: todoData(false, content),
    //     });
    // };

    const onCreate = useCallback((content)=>{
        dispatch({
            type: "CREATE",
            data: todoData(false, content),
        });
    },[]);

    // const onUpdate = (targetId) => {
    //
    //     dispatch({
    //         type: "UPDATE",
    //         targetId: targetId,
    //     })
    // };

    const onUpdate = useCallback((targetId)=>{

        dispatch({
            type: "UPDATE",
            targetId: targetId,
        });
    },[]);


    // const onDelete = (targetId) => {
    //
    //     dispatch({
    //         type: "DELETE",
    //         targetId: targetId,
    //     })
    // }

    const onDelete = useCallback((targetId) => {

        dispatch({
            type: "DELETE",
            targetId: targetId,
        })
    },[]);

    return (
        <div className="App">
            <Header/>
            <Editor onCreate={onCreate}/>
            <List todoList={todoList} onUpdate={onUpdate} onDelete={onDelete}/>
        </div>
    );
};

export default App;
