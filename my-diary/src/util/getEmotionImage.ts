
import emotion1 from "./../assets/emotions/emotion1.png";
import emotion2 from "./../assets/emotions/emotion2.png";
import emotion3 from "./../assets/emotions/emotion3.png";
import emotion4 from "./../assets/emotions/emotion4.png";
import emotion5 from "./../assets/emotions/emotion5.png";

export const getEmotionImage = (emotionId : number) : string | null  =>{

    switch (emotionId){
        case 1: return emotion1;
        case 2: return emotion2;
        case 3: return emotion3;
        case 4: return emotion4;
        case 5: return emotion5;
        default : return null;
    }
}