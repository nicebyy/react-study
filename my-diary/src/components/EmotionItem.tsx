import "./EmotionItem.css";
import {getEmotionImage} from "../util/getEmotionImage.ts";


export interface EmotionItemProps {
    emotionId : number,
    emotionName : string
}
export const EmotionItem = ({emotionId,emotionName} : EmotionItemProps)=>{

    return (
        <div className="EmotionItem">
            <img className="emotion_img" src={getEmotionImage(emotionId) ?? ""}/>
            <div className="emotion_name">{emotionName}</div>
        </div>
    )
}