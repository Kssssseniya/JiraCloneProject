import './Navblock.scss'
import {NavLink} from 'react-router-dom'
interface NavBlockType{
    list: LinkType[]
}
interface LinkType{
    id?: number,
    name: string,
    link: string
}
function NavBlock({list}:NavBlockType){
 
    return(
        <div className="NavBlock">
        <ul>    
       {list.map((item)=><li key={item.id}> <svg fill="#000000" viewBox="0 0 24 24" id="cursor-right" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" className="icon line-color"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M3.21,17.16,6.63,12,3.21,6.84A1.14,1.14,0,0,1,4.44,5.07l15.92,6a1,1,0,0,1,0,1.88l-15.92,6A1.14,1.14,0,0,1,3.21,17.16Z" ></path></g></svg><NavLink to={item.link}>{item.name}  </NavLink></li>)}
       </ul>
       </div>
    )
}
export default NavBlock