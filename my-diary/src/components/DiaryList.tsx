import Button from "./Button.tsx";
import "./DiaryList.css"
import {DiaryItem} from "./DiaryItem.tsx";
import {DiaryType} from "../util/MockData.ts";
import {useNavigate} from "react-router-dom";
import {ChangeEventHandler, useState} from "react";
import {usePageTitle} from "../hooks/usePageTitle.tsx";

interface DiaryListProps {
    data: DiaryType[];
}

export const DiaryList = ({data} : DiaryListProps)=>{
    usePageTitle(`일기 목록`);

    const nav = useNavigate();
    const [sortType, setSortType] = useState<string>("latest");

    const onChangeSortType : ChangeEventHandler<HTMLSelectElement> = (e)=>{
        setSortType(e.target.value);
    }

    const getSortedDate = ()=>{
        return data.sort((o1,o2) => sortType == "oldest" ?
            o1.createdDate - o2.createdDate : o2.createdDate - o1.createdDate);
    }

    // const sortedData = getSortedDate();

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
                    getSortedDate().map((item)=> {
                        return <DiaryItem key={item.id} {...item}></DiaryItem>;
                    })
                }
            </div>
        </div>
    )
}