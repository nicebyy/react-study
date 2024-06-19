import "./Editor.css";
import {EmotionItem} from "./EmotionItem.tsx";
import Button from "./Button.tsx";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {DiaryType} from "../App.tsx";
import {emotionList, EmotionType} from "../util/EmotionList.ts";
import {getStringedDate} from "../util/getStringedDate.ts";


export type DiaryInputType = {
    emotionId: number,
    createdDate: Date,
    content: string
}
interface EditorProps {
    initData? : DiaryType
    onSubmit : (data: DiaryInputType) => void;
}

export const Editor =  ({initData, onSubmit} : EditorProps) => {

    // const emotionId: number = 5;
    const nav = useNavigate();

    const [diaryData, setDiaryData] = useState<DiaryInputType>({
        createdDate: new Date(),
        emotionId: 3,
        content: "",
    });

    useEffect(() => {
        if(initData){
            setDiaryData({
                ...initData,
                createdDate : new Date(Number(initData.createdDate))
            })
        }
    }, [initData]);

    const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {

        const name: string = e.target.name;
        let value: string | Date = e.target.value;

        if (e.target.name === "createdDate") {
            value = new Date(value);
        }

        setDiaryData({
            ...diaryData,
            [name]: value,
        })
    }

    const onEmotionChange = (emotionId: number)=>{
        setDiaryData({
            ...diaryData,
            emotionId,
        })
    }

    const onSubmitButtonClick = () => {
        onSubmit(diaryData)
    }

    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input
                    name="createdDate"
                    value={getStringedDate(diaryData.createdDate)}
                    type="date"
                    onChange={onChangeInput}
                >
                </input>
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {
                        emotionList.map((emotion) => {

                            return (
                                <EmotionItem
                                    onClick={()=>onEmotionChange(emotion.emotionId)}
                                    key={emotion.emotionId}
                                    {...emotion}
                                    isSelected={emotion.emotionId === diaryData.emotionId}
                                />
                            )
                        })
                    }
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea
                    name="content"
                    placeholder="오늘은 어땠나요?"
                    onChange={onChangeInput}
                    value={diaryData.content}
                />
            </section>
            <section className="button_section">
                <Button
                    text={"취소하기"}
                    onClick={() => nav(-1)}
                />
                <Button
                    text={"작성완료"}
                    type={"POSITIVE"}
                    onClick={onSubmitButtonClick}
                />
            </section>
        </div>
    )
}

