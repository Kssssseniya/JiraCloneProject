import React from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop, { withDragAndDropProps } from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from 'moment'
import { useState, useEffect } from 'react';
import { FlexContainer } from '../../../styledComponents/FlexContainer';
import CalendarForm from '../CalendarForm/CalendarForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './CalendarWindow.scss';
import globalize from 'globalize';
import { useAppSelector } from '../../../hooks/redux';
import { todoSliceCalendar } from '../../../store/CreateSliseCalendar';
import { useAppDispatch } from '../../../hooks/redux';

const CalendarWindow=()=>{
  const localizer = globalizeLocalizer(globalize)
  const DnDCalendar = withDragAndDrop(Calendar);
    const  [stateEvent, setStateEvent]:any = useState( () => {
      const savedItem:any = localStorage.getItem("Event");

     const parsedItem = JSON.parse(savedItem);

     return parsedItem || [];
     });
    //  stateEvent.forEach((element:any) => {
    //       element.start =  Date.parse(element.start)
    //       element.end = Date.parse(element.end)
    //       console.log('метод парс, конечная дата')
    //        console.log(element.end)
    //    });
    //  console.log(stateEvent)
     
    useEffect(() => { 
      localStorage.setItem("Event",JSON.stringify(stateEvent))
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


    const addNewEvent =(NewEvent:any)=>{
      console.log(NewEvent)
      setStateEvent([...stateEvent, NewEvent])
    }
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FlexContainer className='Calendar_Wrapper' justify='space-between'>
            <DnDCalendar
            localizer={localizer}
            events={stateEvent}
            // startAccessor="start"
            // endAccessor="end"
            onEventDrop={onEventDrop}
            onEventResize={onEventResize}
            // resizable
            style={{ height: 600, width: 700 }}
            />
            <CalendarForm addNewEvent ={addNewEvent}/>
        </FlexContainer> 
        </LocalizationProvider>
    )
}
export default CalendarWindow