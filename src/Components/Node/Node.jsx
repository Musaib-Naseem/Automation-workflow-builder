import React from "react";

const Node=({id,label,x,y,deleteNode})=>{

return(

<div style={{ position:"absolute",left:`${x}px`, right:`${y}px`, padding:"10px"}}>

<h2> {id} - { label } </h2>

<button onClick={()=>deleteNode(id)}> Delete Node </button>

</div>

)

}

export default Node;