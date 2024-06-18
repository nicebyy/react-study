import Header from "../components/Header.tsx";
import Button from "../components/Button.tsx";
import {Editor} from "../components/Editor.tsx";
import {useContext} from "react";
import {DiaryDispatchContext, DiaryDispatchType, DiaryType} from "../App.tsx";
import {useNavigate} from "react-router-dom";

const New = () =>{

    const onCreate   = useContext(DiaryDispatchContext) as DiaryDispatchType;
    const nav = useNavigate();

    const onSubmit = (input : DiaryType)=>{

        if (onCreate && onCreate.on)

        onCreate();
        nav("/",{replace : true});
    }

    return (
        <div>
            <Header
                title={"새 일기 쓰기"}
                leftChild={
                <Button
                    text={"< 뒤로가기"}
                    onClick={()=>nav(-1)}
                />}
            />
            <Editor
                onSubmit={onSubmit}
            />
        </div>
    );

}

export default New;