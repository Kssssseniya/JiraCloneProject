import { useAppSelector } from "../../hooks/redux"
import { todoSlice } from "../../store/createSlice";
import { useAppDispatch } from "../../hooks/redux";
import { useDrag, useDrop, DragSourceMonitor, DragPreviewImage } from "react-dnd";
import type { Identifier, XYCoord } from 'dnd-core'
import type { FC } from 'react'
import React, { useRef, useState } from 'react';
import { ToDoType } from "../../store/createSlice";
import { FlexContainer } from "../../styledComponents/FlexContainer";
import ModalTask from "../ModalTask/ModalTask";  
import ModalDelete from "../ModalDelete/ModalDelete";

const TasksItem: FC<any> =({tasks, item, index, board, moveItem, btnDelete}:any)=>{
    const { ChangeStateModalWindow, deleteTask, addChildTask} = todoSlice.actions
    const dispatch = useAppDispatch()
    const  [stateModalDelete, setStateModalDelete]:any = useState(false)
    // const {stateModalWindow} = useAppSelector(state=>state.todos)
    const ref= useRef<HTMLDivElement>(null);
    const [,drop] = useDrop<any>({
        accept: 'BOX',
        hover(item:any, monitor:any){
            if(!ref.current){
                return;
            }
            const dragIndex = item.index;
            // console.log(item)
            const hoverIndex = index
            if (dragIndex === hoverIndex){
                return;
            }
            const hovererdRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hovererdRect.bottom - hovererdRect.top) / 2;
            const mousePostion = monitor.getClientOffset();
            const hoverClientY = (mousePostion as XYCoord).y - hovererdRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
            }
            if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
            return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
            // console.log(item)

        }
    })
    const [{ isDragging }, drag, preview] = useDrag({
        type: 'BOX',
        item: ()=>{
            return {...item, index}
        }, 
        collect: (monitor : DragSourceMonitor) => ({
            isDragging: monitor.isDragging()
            
        })
})
const opacity = isDragging ? 0 : 1
const [show, setShow] = useState(false);
const onOpen = () => dispatch(ChangeStateModalWindow({
    list: item,
    item: true
}));
const onClose = () => dispatch(ChangeStateModalWindow({
    list: item,
    item: false
}));
const deleteTaskHandler = ()=> dispatch(deleteTask(item))
// const padding = 20;
  drag(drop(ref))
    return(
        <>
           <div ref={ref} style={{ opacity }}  className="TaskItem" key={item.id} onClick={onOpen}> 
           <button onClick={(e)=>{
            setStateModalDelete(true)
            e.stopPropagation();
            }}>x</button>
            <FlexContainer direction='column'>
                <h3>{item.title}</h3>
                <p>{item.resume}</p>  
            </FlexContainer>
            
           </div>        
           <ModalTask list={item} stateModalTask={item.stateModalWindow} onClose={onClose} addNewChildTask={addChildTask}/>
           <ModalDelete list={item} deleteTask={deleteTaskHandler} closeModalDelete={()=>setStateModalDelete(false)} stateModalDelete={stateModalDelete}/>
        </>
    )
}
export default TasksItem