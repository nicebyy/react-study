import { useState } from "react";
import "./List.css";
import TodoItem from "./TodoItem";

const List = ({todoList,onUpdate,onDelete}) => {

    const [search,setSearch] = useState("");

    const onChangeSearch = event => setSearch(event.target.value);

    const filteredList = () =>{
        return search === "" ? todoList :
            todoList.filter(todo => todo.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    }

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
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
                      onUpdate={onUpdate}
                      onDelete={onDelete}
                  ></TodoItem>;
              })
          }
      </div>
    </div>
  );
};

export default List;