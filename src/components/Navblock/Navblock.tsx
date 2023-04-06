import './Navblock.scss'
interface NavBlockType{
    list: string[]
}
function NavBlock({list}:NavBlockType){
 
    return(
        <div className="NavBlock">
        <ul>    
       {list.map((item:string)=><li>{item}</li>)}
       </ul>
       </div>
    )
}
export default NavBlock