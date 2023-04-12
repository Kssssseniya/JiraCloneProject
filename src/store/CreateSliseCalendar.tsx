import { AnyAction, createSlice } from '@reduxjs/toolkit'
interface CalendarType{
    events: EventObjType[]
}
interface EventObjType{
    id: number,
    title: string,
    start: any,
    end: any,
}

export const initialState: CalendarType ={
    events: []

}
export const todoSliceCalendar = createSlice({
    name: 'calendar',
    initialState,
    reducers:{
        addEvent(state, {payload, type}){

            state.events.push(payload)
        },
        eventResuze(state, {payload, type}){
            // state.events
            // .filter(item=>item.id === payload.id)
            // .map(item=>item=payload)
            // console.log(payload)
            state.events = payload
        }
   

    }
})
export default todoSliceCalendar.reducer;
export const { addEvent, eventResuze } = todoSliceCalendar.actions;