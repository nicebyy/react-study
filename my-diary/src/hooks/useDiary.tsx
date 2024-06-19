import {useContext, useEffect, useState} from "react";
import {DiaryStateContext, DiaryType} from "../App.tsx";
import {useNavigate} from "react-router-dom";

export const useDiary = (id : number)=>{

    const diaryList : DiaryType[] = useContext(DiaryStateContext) as DiaryType[];
    const [curDiary,setCurDiary] = useState<DiaryType>();
    const nav = useNavigate();

    useEffect(() => {

        const findDiary = diaryList.find(item=>item.id === id);

        if(!findDiary){
            window.alert("잘못된 접근 입니다.");
            nav("/",{replace:true});
        }

        setCurDiary(findDiary);
    }, [id,diaryList]);

    return curDiary;
};