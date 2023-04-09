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
    history?: string[]
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
        if(payload.list.type==="parent task"){
          const element=  state.todos.filter(item=>item.id===payload.list.id)
          element.map(item=>item.history?.push(`${item.title} => ${payload.item}`))
          element.map(item=>item.title=payload.item)  
        }else{
            const elem = (a:any)=>a.childItem.forEach((j:any)=>{
                if(j.id===payload.list.id){
                    j.history?.push(`${j.title} => ${payload.item}`)
                    return j.title = payload.item
                    
                 }else{
                    return elem(j)
                 }
            })
             state.todos
            .map(item=>item.childItem?.forEach((x)=>{
                    if(x.id===payload.list.id){
                        x.history?.push(`${x.title} => ${payload.item}`)
                       return x.title = payload.item
                        
                        
                    }else{
                        elem(x)
                    }
                }))

        }
          
        },
        ChangeResume(state, {payload, type}){
            if(payload.list.type==="parent task"){
            const element=  state.todos.filter(item=>item.id===payload.list.id)
            element.map(item=>item.history?.push(`${item.resume} => ${payload.item}`))
            element.map(item=>item.resume=payload.item)
        }else{
            const elem = (a:any)=>a.childItem.forEach((j:any)=>{
                if(j.id===payload.list.id){
                    j.history?.push(`${j.resume} => ${payload.item}`)
                    return j.resume = payload.item
                    
                 }else{
                    return elem(j)
                 }
            })
             state.todos
            .map(item=>item.childItem?.forEach((x)=>{
                    if(x.id===payload.list.id){
                        x.history?.push(`${x.resume} => ${payload.item}`)
                       return x.resume = payload.item
                    }else{
                        elem(x)
                    }
                }))

        }
        },
        ChangeStatus(state, {payload, type}){
            if(payload.list.type==="parent task"){
                const element=  state.todos.filter(item=>item.id===payload.list.id)
                element.map(item=>item.history?.push(`${item.status} => ${payload.item}`))
                element.map(item=>item.status=payload.item)
                element.map(item=>item.stateModalWindow=true)
                  
            }else{
                const elem = (a:any)=>a.childItem.forEach((j:any)=>{
                    if(j.id===payload.list.id){
                        j.history?.push(`${j.status} => ${payload.item}`)
                        return j.status = payload.item
                        
                     }else{
                        return elem(j)
                     }
                })
                 state.todos
                .map(item=>item.childItem?.forEach((x)=>{
                        if(x.id===payload.list.id){
                            x.history?.push(`${x.status} => ${payload.item}`)
                           return x.status = payload.item
                        }else{
                            elem(x)
                        }
                    }))
            }
            
            
        },
        ChangeStateModalWindow(state, {payload, type}){
            const element=  state.todos.filter(item=>item.id===payload.list.id)
            element.map(item=>item.stateModalWindow=payload.item)
        },
        deleteTask(state, {payload, type}){
            state.todos = state.todos.filter(item => item.id !== payload.id)
        },
        addChildTask(state, {payload, type}){
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

        },
        changeChildTaskStatus(state, {payload, type}){
            const elem = (a:any)=>a.childItem.forEach((j:any)=>{
                if(j.id===payload.item.id){
                    j.history?.push(`${j.status} => ${payload.newStatus}`)
                    return j.status = payload.newStatus
                    
                 }else{
                    return elem(j)
                 }
            })
             state.todos
            .map(item=>item.childItem?.forEach((x)=>{
                    if(x.id===payload.item.id){
                        x.history?.push(`${x.status} => ${payload.newStatus}`)
                       return x.status = payload.newStatus
                    }else{
                        elem(x)
                    }
                }))
        },
        deleteChildTask(state, {payload, type}){
            console.log(payload.item) 
            const elem = (a:any)=>a.childItem.forEach((j:any)=>{
                if(j.id===payload.item.id){
                    console.log(j.id === payload.item.id) 
                    return a.childItem = a.childItem.filter((y:any)=>y.id!==payload.item.id)
                 }else{
                    return elem(j)
                 }
            })
            state.todos
            .map(item=> item.childItem?.forEach((x,ind)=>{
                    if(x.id===payload.item.id){
                       return item.childItem= item.childItem?.filter(y=>y.id!==payload.item.id)
                    }else{
                        return elem(x)
                    }
                }))
                
        }
    }
})
export default todoSlice.reducer;
export const { addTodo, changeDragTask, changeTaskDragAndDrop, ChangeTitle, ChangeResume, ChangeStatus, ChangeStateModalWindow, deleteTask, addChildTask, addChildTaskForChild,changeChildTaskStatus, deleteChildTask} = todoSlice.actions;