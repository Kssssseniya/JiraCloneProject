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



    }
})
export default todoSliceDask.reducer;
export const { addDask, addItemInDask} = todoSliceDask.actions;