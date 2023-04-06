import './ModalTask.scss'
import { ToDoType } from '../../store/createSlice'
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import { todoSlice } from '../../store/createSlice';
import React, {FC, PropsWithChildren, useState, useRef, ChangeEvent} from 'react';
import { FlexContainer } from '../../styledComponents/FlexContainer';
interface ModalTaskType{
    list: ToDoType,
    stateModalTask: boolean,
    onClose: ()=>void
}

const ModalTask: FC<PropsWithChildren<ModalTaskType>> = ({list, stateModalTask, onClose})=>{
    const {dasks} = useAppSelector(state => state.dasks)
    // const {stateModalWindow} = useAppSelector(state => state.todos)
    const {ChangeTitle, ChangeResume, ChangeStatus, ChangeStateModalWindow } = todoSlice.actions
    const dispatch = useAppDispatch()
    const taskTypes = dasks.map((item)=><option key={item.id}  value={item.title}>{item.title}</option>)
    const  [stateTitle, setTitle]:any = useState(true)
    const  [stateRsume, setRsume]:any = useState(true)
    const  [stateChangeTitle, setChangeTitle]:any = useState(list.title)
    const  [stateChangeResume, setChangeResume]:any = useState(list.resume)
    const  [stateChangeState, setChangeState]:any = useState(list.status)

    const inputTitleHandler=()=>{
        dispatch(ChangeTitle({
            list: list,
            item: stateChangeTitle}))
        setTitle(true)
    }
    const inputResumeHandler=()=>{
        dispatch(ChangeResume({
            list: list,
            item: stateChangeResume}))
            setRsume(true)
    }
    // const ChandeStatus=(e:ChangeEvent<HTMLSelectElement>)=>{
    //     // console.log(stateChangeState)
    //     setChangeState(e.target.value)
    //     console.log(stateChangeState)
    //        dispatch(ChangeStatus({
    //         list: list,
    //         item: stateChangeState}))  
   
       
    // }
    return(
        <>
        {stateModalTask?(
        <div>
            {
                
                    <div className="ModalTask">
                     <button className="ModalTask_Close" onClick={onClose}>x</button>
                     <div className="ModalTask_Wrapper">
                        <div className="Wrapper_Left">
                            <div className="Wrapper_Form">
                                 {stateTitle?(
                                <h3 onDoubleClick={()=>setTitle(false)}>{list.title}</h3>  
                            ):(
                                <FlexContainer justify='start' gap='5px'>
                                  <input value={stateChangeTitle} onChange={(e)=>setChangeTitle(e.target.value)}/>
                                  <button onClick={inputTitleHandler}>change</button>
                                  <button onClick={()=>setTitle(true)}>x</button>    
                                </FlexContainer>
                                 
                            )}
                                <button>Add child task</button>
                                <p>Description</p>
                                {stateRsume?(
                                    <p className="ModalTask_Resume" onDoubleClick={()=>setRsume(false)}>{list.resume}</p>
                                 ):(
                                    <FlexContainer className="ModalTask_Resume" justify='start' gap='5px'>
                                   <input value={stateChangeResume} onChange={(e)=>setChangeResume(e.target.value)}/> 
                                   <button onClick={inputResumeHandler}>change</button>
                                   <button onClick={()=>setRsume(true)}>x</button>  
                                   </FlexContainer>  
                                )}
                            </div>
                            <div>
                                <p>Activity:</p>
                            </div> 
                        </div>
                        <div>
                        <select value={stateChangeState} onChange={(e)=>{
                            setChangeState(e.target.value)
                             dispatch(ChangeStatus({
                                list: list,
                                item: e.target.value})) 
                        }}>
                            {taskTypes}
                        </select>
                        </div>
                     </div>  
                    </div>    
              
             }    
       </div>):(
        <></>
       )
    }  
    </> 
    )
}
export default ModalTask