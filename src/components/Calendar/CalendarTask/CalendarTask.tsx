import { Button, TextField } from '@mui/material'
import { FlexContainer } from '../../../styledComponents/FlexContainer'
import './CalendarTask.scss'
import { DatePicker, TimePicker, DateTimePicker } from '@mui/x-date-pickers'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { EventFormType } from '../CalendarForm/CalendarForm'
import dayjs from 'dayjs';

interface CalendarTaskType{
    item: EventFormType,
    newEvent?: EventFormType,
    addNewEvent: (newEvent:EventFormType)=>void
    stateForm: boolean,
    closeForm: ()=>void,
    deleteEvent: any
    delEvent?: EventFormType,
}

const CalendarTask =({item, newEvent, addNewEvent, stateForm, closeForm, deleteEvent, delEvent}:CalendarTaskType)=>{
    // const  [stateForm, setForm]:any = useState('')
    // console.log(item.start)
    // const  [stateEvent, setEvent]:any = useState({title: item.title, start: item.start, end: item.end})
    const  [stateTitle, setTitle] = useState<boolean>(true)
    const  [stateItemTitle, setItemTitle] = useState<string>(item.title)
    const  [stateStart, setStart]:any = useState(item.start)
    const  [stateEnd, setEnd]:any = useState(item.end)
       console.log(item)
    useEffect(()=>{
        if(item.start!==undefined){
          setStart(`${item.start.getFullYear()}-${(item.start.getMonth()+1).lenght>1?item.start.getMonth()+1:"0"+(item.start.getMonth()+1)}-${item.start.getDate()}T${item.start.getMinutes()?item.start.getMinutes():"00"}:${item.start.getSeconds()?item.start.getSeconds():"00"}`)   
        }
        if(item.end!==undefined){
            setEnd(`${item.end.getFullYear()}-${(item.end.getMonth()+1).lenght>1?item.end.getMonth()+1:"0"+(item.end.getMonth()+1)}-${item.end.getDate()}T${item.end.getMinutes()?item.end.getMinutes():"00"}:${item.end.getSeconds()?item.end.getSeconds():"00"}`) 
        }
        // console.log(stateStart)
    },[item])
    useEffect(()=>{
        setItemTitle(item.title)
        
    },[item])
    const calendarFormHandler =()=>{
        newEvent = {
            id: item.id,
            title: stateItemTitle,
            start: item.start,
            end: item.end,
            
        }
        addNewEvent(newEvent)
        setTitle(false)
        // setEvent({title: '', start: null, end: null})

    }
    // onChange={(newValue:any) => setEvent({...stateEvent, end: newValue})}
    const deleteEventHandler=()=>{
        delEvent = item
        deleteEvent(delEvent)
    }
    const keyDownHandler = (event:any) => {
        if(event.keyCode === 13) {
            calendarFormHandler()
        }
      }
    return(
        <>
        {stateForm?(
            <FlexContainer className='TaskCalendar_Wrapper' direction='column' gap='20px' align='flex-start' justify='flex-start' padding='15px' width='400px' >
                {/* {stateTitle?(
                    <p onDoubleClick={()=>setTitle(true)}>{item.title}</p>
                ):( */}
                <FlexContainer justify='flex-end' width='100%' >
                     <button onClick={deleteEventHandler} className='BtnDelete' color="secondary"><svg viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" fill="#8c1d82"></path><path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" fill="#8c1d82"></path></g></svg></button> 
                </FlexContainer>  
                <FlexContainer justify='space-between' width='100%' >
                    <TextField value={stateItemTitle} onChange={(e)=>setItemTitle( e.target.value)} size="small"  id="outlined-basic"  variant="outlined" onKeyDown={keyDownHandler}  />
                </FlexContainer>
               
                {/* )}    */}
                <FlexContainer gap='10px' width='100%' justify='space-between'>

                    <DateTimePicker
                    // type='datetime-local'
                    // label="Event start"
                    // '2023-04-29T00:06'
                    value={dayjs(stateStart)}
                    onChange={(e) =>{ 
                        setStart(e)
                        console.log(stateStart)
                        console.log(typeof(stateStart))
                    }}
                    />
                </FlexContainer>
                <FlexContainer gap='10px' width='100%' justify='space-between'>

                    <DateTimePicker
                    label="Event end"
                    value={dayjs(stateEnd)}
                    // onChange={(newValue:any) => setEvent({...stateEvent, end: newValue})}
                    />
                </FlexContainer>
                    <FlexContainer width='100%' gap='30px' >
                    <button onClick={calendarFormHandler} className='BtnAdd' color="secondary">Save Task</button> 
                    <button onClick={closeForm} className='BtnAdd' color="secondary">Close</button>  
                     </FlexContainer>
            </FlexContainer>
            ):(<></>)}
        </>
    )
}
export default CalendarTask