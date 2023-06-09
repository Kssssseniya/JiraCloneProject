import { AnyAction, createSlice } from '@reduxjs/toolkit'
import { ToDoType } from './createSlice'
interface DasksSliseType {
    dasks: DasksType[]
}
export interface DasksType {
    title: string,
    id: number,
    item: ToDoType[],
    order: number
}

export const initialState: DasksSliseType ={
    dasks: [{
        id: 1,
        title: "Open",
        item: [],
        order: 1
      },
      {
        id: 2,
        title: "In Progress",
        item: [],
        order: 2,
      },
      {
        id: 3,
        title: "Done",
        item: [],
        order: 3
      }
      ],

}
export const todoSliceDask = createSlice({
    name: 'dask',
    initialState,
    reducers:{
        addDask(state, {payload, type}){

            state.dasks.push(payload)
        },
        addItemInDask(state, {payload, type}){
        const element=  state.dasks.filter((item)=>item.title === payload.type) 
        element.map((item)=>item.item.push(payload))
        },
        deleteDask(state, {payload, type}){
            if(payload.todos!==-1){
                alert("В доске есть задачи, невозможно удалить доску")
                
            }else{
               state.dasks = state.dasks.filter(item => item.id !== payload.item.id) 
            }    
        }


    }
})
export default todoSliceDask.reducer;
export const { addDask, addItemInDask, deleteDask} = todoSliceDask.actions;