import { ToDoType } from "../../store/createSlice"
import { FlexContainer } from "../../styledComponents/FlexContainer"
import { useState } from "react"
import './Form.scss'
interface FormForChildTaskType{
    NewChilditem?: ToDoType,
    addNewChildTask: any,
    onClose: ()=>void,
    stateForm: boolean
}


const FormForChildTask=({NewChilditem, addNewChildTask, onClose, stateForm}:FormForChildTaskType)=>{
    const [valueTitle, setValueTutle] = useState("")
    const addNewTask =()=>{
        if(valueTitle!==''&&valueTitle!==''){
            NewChilditem = {
            title: valueTitle,
            id: new Date().getTime(),
            status: "Open",
            stateModalWindow: false,
            type: 'child task',
            childItem: [],
            history: [],
        }
    }
        setValueTutle("")
        addNewChildTask(NewChilditem)

    }
    const keyDownHandler = (event:any) => {
        if(event.keyCode === 13) {
            addNewTask()
        }
      }
    const closeForm =()=>{
        setValueTutle("")
        onClose()
    }
    
    return(
        <>
        {stateForm?(
        <FlexContainer justify='flex-start' className ="FormForChildTask">
            <input value={valueTitle} onChange = {(e)=>setValueTutle(e.target.value)} type={"text"} placeholder = "Add title" onKeyDown={keyDownHandler}/>
            <FlexContainer className ="FormForChildTask_Btn" gap='5px'>
               <button onClick={addNewTask}  >&#10004;</button>
                <button onClick={closeForm}>&#10008;</button> 
            </FlexContainer>
        </FlexContainer>
        ):(<></>)}</> 
    )
}
export default FormForChildTask