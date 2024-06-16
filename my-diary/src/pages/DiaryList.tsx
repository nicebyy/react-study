import Button from "../components/Button.tsx";
import "./DiaryList.css"
import {DiaryItem} from "../components/DiaryItem.tsx";
import {DiaryType} from "../util/MockData.ts";
import {useNavigate} from "react-router-dom";
import {ChangeEventHandler, useState} from "react";

export const DiaryList = ({data})=>{

    const nav = useNavigate();
    const [sortType, setSortType] = useState<string>("latest");

    const onChangeSortType : ChangeEventHandler<HTMLSelectElement> = (e)=>{

    }
    console.log(data);

    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button
                    text={"새 일기쓰기"}
                    type={"POSITIVE"}
                    onClick={()=> nav("/new")}
                ></Button>
            </div>
            <div className="list_wrapper">
                {
                    data.map((item)=> <DiaryItem key={item.id} {...item}></DiaryItem>)
                }
            </div>
        </div>
    )
}