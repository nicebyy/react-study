import Header from "../components/Header.tsx";
import Button from "../components/Button.tsx";
import {Editor} from "../components/Editor.tsx";

const New = () =>{

    return (
        <div>
            <Header
                title={"새 일기 쓰기"}
                leftChild={<Button text={"< 뒤로가기"}/>}
            />
            <Editor
            />

        </div>
    );

}

export default New;