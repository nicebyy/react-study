import {create} from "zustand";
import {DiaryType} from "../App.tsx";
import axios from "axios";
import {DiaryStore} from "./store.ts";

export interface DiaryRequestDto{
    sortCond? :string,
    dateCond? :string,
}

export type DiaryStoreV2 = {
    diaryData : DiaryType[],
    // isLoading : boolean,
    // setLoading : (loading : boolean) => void,
    // idRef : number,
    getDiaryList : (token?: string,dto?:DiaryRequestDto) => Promise<boolean>,
    onCreate : (token?: string,emotionId?:number, createdDate?:number, content?:string) => void,
    // onUpdate : (id: number, emotionId: number, createdDate: number, content: string) => void,
    // onDelete : (id:number) => void,
}
export const useDiaryStoreV2 = create<DiaryStoreV2>((set,get) => {

    return{
        diaryData: [],
        getDiaryList : async (token?: string,dto?: DiaryRequestDto) : Promise<boolean> =>{

            const diaryData : DiaryType[] = [];
            let cond = false;
            await axios.post("http://127.0.0.1:8080/diary/diaries",{
                sortCond : dto?.sortCond,
                dateCond : dto?.dateCond
            },{
                withCredentials:true,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                cond = true;

                const data = response.data;

                for (const e of data) {
                    diaryData.push({
                        id : e._id,
                        content : e.content,
                        emotionId: e.emotionId,
                        createdDate: new Date(e.createdDate).getTime()
                    })
                }
                console.log(response)
            }).catch(err=>{
                console.log(err);
                return cond;
            });

            set(()=>({
                diaryData:diaryData,
            }))
            return cond;
        },
        onCreate : async (token?: string,emotionId?:number, createdDate?:number, content?:string) : Promise<boolean> =>{

            let cond = false;

            await axios.post("http://127.0.0.1:8080/diary",{
                emotionId : emotionId,
                createdDate : createdDate,
                content: content
            },{
                withCredentials:true,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                cond = true;
            }).catch(err=>{
                console.log(err);
            });

            get().getDiaryList(token,{
                dateCond: new Date(Number(createdDate)).toDateString()
            })
            return cond;
        },
    }
});