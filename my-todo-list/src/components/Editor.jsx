import {useContext, useRef, useState} from "react";
import "./Editor.css";
import {DispatchContext} from "../App.jsx";

const Editor = () => {

  const {onCreate} = useContext(DispatchContext);
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChange = (event) => {
    setContent(event.target.value);
  };

  const onSubmit = () => {
    if (content === "") {
      inputRef.current.focus;
    }else{
      onCreate(content);
      setContent("");
    }
  };

  const onKeyDown = (event)=>{

    if(event.keyCode === 13){
      onSubmit();
    }
  }

  return (
    <div className="Editor">
      <input 
          placeholder="새로운 Todo..." 
          ref={inputRef}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={content}
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
