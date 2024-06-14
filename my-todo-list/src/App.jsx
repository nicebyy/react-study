import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import {createContext, useCallback, useMemo, useReducer} from "react";
import {todoData} from "./data/mockData";

const mockData = [
    todoData(false, "React 공부하기"),
    todoData(false, "React 공부하기2"),
    todoData(false, "React 공부하기3"),
];


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
export const TodoContext = createContext();
export const DispatchContext = createContext();
const App = () => {

    const [todoList, dispatch] = useReducer(reducerV2, mockData);

    const onCreate = useCallback((content) => {
        dispatch({
            type: "CREATE",
            data: todoData(false, content),
        });
    }, []);

    const onUpdate = useCallback((targetId) => {

        dispatch({
            type: "UPDATE",
            targetId: targetId,
        });
    }, []);

    const onDelete = useCallback((targetId) => {

        dispatch({
            type: "DELETE",
            targetId: targetId,
        })
    }, []);

    const memoizedDispatch = useMemo(() => {
        return {onCreate, onUpdate, onDelete}
    }, []);

    return (
        <div className="App">
            <Header/>
            <TodoContext.Provider value={{todoList}}>
                <DispatchContext.Provider value={memoizedDispatch}>
                    <Editor/>
                    <List/>
                </DispatchContext.Provider>
            </TodoContext.Provider>
        </div>
    );
};

export default App;
