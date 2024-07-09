import {create} from "zustand";
import {DiaryType} from "../App.tsx";
import axios from "axios";
import {useAuthStore} from "./AuthStore.ts";
// import {DiaryStore} from "./store.ts";

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
    onUpdate : (token?: string,id?: string, emotionId?: number, createdDate?: number, content?: string) => void,
    onDelete : (token?: string,id?:string) => void,
}
export const useDiaryStoreV2 = create<DiaryStoreV2>((set,get) => {

    useAuthStore.getState().accessToken

    return{
        diaryData: [],
        getDiaryList : async (token?: string,dto?: DiaryRequestDto) : Promise<boolean> =>{

            const diaryData : DiaryType[] = [];
            let cond = false;
            await axios.get("http://127.0.0.1:8080/diary/diaries",{
                params:{
                    sortCond : dto?.sortCond,
                    dateCond : dto?.dateCond
                },
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
            }).catch(err=>{
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
            });

            get().getDiaryList(token,{
                dateCond: new Date(Number(createdDate)).toDateString()
            })
            return cond;
        },

        onUpdate : async (token?: string,id?: string,emotionId?:number, createdDate?:number, content?:string) : Promise<boolean> =>{

            let cond = false;

            const diary : DiaryType = get().diaryData
                .find(diary=>String(diary.id)===String(id)) as DiaryType;

            await axios.put("http://127.0.0.1:8080/diary",{
                id : id,
                emotionId : emotionId ?? diary.emotionId,
                createdDate : createdDate ?? diary.createdDate,
                content: content ?? diary.content
            },{
                withCredentials:true,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                cond = true;
            }).catch(err=>{
            });

            return cond;
        },

        onDelete : async (token?: string,id?: string) : Promise<boolean> =>{

            let cond = false;

            await axios.delete("http://127.0.0.1:8080/diary",{
                data:{id:id},
                withCredentials:true,
                headers:{ Authorization: `Bearer ${token}`}
            }).then(response=>{
                console.log(response);
                cond = true;
            }).catch(err=>{
                console.log(`call err`);
            });

            return cond;
        },
    }
});