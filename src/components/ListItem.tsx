import React, {FC, PropsWithChildren, useState, useRef} from 'react';
import { ToDoType } from '../store/createSlice';
import { FlexContainer } from '../styledComponents/FlexContainer';
import TasksItem from './Tasks/TasksItem';
import { useAppSelector } from '../hooks/redux';
import { todoSlice } from '../store/createSlice';
import { useAppDispatch } from '../hooks/redux';
import { useDrop, useDrag } from 'react-dnd';
import DropContainer from './DragWrapper';
import BtnAddList from './Buttons';
import ModalDelete from './ModalDelete/ModalDelete';
import { todoSliceDask } from '../store/CreateSliseDask';

interface List {
    title: string
    id: number
    item?: ToDoType[]
    order: number,

}
interface ListItemProps {
    list: List[];
    addTask: any;
    changeOrder?: any;
    addList: any;
}

const ListItem: FC<PropsWithChildren<ListItemProps>> = ({list, addTask, children, changeOrder,addList})=>{
    const {  changeTaskDragAndDrop,} = todoSlice.actions
    const {  deleteDask } = todoSliceDask.actions
    const dispatch = useAppDispatch()
    const {todos} = useAppSelector(state=>state.todos)
    const  [stateModalDelete, setStateModalDelete]:any = useState(false)
    const  [stateDaskDel, setStateDaskDel]:any = useState(null)
    const onDrop = (item:any, monitor:any, status:any) => {
      dispatch(changeTaskDragAndDrop({item, status}))
    }
    const moveItem = (dragIndex:any, hoverIndex:any) => {
        const item = todos.filter((item,index)=>index!==dragIndex);
        // const item1 = todos.filter((item,index)=>index===hoverIndex);
        // dispatch(changeDragTask({dragIndex, hoverIndex}))
        // console.log(todos[hoverIndex].s)
        // console.log(item )
        
        console.log(todos)
      };
 

    return(
        <FlexContainer className = 'Lists_Container' gap ='40px' justify='flex-start' align='flex-start' padding='40px'>
            {list.map((item, id)=><><div key={item.id} className="List_item" >
                <div className='List_item_delCount'>{(item.id!==1&&item.id!==2&&item.id!==3)?(<button className='List_item__btnDel' onClick={(e)=>{
                    setStateModalDelete(true)
                    e.stopPropagation();
                    setStateDaskDel(item)
                }}>&#10006;</button>):<></> }</div>
                <FlexContainer>
                    <h3>{item.title}</h3>
                    <span>{todos.filter(x=>x.status===item.title).length}</span>  
                </FlexContainer>
             <DropContainer onDrop={onDrop} status={item.title}  >
                {todos
                .filter((y)=>y.status===item.title)
                .map((x,id)=>(
                   <TasksItem  moveItem={moveItem} key = {x.id} board ={item} item={x} index={id} status={x.status}  tasks = {item.item}/>  
                ))}
               
                </DropContainer>
             <button onClick={addTask}>
             <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 4.281v16.437A1.282 1.282 0 0 0 4.281 22h16.437A1.282 1.282 0 0 0 22 20.718V4.281A1.281 1.281 0 0 0 20.719 3H4.28A1.281 1.281 0 0 0 3 4.281zM20.719 4a.281.281 0 0 1 .281.281V20.72a.281.281 0 0 1-.281.281H4.28a.281.281 0 0 1-.28-.282V4.28A.281.281 0 0 1 4.281 4zM12 13H7v-1h5V7h1v5h5v1h-5v5h-1z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
            </button> 
            </div>
         
           </>)  
            }
              <ModalDelete list={stateDaskDel} deleteTask={()=> {
            dispatch(deleteDask({
                item: stateDaskDel,
                todos: todos.findIndex(x=>x.status === stateDaskDel.title)}))
            setStateModalDelete(false)
            }} closeModalDelete={()=>setStateModalDelete(false)} stateModalDelete={stateModalDelete}/>
            <BtnAddList addList={addList}/>
            
     </FlexContainer>  
    )
}
export default ListItem