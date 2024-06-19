export interface DiaryType{
    id : number;
    createdDate : number;
    emotionId : number;
    content : string;
}

class DiaryDB {

    idSequence : number;
    data : DiaryType[];
    constructor() {
        this.idSequence = 0;
        this.data = [];
    }
    createDiary(diaryId : number,emotionId : number,createdDate:number, content : string) : DiaryType{
        return {
            id: diaryId,
            createdDate: createdDate,
            emotionId: emotionId,
            content: content
        };
    }

    updateDiary(diaryId:number, emotionId : number, createdDate:number,content : string) : DiaryType{
        return {
            id: diaryId,
            createdDate: createdDate,
            emotionId: emotionId,
            content: content
        };
    }
}


// export const mockData: DiaryType[] = [
//
//     {
//         id: 1,
//         createdDate: new Date("2024-06-18").getTime(),
//         emotionId: 1,
//         content: "1번 일기 내용",
//     },
//     {
//         id: 2,
//         createdDate: new Date("2024-06-17").getTime(),
//         emotionId: 2,
//         content: "2번 일기 내용",
//     },
//     {
//         id: 3,
//         createdDate: new Date("2024-05-17").getTime(),
//         emotionId: 2,
//         content: "3번 일기 내용",
//     },
// ];

export const diaryDB = new DiaryDB();
diaryDB.data.push(diaryDB.createDiary(1,1,new Date().getTime(),"1번 일기 내용"));
diaryDB.data.push(diaryDB.createDiary(2,2,new Date().getTime(),"2번 일기 내용"));
