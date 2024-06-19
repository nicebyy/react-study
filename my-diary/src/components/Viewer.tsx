import "./Viewer.css"
import {emotionList} from "../util/EmotionList.ts";
import {getEmotionImage} from "../util/getEmotionImage.ts";

type ViewerProps = {
    emotionId : number,
    content : string
}

export const Viewer = ({emotionId ,content} : ViewerProps )=>{

    const emotionItem = emotionList.find(emotion => emotion.emotionId === emotionId);

    return (
        <div className="Viewer">
            <section className="img_section">
                <h4>오늘의 감정</h4>
                <div
                    className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}
                >
                    <img src={getEmotionImage(emotionId) ?? ""}/>
                    <div>{emotionItem?.emotionName}</div>
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <div className="content_wrapper">
                    <p>{content}</p>
                </div>
            </section>
        </div>
    )
}