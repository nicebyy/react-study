import {create} from "zustand";
import {DiaryType} from "../App.tsx";

export type DiaryStore = {
    diaryData : DiaryType[],
    isLoading : boolean,
    setLoading : (loading : boolean) => void,
    idRef : number,
    init : (data: DiaryType[]) => void,
    onCreate : (emotionId: number, createdDate: number, content: string) => void,
    onUpdate : (id: number, emotionId: number, createdDate: number, content: string) => void,
    onDelete : (id:number) => void,
}

export const useDiaryStore = create<DiaryStore>((set) => ({
    diaryData : [],
    isLoading : true,
    idRef : 0,
    init : (data: DiaryType[]) => set((state)=>{

        let maxId = 0;
        data.forEach((item) => {
            if (item.id > maxId) {
                maxId = item.id;
            }
        });

        return {
            diaryData: data,
            idRef: maxId + 1,
            isLoading: false
        };
    }),
    setLoading : (loading : boolean) => set((state)=>{
        return {isLoading : loading};
    }),
    onCreate : (emotionId : number, createdDate: number, content: string) => set((state : DiaryStore)=>{
        const newDiary : DiaryType = {
            id: state.idRef++,
            createdDate,
            emotionId,
            content
        };
        const newDiaryData = [
            newDiary,
            ...state.diaryData
        ];
        localStorage.setItem("diary",JSON.stringify(newDiaryData));
        return {diaryData: newDiaryData};
    }),
    onUpdate : (id: number, emotionId: number, createdDate: number, content: string) => set((state)=>{
        const updatedDiaryData = state.diaryData.map((item) =>
            String(item.id) === String(id)
                ? {id,emotionId,createdDate,content}
                : item
        );
        localStorage.setItem("diary",JSON.stringify(updatedDiaryData));
        return {diaryData : updatedDiaryData};
    }),
    onDelete : (id: number) => set((state)=>{
        const nextDiaryData = state.diaryData.filter((item) => item.id !== id);
        localStorage.setItem("diary", JSON.stringify(nextDiaryData));
        return { diaryData: nextDiaryData };
    }),
}));