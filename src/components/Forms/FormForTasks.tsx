import { useEffect, useState } from "react"
import { useAppSelector } from "../../hooks/redux"
import { FlexContainer } from "../../styledComponents/FlexContainer"
const FormForTasks = ({Newitem, stateFormTask, addDispatch, closeForm}:any) =>{
    const {dasks} = useAppSelector(state => state.dasks)
    const {todos} = useAppSelector(state => state.todos)
      const firstType = dasks.filter(item =>item.order=== 1)
      const firstTypetext = firstType.map(item=>item.title).join()
    const [valueTitle, setValueTutle] = useState("")
    const [valueResume, setResume] = useState("")
    const [valueType, setType]= useState(firstTypetext)
    const taskTypes = dasks.map((item)=><option key={item.id} value={item.title}>{item.title}</option>)
   
    useEffect(()=>{
        setType(firstTypetext )
        // console.log(valueType)  
    },[dasks])
   
    const addNewTask =()=>{
        if(valueTitle!==''&&valueTitle!==''&&valueResume!==''&&valueResume!==' '){
            Newitem = {
            title: valueTitle,
            id: new Date().getTime(),
            status: valueType,
            resume: valueResume, 
            stateModalWindow: false,
            childItem: [],
        }
        
        setValueTutle("")
        setResume("")
        setType(firstType.map(item=>item.title).join())
        console.log(firstType)
        addDispatch(Newitem )  
        }
    }
    const closeFormHandler=()=>{
        setValueTutle("")
        setResume("")
        closeForm()
    }
    return(
        <>
        {stateFormTask?(
          <div className="FormForTasks">
            <input value={valueTitle} onChange = {(e)=>setValueTutle(e.target.value)} type={"text"} placeholder = "Add title"/>
            <input value={valueResume} onChange = {(e)=>setResume(e.target.value)} type={"text"} placeholder = "Add resume"/>
            <select  onChange={(e)=>setType(e.target.value)}>
                {taskTypes}
            </select>
            <FlexContainer gap = '10px'>
                <button onClick={closeFormHandler}>Close</button>  
                <button onClick={addNewTask}>Add Task</button>
            </FlexContainer>
         

        </div>  
         ):(
            <></>
         )
        }
       </> 
       
      
    )
}
export default FormForTasks