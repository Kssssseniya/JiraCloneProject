import { Button, TextField } from '@mui/material'
import { FlexContainer } from '../../../styledComponents/FlexContainer'
import './CalendarForm.scss'
import { DatePicker, TimePicker, DateTimePicker } from '@mui/x-date-pickers'
import { useState } from 'react'
import moment from 'moment'

interface CalendarFormType{
    newEvent?: EventFormType,
    addNewEvent: (newEvent:EventFormType)=>void
}
interface EventFormType{
    id: number,
    title: string,
    start: any,
    end: any,
}
const CalendarForm =({newEvent, addNewEvent}:CalendarFormType)=>{
    // const  [stateTitle, setTitle]:any = useState('')
    const  [stateEvent, setEvent]:any = useState({title: '', start: null, end: null})
    const calendarFormHandler =()=>{
        newEvent = {
            id: new Date().getTime(),
            title: stateEvent.title,
            start: stateEvent.start.toDate(),
            end: stateEvent.end.toDate(),
            
        }

        console.log(newEvent)
        // console.log(stateDateStart)
        setEvent({title: '', start: null, end: null})
        // setDatestart(null)
        // setDateEnd(null)
        // setTimeStart(null)
        // setTimeEnd(null)
        addNewEvent(newEvent)
    }
    return(
        <>
            <FlexContainer className='FormCalendar_Wrapper' direction='column' gap='20px' align='flex-start' padding='15px'>
            <TextField value={stateEvent.title} onChange={(e)=>setEvent({...stateEvent, title: e.target.value})} size="small"  id="outlined-basic" label="Title" variant="outlined" />
            <FlexContainer gap='5px'>
            <DateTimePicker
                label="Controlled picker"
                value={stateEvent.start}
                onChange={(newValue:any) => setEvent({...stateEvent, start: newValue})}
                />
            </FlexContainer>
            <FlexContainer gap='5px'>
            <DateTimePicker
                label="Controlled picker"
                value={stateEvent.end}
                onChange={(newValue:any) => setEvent({...stateEvent, end: newValue})}
                />
            </FlexContainer>
            <Button onClick={calendarFormHandler} className='BtnAdd' color="secondary">Add Task</Button>
            </FlexContainer>
        </>
    )
}
export default CalendarForm