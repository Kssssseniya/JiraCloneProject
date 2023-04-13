import { useState } from 'react';
import { FlexContainer } from '../../styledComponents/FlexContainer';


const FormForList = ({item, addForm, stateForm, closeForm}:any)=>{
    const [valueName, setValue] = useState("")
    const addNewList =()=>{
        if(valueName!==''&& valueName!==' '){
          item = valueName
        // console.log(valueName)
        setValue("")
        addForm(valueName)  
        }
        
    }
    const keyDownHandler = (event:any) => {
        if(event.keyCode === 13) {
            addNewList()
        }
      }
       return(
        <>
       {stateForm ?(
        <div className='Form_Container'>
            <input value={valueName} onChange = {(e)=>setValue(e.target.value)} type={"text"} placeholder = "Add header for list" onKeyDown={keyDownHandler}/>
            <FlexContainer gap = '15px'>
                <button onClick={closeForm}>Close</button>
                <button onClick={addNewList}>Add</button>
            </FlexContainer>
           
        </div>
       ):(
        <></>
       )}
      </> 
      ) 
        
}
export default FormForList