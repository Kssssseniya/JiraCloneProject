import { AnyAction, createSlice } from '@reduxjs/toolkit'
interface ToDoState {
    todos: ToDoType []
    // stateModalWindow: boolean
}
// interface DasksType {
//     title: string,
//     id: number,
//     item: ToDoType[],
//     order: number
// }
export interface ToDoType {
    title: string,
    id: number
    resume?: string,
    status: string,
    author?: string[],
    type?: string,
    executor?: string[],
    childItem?: ToDoType[],
    stateModalWindow: boolean,
}
const initialState: ToDoState ={
    todos: [],
}
export const todoSlice = createSlice({
    name: 'jira',
    initialState,
    reducers:{
        addTodo(state, {payload, type}){
            state.todos.push(payload)
        },
        changeDragTask(state, {payload, type}){
        //ПОДЕЛИТЬ ПО СТАТУСАМ!!!
        //    const filterTodo =  state.todos.filter((i)=>i.status === state.todos[payload.hoverIndex].status)
        //    const filterTodo1 =  state.todos.filter((i)=>i.status !== state.todos[payload.dragIndex].status)    
           const index= state.todos[payload.dragIndex]
            const newTodo = state.todos.filter((i,index)=>index !== payload.dragIndex)   
            newTodo.splice(payload.hoverIndex, 0, index) 
            state.todos =  newTodo
            // console.log(state.todos[payload.dragIndex].status)
                },
        changeTaskDragAndDrop(state, {payload, type}){
            
            const element=state.todos.filter((item)=>item.id === payload.item.id) 
            element.map((item)=>{
               
                   return item.status = payload.status
            
            })
        },
        ChangeTitle(state, {payload, type}){
          const element=  state.todos.filter(item=>item.id===payload.list.id)
          element.map(item=>item.title=payload.item)
        },
        ChangeResume(state, {payload, type}){
            const element=  state.todos.filter(item=>item.id===payload.list.id)
            element.map(item=>item.resume=payload.item)
        },
        ChangeStatus(state, {payload, type}){
            const element=  state.todos.filter(item=>item.id===payload.list.id)
            element.map(item=>item.status=payload.item)
            element.map(item=>item.stateModalWindow=true)
            
        },
        ChangeStateModalWindow(state, {payload, type}){
            const element=  state.todos.filter(item=>item.id===payload.list.id)
            element.map(item=>item.stateModalWindow=payload.item)
        },
        deleteTask(state, {payload, type}){
            state.todos = state.todos.filter(item => item.id !== payload.id)
        },
        addChildTask(state, {payload, type}){
        //    const  elem = state.todos.filter(item=>item.childItem === payload.item)
        //    elem.filter(item=>item.id === payload.id)
        //    elem.map(item=>item.childItem?.push(payload.newItem))
            // console.log( state.todos.filter(item=>item.childItem==payload.item))
           state.todos
           .filter(item=>item.id === payload.item.id)
           .map(item=>item.childItem?.push(payload.newItem))
        },
        addChildTaskForChild(state, {payload, type}){
           
            const elem = (a:any)=>a.childItem.forEach((j:any)=>{
                if(j.id===payload.item.id){
                    console.log(j.id===payload.item.id)
                    return j.childItem?.push(payload.newItem)
                    
                 }else{
                    return elem(j)
                 }
            })
             state.todos
            .map(item=>item.childItem?.forEach((x)=>{
                    if(x.id===payload.item.id){
                       return x.childItem?.push(payload.newItem)
                    }else{
                        elem(x)
                    }
                }))

        }
    }
})
export default todoSlice.reducer;
export const { addTodo, changeDragTask, changeTaskDragAndDrop, ChangeTitle, ChangeResume, ChangeStatus, ChangeStateModalWindow, deleteTask, addChildTask, addChildTaskForChild} = todoSlice.actions;