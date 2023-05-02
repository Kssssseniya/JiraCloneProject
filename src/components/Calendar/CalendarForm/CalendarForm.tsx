import {  TextField } from '@mui/material'
import { FlexContainer } from '../../../styledComponents/FlexContainer'
import './CalendarForm.scss'
import { DateTimePicker } from '@mui/x-date-pickers'
import { useState } from 'react'

interface CalendarFormType{
    newEvent?: EventFormType,
    addNewEvent: (newEvent:EventFormType)=>void
    stateForm: boolean,
    closeForm: ()=>void
}
export interface EventFormType{
    id: number,
    title: string,
    start: any,
    end: any,
}
const CalendarForm =({newEvent, addNewEvent, stateForm, closeForm}:CalendarFormType)=>{
    const  [stateEvent, setEvent]:any = useState({title: '', start: null, end: null})
    const calendarFormHandler =()=>{
        console.log(stateEvent.start)
        newEvent = {
            id: new Date().getTime(),
            title: stateEvent.title,
            start: stateEvent.start.toDate(),
            end: stateEvent.end.toDate(),
            
        }
       
        setEvent({title: '', start: null, end: null})
        addNewEvent(newEvent)
    }
    const keyDownHandler = (event:any) => {
        if(event.keyCode === 13) {
            calendarFormHandler()
        }
      }
    return(
        <>
        {stateForm?(
            <FlexContainer className='FormCalendar_Wrapper' direction='column' gap='20px' align='flex-start' padding='15px' width='400px' >
                <FlexContainer justify='space-between' width='100%' >
                    <TextField value={stateEvent.title} onChange={(e)=>setEvent({...stateEvent, title: e.target.value})} size="small"  id="outlined-basic" label="Title" variant="outlined" onKeyDown={keyDownHandler} /> 
                </FlexContainer>    
                <FlexContainer gap='10px' width='100%' justify='space-between'>
                    <DateTimePicker
                    label="Event start"
                    value={stateEvent.start}
                    onChange={(newValue:any) => setEvent({...stateEvent, start: newValue})}
                    />
                </FlexContainer>
                <FlexContainer gap='10px' width='100%' justify='space-between'>
                    <DateTimePicker
                    label="Event end"
                    value={stateEvent.end}
                    onChange={(newValue:any) => setEvent({...stateEvent, end: newValue})}
                    />
                </FlexContainer>
                    <FlexContainer width='100%' gap='30px' >
                    <button onClick={calendarFormHandler} className='BtnAdd' color="secondary">Add Task</button> 
                    <button onClick={closeForm} className='BtnAdd' color="secondary">Close</button>  
                     </FlexContainer>
            </FlexContainer>
            ):(<></>)}
        </>
    )
}
export default CalendarForm