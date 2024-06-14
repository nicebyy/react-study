import {useContext, useMemo, useState} from "react";
import "./List.css";
import TodoItem from "./TodoItem";
import {TodoContext} from "../App.jsx";

const List = () => {

    const {todoList} = useContext(TodoContext);
    const [search,setSearch] = useState("");

    const onChangeSearch = event => setSearch(event.target.value);

    const filteredList = () =>{
        return search === "" ? todoList :
            todoList.filter(todo => todo.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }

    const { totalCount, doneCount, notDoneCount } =
        useMemo(() => {
            console.log("getAnalyzedData 호출!");
            const totalCount = todoList.length;
            const doneCount = todoList.filter(
                (todo) => todo.isDone
            ).length;
            const notDoneCount = totalCount - doneCount;

            return {
                totalCount,
                doneCount,
                notDoneCount,
            };
        }, [todoList]);

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
        <div>
            <div> total : {totalCount}</div>
            <div> done : {doneCount}</div>
            <div> notDone : {notDoneCount}</div>
        </div>
      <input
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={onChangeSearch}
      />
      <div className="todos_wrapper">
          {
              filteredList().map(todo=>{
                  return <TodoItem
                      key={todo.id} {...todo}
                  ></TodoItem>;
              })
          }
      </div>
    </div>
  );
};

export default List;