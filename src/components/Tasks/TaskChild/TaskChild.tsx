import { ToDoType } from "../../../store/createSlice"
import { useAppSelector } from "../../../hooks/redux"
import { useState} from "react"
import ModalTask from "../../ModalTask/ModalTask"
import { todoSlice } from "../../../store/createSlice"
import { useAppDispatch } from "../../../hooks/redux"
import './TaskChild.scss'
import { FlexContainer } from "../../../styledComponents/FlexContainer"
import ModalDelete from "../../ModalDelete/ModalDelete"
interface TaskChildType{
    item: ToDoType,
}


const TaskChild=({item}:TaskChildType)=>{

    const {dasks} = useAppSelector(state => state.dasks)

    const dispatch = useAppDispatch()

    const  [stateChildModalWindow, setChildModalWindow] = useState<boolean>(false)
    const  [stateChangeState, setChangeState] = useState<string>(item.status)
    const  [stateBtnDelete, setBtnDelete] = useState<boolean>(false)
    const {addChildTaskForChild, changeChildTaskStatus, deleteChildTask } = todoSlice.actions
    const OptionTypes = dasks
    .map((item)=><option key={item.id} value={item.title}>{item.title}</option>)
    return(
        <>
        <div className="TaskChild" onClick={()=>{
            setChildModalWindow(true)
            }}>
            <div className="TaskChild__Close">
                <button onClick={(e)=>{
                    e.stopPropagation()
                    setBtnDelete(true)
                    }}>x</button>
            </div>
            <FlexContainer justify='space-between'>     
                <p>{item.title}</p>
            <select value={item.status} onChange={(e)=>{
                setChangeState(e.target.value)
                dispatch(changeChildTaskStatus({item: item, newStatus: e.target.value}))}   
            }
                 onClick={(e)=> e.stopPropagation()}>
                {OptionTypes}
            </select>      
            </FlexContainer>
        </div>
        <ModalTask list={item} stateModalTask={stateChildModalWindow} onClose={()=>setChildModalWindow(false)} addNewChildTask={addChildTaskForChild}/>
        <ModalDelete list={item} deleteTask={()=>{
            setChildModalWindow(false)
            setBtnDelete(false)
            dispatch(deleteChildTask({item:item}))
        }} closeModalDelete={()=>setBtnDelete(false)} stateModalDelete={stateBtnDelete}/>
        </>
    )
}
export default TaskChild