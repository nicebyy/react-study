import "./Editor.css";
import {EmotionItem} from "./EmotionItem.tsx";
import Button from "./Button.tsx";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";

type EmotionType = {
    emotionId: number,
    emotionName: string
}

type DiaryInputType = {
    emotionId: number,
    createdDate: Date,
    content: string
}

const emotionList: EmotionType[] = [
    {emotionId: 1, emotionName: "완전 좋음"},
    {emotionId: 2, emotionName: "좋음"},
    {emotionId: 3, emotionName: "그럭저럭"},
    {emotionId: 4, emotionName: "나쁨"},
    {emotionId: 5, emotionName: "끔찍함"},
];

const getStringedDate = (targetDate: Date): string => {

    // yyyy-mm-dd
    const year = targetDate.getFullYear();
    let month: number | string = targetDate.getMonth() + 1;
    let date: number | string = targetDate.getDate();

    if (month < 10) {
        month = `0${month}`;
    }
    if (date < 10) {
        date = `0${date}`;
    }

    return `${year}-${month}-${date}`;
};

export const Editor = ({onSubmit}) => {

    // const emotionId: number = 5;
    const nav = useNavigate();
    const [diaryData, setDiaryData] = useState<DiaryInputType>({
        createdDate: new Date(),
        emotionId: 3,
        content: "",
    });

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

    const onEmotionChange = (emotionId : number)=>{
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

