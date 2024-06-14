import "./TodoItem.css";
import {memo, useContext} from "react";
import {DispatchContext} from "../App.jsx";

const TodoItem = ({ id, isDone, content, date}) => {

    const {onUpdate, onDelete} = useContext(DispatchContext);

    const onChangeCheckbox = () => onUpdate(id);

    const onDeleteButton = () => onDelete(id);

    return (
        <div className="TodoItem">
            <input
                readOnly
                checked={isDone}
                onChange={onChangeCheckbox}
                type="checkbox"
            />
            <div className="content">{content}</div>
            <div className="date">
                {new Date(date).toLocaleDateString()}
            </div>
            <button
              onClick={onDeleteButton}
            >삭제</button>
        </div>
    );
};

export default memo(TodoItem);