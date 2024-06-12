import { useRef, useState } from "react";
import "./Editor.css";

const Editor = ({ onCreate }) => {
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
