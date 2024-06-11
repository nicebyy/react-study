
export const Controller = ({onClickButton} : {onClickButton : (value : number) => void})=>{

    interface CountButton {
        value : number;
    }

    const countButtonArray: CountButton[] = [];
    countButtonArray.push(
        {value: -1},
        {value: -10},
        {value: -100},
        {value: 100},
        {value: 10},
        {value: 1}
    );

    return (
        <div>
            {
                countButtonArray.map(btn=>(
                    <button onClick={()=>onClickButton(btn.value)}>
                    {btn.value}
                    </button>
                ))
            }
        </div>
    )
}