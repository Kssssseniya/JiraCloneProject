import React from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useState, useEffect } from 'react';
import { FlexContainer } from '../../../styledComponents/FlexContainer';
import CalendarForm from '../CalendarForm/CalendarForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './CalendarWindow.scss';
import globalize from 'globalize';
import { EventFormType } from '../CalendarForm/CalendarForm';
import CalendarTask from '../CalendarTask/CalendarTask';
const CalendarWindow=()=>{
  const localizer = globalizeLocalizer(globalize)
  const DnDCalendar = withDragAndDrop(Calendar);
    const  [stateEvent, setStateEvent] = useState<Array<EventFormType>>([])
    const  [stateForm, setForm] = useState<boolean>(false)
    const  [stateItem, setItem] = useState<any>({})
    const  [stateTask, setTask] = useState<boolean>(false)

    useEffect(() => { 
      const savedItem = localStorage.getItem("Event");
      if(savedItem){
        const parsedItem = JSON.parse(savedItem);
        parsedItem.forEach((item:EventFormType)=>{
          item.end = new Date(Date.parse(item.end))
          item.start = new Date(Date.parse(item.start))
        })
        setStateEvent(parsedItem || [])
      }
      
      },[]);

    useEffect(() => {
      if(stateEvent.length){
        localStorage.setItem("Event",JSON.stringify(stateEvent))
      } else{
        localStorage.setItem("Event","")
      }
      },[stateEvent]);

    const onEventResize: withDragAndDropProps['onEventResize']  = ({event, start, end, }:any) => {
      const updatedEvent = {...event, start, end,};
      setStateEvent((events:any) => {
         const filtered = events.filter((item:any)=>item.id!==event.id)
        return [...filtered, updatedEvent];
        });
      };

    const  onEventDrop: withDragAndDropProps['onEventDrop'] = ({event, start, end, }:any) => {
      const updatedEvent = {...event, start, end,};
        setStateEvent((events:any) => {
           const filtered = events.filter((item:any)=>item.id!==event.id)
          return [...filtered, updatedEvent];
          });
      };


    const addNewEvent =(NewEvent:EventFormType)=>{
      console.log(NewEvent)
      setStateEvent([...stateEvent, NewEvent])
      setForm(false)
    }

    const changeEvent =(NewEvent:EventFormType)=>{
     const changeEvents = stateEvent.filter((item:EventFormType)=>item.id !== NewEvent.id)
      setStateEvent([...changeEvents, NewEvent])
      setTask(false)
    }
    const deleteEvent = (delEvent:EventFormType)=>{
      setStateEvent(stateEvent.filter((item:EventFormType)=>item.id !== delEvent.id))
      localStorage.setItem("Event",JSON.stringify(stateEvent))
      setTask(false)
    }
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FlexContainer className='Calendar_Wrapper' justify='space-between'  gap='30px' padding=' 0  0  0 20px'>
            <DnDCalendar
            localizer={localizer}
            events={stateEvent}
           onDoubleClickEvent={(e)=>{

                setItem(e)
                setTask(true)
                console.log(stateItem)
                console.log(e)
              
            }}
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            style={{ height: 630, width: 850 }}
            />
            <button className='AddForm' onClick={()=>setForm(true)}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 4.281v16.437A1.282 1.282 0 0 0 4.281 22h16.437A1.282 1.282 0 0 0 22 20.718V4.281A1.281 1.281 0 0 0 20.719 3H4.28A1.281 1.281 0 0 0 3 4.281zM20.719 4a.281.281 0 0 1 .281.281V20.72a.281.281 0 0 1-.281.281H4.28a.281.281 0 0 1-.28-.282V4.28A.281.281 0 0 1 4.281 4zM12 13H7v-1h5V7h1v5h5v1h-5v5h-1z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
            </button>
            <CalendarTask item={stateItem} addNewEvent={changeEvent} stateForm = {stateTask} closeForm={()=>setTask(false)} deleteEvent={deleteEvent}/>
            <CalendarForm addNewEvent ={addNewEvent} stateForm={stateForm} closeForm={()=>setForm(false)} />
        </FlexContainer> 
        </LocalizationProvider>
    )
}
export default CalendarWindow