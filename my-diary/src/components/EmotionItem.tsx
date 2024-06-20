import "./EmotionItem.css";
import {getEmotionImage} from "../util/getEmotionImage.ts";


export interface EmotionItemProps {
    emotionId? : number,
    emotionName? : string,
    isSelected? : boolean,
    onClick :  ()=>void,
}
export const EmotionItem = ({emotionId,emotionName,isSelected,onClick} : EmotionItemProps)=>{

    return (
        <div
            onClick={onClick}
            className={`EmotionItem ${isSelected ? `EmotionItem_on_${emotionId}` : ""}`}
        >
            <img className="emotion_img" src={getEmotionImage(emotionId) ?? ""}/>
            <div className="emotion_name">{emotionName}</div>
        </div>
    )
}