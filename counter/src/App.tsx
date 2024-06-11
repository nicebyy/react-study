import { useState } from "react";
import "./App.css"
import { Controller } from "./components/Controller";
import { Viewer } from "./components/Viewer"

const App = () => {

  const [count,setCount] = useState<number>(0);

  const onClickButton = (value:number) => setCount(count+value);

  return (
    <div className='App'>

      <h1>Simple counter</h1>

      <section>
        <Viewer count={count}/>
      </section>

      <section>
        <Controller onClickButton={onClickButton}/>
      </section>
    </div>
  );
};

export default App;