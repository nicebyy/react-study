import {create} from "zustand";
import {DiaryType} from "../App.tsx";
import axios from "axios";
import {useAuthStore} from "./AuthStore.ts";
import {apiInstance} from "../util/AxiosInstance.ts";

// import {DiaryStore} from "./store.ts";

export interface DiaryRequestDto {
    sortCond?: string,
    dateCond?: string,
}

export type DiaryStoreV2 = {
    diaryData: DiaryType[],
    // isLoading : boolean,
    // setLoading : (loading : boolean) => void,
    // idRef : number,
    getDiaryList: (dto?: DiaryRequestDto) => Promise<boolean>,
    onCreate: (emotionId?: number, createdDate?: number, content?: string) => void,
    onUpdate: (id?: string, emotionId?: number, createdDate?: number, content?: string) => void,
    onDelete: (id?: string) => void,
}
export const useDiaryStoreV2 = create<DiaryStoreV2>((set, get) => {

    return {
        diaryData: [],
        getDiaryList: async (dto?: DiaryRequestDto): Promise<boolean> => {

            const diaryData: DiaryType[] = [];
            let cond = false;

            await apiInstance.get("/diary/diaries", {
                params: {
                    sortCond: dto?.sortCond,
                    dateCond: dto?.dateCond
                },
            }).then(response => {
                cond = true;
                const data = response.data;
                for (const e of data) {
                    diaryData.push({
                        id: e._id,
                        content: e.content,
                        emotionId: e.emotionId,
                        createdDate: new Date(e.createdDate).getTime()
                    })
                }
            }).catch(err => {
                console.log(err);
            });

            set(() => ({
                diaryData: diaryData,
            }))
            return cond;
        },
        onCreate: async (emotionId?: number, createdDate?: number, content?: string): Promise<boolean> => {

            let cond = false;

            await apiInstance.post("/diary", {
                emotionId: emotionId,
                createdDate: createdDate,
                content: content
            }).then(response => {
                cond = true;
            }).catch(err => {
            });

            get().getDiaryList({
                dateCond: new Date(Number(createdDate)).toDateString()
            })

            return cond;
        },

        onUpdate: async (id?: string, emotionId?: number, createdDate?: number, content?: string): Promise<boolean> => {

            let cond = false;

            const diary: DiaryType = get().diaryData
                .find(diary => String(diary.id) === String(id)) as DiaryType;


            await apiInstance.put("/diary", {
                id: id,
                emotionId: emotionId ?? diary.emotionId,
                createdDate: createdDate ?? diary.createdDate,
                content: content ?? diary.content
            }).then(response => {
                cond = true;
            }).catch(err => {
            });

            return cond;
        },

        onDelete: async (id?: string): Promise<boolean> => {

            let cond = false;

            await apiInstance.delete("/diary", {
                data: {id: id}
            }).then(response => {
                cond = true;
            }).catch(err => {
            });

            return cond;
        },
    }
});