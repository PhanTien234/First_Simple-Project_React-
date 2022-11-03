import Todolist from "./components/Todolist";
import Textfield from "@atlaskit/textfield"
import Button from "@atlaskit/button";
import { useCallback, useEffect, useState } from "react";
import { v4 } from 'uuid'
function App() {
  // state la cac du lieu noi tai cua component hien tai, props la cac du lieu dc truyen tu ben ngoai vao
  const TODO_APP_STORAGE_KEY = 'TODO_APP';
  const [todoList, setTodoList]= useState([]); // array
  const [textInput, setTextInput]= useState(""); // array

  useEffect(() =>{
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if(storagedTodoList){
      setTodoList(JSON.parse(storagedTodoList));
      }
    }, []
  )
  useEffect(() => {
      localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
    }, [todoList]
  
  );
  const onTextInputChange= useCallback((e) =>{
    setTextInput(e.target.value);
  }, []);
  const onAddBtnClick = useCallback((e)=>{
    // them text input vao todoList
      setTodoList([
        { id: v4(), name: textInput, isCompleted: false},
        ...todoList, 
      ]);

    setTextInput("");
    }, 
  [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) =>{
    setTodoList(prevState => 
      prevState.map((todo) => 
      todo.id === id ? {...todo, isCompleted:true} : todo
      )
    );
  }, []);
  return (
    <>
    <h3>TO DO LIST</h3>
    <Textfield name="add-todo" 
    placeholder="Add list need do..." 
    elemAfterInput={
      <Button isDisabled={!textInput} appearance="primary" onClick={onAddBtnClick}>
        Add
      </Button>
    }
    css={{padding: "2px 4px 2px"}}
    value={textInput}
    onChange= {onTextInputChange}
    ></Textfield>
    <Todolist todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>
    </>
  );
}

export default App;
