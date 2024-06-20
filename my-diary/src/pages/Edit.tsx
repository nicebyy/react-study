import {useNavigate, useParams} from "react-router-dom";
import Header from "../components/Header.tsx";
import Button from "../components/Button.tsx";
import {DiaryInputType, Editor} from "../components/Editor.tsx";
import {useDiary} from "../hooks/useDiary.tsx";
import {useDiaryStore} from "../store/store.ts";
import {usePageTitle} from "../hooks/usePageTitle.tsx";
const Edit = ()=>{
    usePageTitle(`일기 수정`);
    const {onUpdate,onDelete} = useDiaryStore();
    const nav = useNavigate();
    const {id} = useParams<{id : string}>();
    const curDiary = useDiary(Number(id));

    const onSubmit = (input : DiaryInputType)=>{

        if(window.confirm("수정하시겠습니까 ?")){
            onUpdate(Number(id),input.emotionId,input.createdDate.getTime(),input.content);
            nav("/",{replace:true});
        }
    }

    const onClickDelete = ()=>{

        if (window.confirm("일기를 삭제할까요 ? ")){
            onDelete(Number(id));
            nav("/",{replace : true});
        }
    }

    return (
        <div>
            <Header
                title={"일기 수정하기"}
                leftChild={
                    <Button
                        text={"< 뒤로가기"}
                        onClick={()=>nav(-1)}
                    />}
                rightChild={
                <Button
                    text={"삭제하기"}
                    type={"NEGATIVE"}
                    onClick={onClickDelete}
                />}
            />
            <Editor
                initData={curDiary}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default Edit;