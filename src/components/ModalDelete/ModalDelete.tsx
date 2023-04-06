import './ModalDelete.scss'
import { ToDoType } from '../../store/createSlice'
import { DasksType } from '../../store/CreateSliseDask'
import { FlexContainer } from '../../styledComponents/FlexContainer'
interface NavBlockType{
    list: ToDoType|DasksType
    deleteTask: ()=>void
    closeModalDelete: ()=>void
    stateModalDelete: boolean
}
function ModalDelete({list, deleteTask, closeModalDelete, stateModalDelete}:NavBlockType){
 
    return(
        <>
        {stateModalDelete?(
            <div className='ModalDelete'>
                <p>
                    Do you want delete element "{list.title} ?
                </p>
                <FlexContainer gap='20px'>
                    <button onClick={deleteTask}>Yes</button>
                    <button onClick={closeModalDelete}>No</button>
                </FlexContainer>
            </div>
        ):(<></>)}    
       </> 
    )
}
export default ModalDelete