import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from 'moment'
import { useState } from 'react';

const CalendarWindow=()=>{
    const localizer = momentLocalizer(moment)
    const DnDCalendar = withDragAndDrop(Calendar);
    const events = [
        {
         start: moment('2023-04-17T10:00:00').toDate(),
         end: moment('2023-04-18T12:00:00').toDate(),
         title: 'task_test'    
        }, 
           
    ]
    const  [stateEvent, setStateEvent]:any = useState(events)
    const onEventResize = (data:any) => {
        const { start, end } = data;
    
        setStateEvent((events:any) => {
          events[0].start = start;
          events[0].end = end;
          return events ;
        });
      };
    const  onEventDrop = (data:any) => {
        const { start, end } = data;
        setStateEvent((events:any) => {
            events[0].start = start;
            events[0].end = end;
            return events ;
          });
      };
    
    console.log(events)
    return(
        <>
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
        </>
    )
}
export default CalendarWindow