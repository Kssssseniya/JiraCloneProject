import './Navblock.scss'
import {NavLink} from 'react-router-dom'
interface NavBlockType{
    list: LinkType[]
}
interface LinkType{
    name: string,
    link: string
}
function NavBlock({list}:NavBlockType){
 
    return(
        <div className="NavBlock">
        <ul>    
       {list.map((item)=><li><NavLink to={item.link}>{item.name}</NavLink></li>)}
       </ul>
       </div>
    )
}
export default NavBlock