import {useEffect, useState} from "react";
import {DiaryType} from "../App.tsx";
import {useNavigate} from "react-router-dom";
import {useDiaryStore} from "../store/store.ts";

export const useDiary = (id : number)=>{

    const{diaryData} = useDiaryStore();

    const [curDiary,setCurDiary] = useState<DiaryType>();
    const nav = useNavigate();

    useEffect(() => {

        const findDiary = diaryData.find(item=>item.id === id);

        if(!findDiary){
            window.alert("잘못된 접근 입니다.");
            nav("/",{replace:true});
        }

        setCurDiary(findDiary);
    }, [id,diaryData]);

    return curDiary;
};