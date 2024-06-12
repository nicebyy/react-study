import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import List from "./components/List";
import { useState } from "react";
import { todoData } from "./data/mockData";

const mockData = [
  todoData(false, "React 공부하기"),
  todoData(false, "React 공부하기2"),
  todoData(false, "React 공부하기3"),
];

const App = () => {
  
  const [todoList, setTodoList] = useState(mockData);

  const onCreate = (content) => {
    const newTodoData = todoData(false, content);
    setTodoList([newTodoData, ...todoList]);
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todoList={todoList}/>
    </div>
  );
};

export default App;
