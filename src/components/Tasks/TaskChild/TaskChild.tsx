import { ToDoType } from "../../../store/createSlice"
import { useAppSelector } from "../../../hooks/redux"
import { useState } from "react"
import ModalTask from "../../ModalTask/ModalTask"
import { todoSlice } from "../../../store/createSlice"
import './TaskChild.scss'
import { FlexContainer } from "../../../styledComponents/FlexContainer"
interface TaskChildType{
    item: ToDoType
}


const TaskChild=({item}:TaskChildType)=>{
    const {dasks} = useAppSelector(state => state.dasks)
    const  [stateChildModalWindow, setChildModalWindow]:any = useState(false)
    const {addChildTaskForChild } = todoSlice.actions
    const OptionTypes = dasks
    .filter(item=>item.id<=3)
    .map((item)=><option key={item.id} value={item.title}>{item.title}</option>)
    return(
        <>
        <div className="TaskChild" onClick={()=>setChildModalWindow(true)}>
            <FlexContainer justify='space-between'>
               <p>{item.title}</p>
            <select onClick={(e)=> e.stopPropagation()}>
                {OptionTypes}
            </select>  
            </FlexContainer>
        </div>
        <ModalTask list={item} stateModalTask={stateChildModalWindow} onClose={()=>setChildModalWindow(false)} addNewChildTask={addChildTaskForChild}/>
        </>
    )
}
export default TaskChild