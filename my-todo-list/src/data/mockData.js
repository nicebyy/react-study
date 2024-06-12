
let idSequance = 0;

const todoData = (isDone,content) =>{

    return {
        id : ++idSequance,
        isDone : isDone,
        content : content,
        date : new Date().getTime()
    }
}

export { todoData, idSequance };
