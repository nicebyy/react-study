import {useNavigate, useParams} from "react-router-dom";
import {useDiary} from "../hooks/useDiary.tsx";
import {DiaryType} from "../App.tsx";
import Header from "../components/Header.tsx";
import Button from "../components/Button.tsx";
import {Viewer} from "../components/Viewer.tsx";
import {getStringedDate} from "../util/getStringedDate.ts";


const Diary = () =>{

    const nav = useNavigate();
    const {id} = useParams<{id : string}>();

    const curDiary = useDiary(Number(id));

    if(!curDiary){
        return(
            <div>데이터 로딩중 ...!</div>
        );
    }

    const {createdDate,emotionId,content} : DiaryType = curDiary;


    return (
        <div>
            <Header
                title={`${getStringedDate(new Date(createdDate))} 기록`}
                leftChild={
                <Button onClick={()=>nav(-1)} text={"<뒤로가기"}/>
            }
                rightChild={
                <Button onClick={()=> nav(`/diary/edit/${id}`)} text={"수정하기"}/>
            }
            />
            <Viewer emotionId={emotionId} content={content}/>
        </div>
    );

}

export default Diary;