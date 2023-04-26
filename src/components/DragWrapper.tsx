
import React, {FC, PropsWithChildren} from 'react';
import { useDrop } from "react-dnd";
import { useAppSelector } from '../hooks/redux';

interface DropContainerType {
    onDrop?: any;
    status?: string;

}
const DropContainer: FC<PropsWithChildren<DropContainerType>> = ({ onDrop, children, status}) => {
    let backgroundColor = 'inherit'
    const [{isOver }, drop] = useDrop({
      accept: 'BOX',
      drop: (item, monitor) => {
        onDrop(item, monitor, status);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    })
    const isActive =isOver
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