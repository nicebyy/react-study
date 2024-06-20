import {useSearchParams} from "react-router-dom";
import Header from "../components/Header.tsx";
import Button from "../components/Button.tsx";
import React, {useContext, useState} from "react";
import {DiaryList} from "../components/DiaryList.tsx";
import {DiaryType} from "../App.tsx";
import {useDiaryStore} from "../store/store.ts";
import {usePageTitle} from "../hooks/usePageTitle.tsx";

const getMonthlyData = (pivotDate:Date, data:DiaryType[])  : DiaryType[] => {

    const beginTime = new Date(pivotDate.getFullYear(),pivotDate.getMonth(),1,0,0,0).getTime();
    const endTime = new Date(pivotDate.getFullYear(),pivotDate.getMonth()+1,0,23,59,59).getTime();

    return data.filter((item)=>beginTime<= item.createdDate && item.createdDate <= endTime);
}
const Home = () =>{
    usePageTitle(`홈 화면`);
    const [pivotDate, setPivotDate] = useState(new Date());

    const {diaryData} = useDiaryStore();

    const monthlyData : DiaryType[] = getMonthlyData(pivotDate,diaryData ?? []);
    console.log(monthlyData);

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
            <DiaryList data={monthlyData}/>

        </div>
    );

}

export default Home;