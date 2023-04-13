import './ModalTask.scss'
import { ToDoType } from '../../store/createSlice'
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import { todoSlice } from '../../store/createSlice';
import React, {FC, PropsWithChildren, useState, useRef, ChangeEvent} from 'react';
import { FlexContainer } from '../../styledComponents/FlexContainer';
import FormForChildTask from '../Forms/FormForChildTask';
import ModalChildTask from '../Tasks/TaskChild/TaskChild';
import TaskChild from '../Tasks/TaskChild/TaskChild';
interface ModalTaskType{
    list: ToDoType,
    stateModalTask: boolean,
    onClose: ()=>void,
    addNewChildTask: any

}

const ModalTask: FC<PropsWithChildren<ModalTaskType>> = ({list, stateModalTask, addNewChildTask, onClose, })=>{
    const {dasks} = useAppSelector(state => state.dasks)
    // const {stateModalWindow} = useAppSelector(state => state.todos)
    const {ChangeTitle, ChangeResume, ChangeStatus, ChangeStateModalWindow, addChildTask, changeChildTaskStatus } = todoSlice.actions
    const dispatch = useAppDispatch()
    const taskTypes = dasks.map((item)=>{
        if(list.type==="parent task"){
          return <option key={item.id}  value={item.title}>{item.title}</option> 
        }else{
            if(item.id<=3){
            return    <option key={item.id}  value={item.title}>{item.title}</option>  
            }
        }
    
})
    const  [stateTitle, setTitle]:any = useState(true)
    const  [stateRsume, setRsume]:any = useState(true)
    const  [stateChangeTitle, setChangeTitle]:any = useState(list.title)
    const  [stateChangeResume, setChangeResume]:any = useState(list.resume)
    const  [stateChangeState, setChangeState]:any = useState(list.status)
    // const  [stateStautsChild, setStautsChild]:any = useState(list.childItem?.map(item=>item.status))
    const  [stateChildForm, setChildForm]:any = useState(false)
    const  [stateChildModalWindow, setChildModalWindow]:any = useState(false)

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
    const keyDownTitleHandler = (event:any) => {
        if(event.keyCode === 13) {
            inputTitleHandler()
        }
      }
      const keyDownResumeHandler = (event:any) => {
        if(event.keyCode === 13) {
            inputResumeHandler()
        }
      }
    // const changeStatusHandler=()=>{
    //     dispatch(changeChildTaskStatus({
    //         item: list,
    //         newStatus: 
    //     }))
    // }
    // const ChandeStatus=(e:ChangeEvent<HTMLSelectElement>)=>{
    //     // console.log(stateChangeState)
    //     setChangeState(e.target.value)
    //     console.log(stateChangeState)
    //        dispatch(ChangeStatus({
    //         list: list,
    //         item: stateChangeState}))  
   
       
    // }
    const style = {
        width: '400px',
        height: '10px',
        backgroundColor: 'black',
        borderRadius: '10px',
      }
    const dasksStatus =  dasks.map(item=>item.title)
    const listStatus = list.childItem?.map(item=>item.status)
    // console.log(dasksStatus)
    for(let key in dasksStatus){
       let count = 0 
       list.childItem?.forEach(item=>{
            if(item.status===dasksStatus[key]){
                
                count +=1
               
            }
             
       })
       console.log(`${dasksStatus[key]} : ${count}`)
    }
    // console.log(list.childItem?.map(item=>item.status))
//    for(let key in list.childItem){
//         console.log(list.childItem[key])
//    }
    // const progressScale = 0

    return(
        <>
        {stateModalTask?(
        <div>
            {
                
                    <div className="ModalTask">
                     <button className="ModalTask_Close" onClick={onClose}>Back</button>
                     <div className="ModalTask_Wrapper">
                        <div className="Wrapper_Left">
                            <div className="Wrapper_Form">
                              <FlexContainer justify='space-between'> 
                                {stateTitle?(
                                <h3 onDoubleClick={()=>setTitle(false)}>{list.title}</h3>  
                                ):(
                                <FlexContainer justify='start' gap='5px'>
                                  <input value={stateChangeTitle} onChange={(e)=>setChangeTitle(e.target.value)} onKeyDown={keyDownTitleHandler}/>
                                  <button onClick={inputTitleHandler}>&#10004;</button>
                                  <button onClick={()=>setTitle(true)}>&#10008;</button>    
                                </FlexContainer>
                                 
                                )}
                             <select value={list.status} onChange={(e)=>{
                                    setChangeState(e.target.value)
                                    dispatch(ChangeStatus({
                                        list: list,
                                        item: e.target.value})) 
                                     }}>
                                    {taskTypes}
                                </select>
                            </FlexContainer>
                                <button className='Form_BtnAddChild' onClick={()=>setChildForm(true)}>Add child task</button>
                                <b>Description</b>
                                {stateRsume?(
                                   <>{list.resume?(<p className="ModalTask_Resume" onDoubleClick={()=>setRsume(false)}>{list.resume}</p>):(<p className="ModalTask_Resume" onDoubleClick={()=>setRsume(false)}>Add resume...</p>)}</> 
                                 ):(
                                    <FlexContainer  justify='start' gap='5px'>
                                   <input value={stateChangeResume} onChange={(e)=>setChangeResume(e.target.value)} onKeyDown={keyDownResumeHandler}/> 
                                   <button onClick={inputResumeHandler}>&#10004;</button>
                                   <button onClick={()=>setRsume(true)}>&#10008;</button>  
                                   </FlexContainer>  
                                )}
                            </div>
                            <div>
                                {/* <p>Progress:</p>
                                <div className='Progress_scale' style={{...style}}><span></span></div> */}
                            </div>
                            <div>
                                <b>Task:</b>
                                <div className='Left_TaskChilCont'>
                                <FlexContainer className='Left_TaskChilCont_item' direction='column-reverse' gap='10px' align='flex-start'>
                                      {list.childItem?.map(x=><TaskChild  item={x}/>) }
                                       <FormForChildTask addNewChildTask={(TaskiItem:any)=>{
                                        dispatch(addNewChildTask({item: list,newItem:TaskiItem}))
                                        setChildForm(false)
                                        }} stateForm={stateChildForm} onClose={()=>setChildForm(false)}/>
                                        
                                    </FlexContainer>
                                </div>
                            </div> 
                            <div className='Modal_Activity'>
                                <b>Activity:</b>
                               <div className='Modal__Activity_Scroll' > <FlexContainer className='Modal__Activity_Count' direction='column-reverse'  align='flex-start' gap='5px'>{list.history?.map(item=><p>{item}</p>)}</FlexContainer></div>
                            </div> 
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