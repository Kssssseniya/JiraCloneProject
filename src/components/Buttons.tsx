// import { ReactComponent as YourSvg } from '../image/plus-square-svgrepo-com.svg';
function BtnAddList({addList}:any){
    // const logo = require('../image/plus-square-svgrepo-com.svg') as string;
    return(
        <button className="Btn_AddList" onClick={addList}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3 4.281v16.437A1.282 1.282 0 0 0 4.281 22h16.437A1.282 1.282 0 0 0 22 20.718V4.281A1.281 1.281 0 0 0 20.719 3H4.28A1.281 1.281 0 0 0 3 4.281zM20.719 4a.281.281 0 0 1 .281.281V20.72a.281.281 0 0 1-.281.281H4.28a.281.281 0 0 1-.28-.282V4.28A.281.281 0 0 1 4.281 4zM12 13H7v-1h5V7h1v5h5v1h-5v5h-1z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>
        </button>
    )
    
}
export default BtnAddList