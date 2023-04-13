
import React, {FC, PropsWithChildren, useState, useRef} from 'react';
import { useDrop } from "react-dnd";
import { useAppSelector } from '../hooks/redux';

interface DropContainerType {
    onDrop?: any;
    status?: string;

}
const DropContainer: FC<PropsWithChildren<DropContainerType>> = ({ onDrop, children, status}) => {
    const {todos} = useAppSelector(state=>state.todos)
    const { dasks} = useAppSelector(state=>state.dasks)
    let backgroundColor = 'inherit'
    const [{isOver }, drop] = useDrop({
      accept: 'BOX',
      // canDrop: (item:any, monitor) => {
      //   // //or task?
      //   const itemIndex = dasks.findIndex((si) => si.title === item.status);
      //   const statusIndex = dasks.findIndex((si,index) => si.title === status);
      //   return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
      //   return backgroundColor = 'rgba(117, 32, 255, 0.7)'
      // },
      drop: (item, monitor) => {
        onDrop(item, monitor, status);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    })
    const isActive =isOver
    // let backgroundColor = 'inherit'
    if (isActive) {
      backgroundColor = 'rgba(134, 61, 251, 0.358)'
    } 
    return(
        <div ref={drop} className='ContainerTaskItem' style={ {backgroundColor }}>
            {children}
      </div>
    )
}
export default DropContainer;