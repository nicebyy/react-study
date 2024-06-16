import {useSearchParams} from "react-router-dom";
import Header from "../components/Header.tsx";
import Button from "../components/Button.tsx";
import React, {useContext, useState} from "react";
import {DiaryList} from "./DiaryList.tsx";
import {DiaryStateContext} from "../App.tsx";

const getMonthlyData = (pivotDate,data) => {

    const beginTime = new Date(pivotDate.getFullYear(),pivotDate.getMonth(),1,0,0,0).getTime();
    const endTime = new Date(pivotDate.getFullYear(),pivotDate.getMonth()+1,0,23,59,59).getTime();

    return data.filter((item)=>beginTime<= item.createdDate && item.createdDate <= endTime);
}
const Home = () =>{

    const [pivotDate, setPivotDate] = useState(new Date());
    const data = useContext(DiaryStateContext);

    const monthlyData = getMonthlyData(pivotDate,data);
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