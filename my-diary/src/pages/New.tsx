import Header from "../components/Header.tsx";
import Button from "../components/Button.tsx";
import {DiaryInputType, Editor} from "../components/Editor.tsx";
import {useNavigate} from "react-router-dom";
import {useDiaryStore} from "../store/store.ts";
import {useEffect} from "react";
import {usePageTitle} from "../hooks/usePageTitle.tsx";

const New = () =>{
    usePageTitle(`새 일기 쓰기`);
    const diaryStore = useDiaryStore();
    const nav = useNavigate();

    const onSubmit = (input : DiaryInputType)=>{
        diaryStore.onCreate(input.emotionId,input.createdDate.getTime(),input.content);
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