import {getEmotionImage} from "../util/getEmotionImage.ts";
import Button from "./Button.tsx";
import "./DiaryItem.css";
import {useState} from "react";
import {DiaryType} from "../util/MockData.ts";
import {useNavigate} from "react-router-dom";
export const DiaryItem = ({id, emotionId, createdDate, content} : DiaryType)=>{

    const nav = useNavigate();

    return (
        <div className="DiaryItem">
            <div
                className={`img_section img_section_${emotionId}`}
                onClick={()=>nav(`/diary/${id}`)}
            >
                <img src={getEmotionImage(emotionId) ?? ""}/>
            </div>
            <div
                className="info_section"
                onClick={()=>nav(`/diary/${id}`)}
            >
                <div className="create_date">
                    {new Date(createdDate).toLocaleDateString()}
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
            <div className="button_section">
                <Button
                    onClick={()=>nav(`/diary/edit/${id}`)}
                    text={"수정하기"}></Button>
            </div>
        </div>
    )
}