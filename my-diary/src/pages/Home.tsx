import {useSearchParams} from "react-router-dom";
import Header from "../components/Header.tsx";
import Button from "../components/Button.tsx";
import React, {useContext, useEffect, useState} from "react";
import {DiaryList} from "../components/DiaryList.tsx";
// import {DiaryType} from "../App.tsx";
// import {useDiaryStore} from "../store/store.ts";
import {usePageTitle} from "../hooks/usePageTitle.tsx";
import {useAuthStore} from "../store/AuthStore.ts";
import {useDiaryStoreV2} from "../store/DiaryStoreV2.ts";

const Home = () =>{
    usePageTitle(`홈 화면`);
    const [pivotDate, setPivotDate] = useState(new Date());

    const authStore = useAuthStore();
    const diaryStoreV2 = useDiaryStoreV2();


    useEffect(() => {

        const requestDto = {
            sortCond: `latest`,
            dateCond: `${pivotDate.getFullYear()}-${pivotDate.getMonth()+1}-01`
        }
        const result : Promise<boolean> = diaryStoreV2.getDiaryList(authStore.accessToken,requestDto);
        console.log(result);

        diaryStoreV2.getDiaryList(authStore.accessToken,requestDto)
            .then(result=>{
                if(!result){
                    authStore.refreshAccessToken()
                        .then(refreshAccessTokenResult=>{
                            if(refreshAccessTokenResult){
                                diaryStoreV2.getDiaryList(authStore.accessToken,requestDto);
                            }
                        })
                }
            });
    }, [pivotDate]);

    const onIncreaseMonth = () =>{
        setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()+1));
    };
    const onDecreaseMonth = () =>{
        setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()-1));
    };
    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1} 월`}
                leftChild={<Button onClick={onDecreaseMonth} text={"<"}/>}
                rightChild={<Button onClick={onIncreaseMonth} text={">"}/>}
            />
            <DiaryList data={diaryStoreV2.diaryData}/>
        </div>
    );

}

export default Home;