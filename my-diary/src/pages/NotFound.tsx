import {usePageTitle} from "../hooks/usePageTitle.tsx";


const NotFound = () =>{
    usePageTitle(`어디갔노..`);
    return (
        <div>NotFound</div>
    );

}

export default NotFound;