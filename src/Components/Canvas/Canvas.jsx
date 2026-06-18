import React from "react";
import Node from "../Node/Node";

const Canvas=({nodes,deleteNode})=>{

return(

<div style={{ position:"relative",width:"100%",height:"200px",backgroundColor:"#d3d3d3"}}>



 {

   nodes.map((node)=>{

   return(
 
   <>

   <Node key={node.id} id={node.id}  label={node.label} x={node.x}  y={node.y}  deleteNode={deleteNode}/>   
   
   </>

   )

   })

 }

</div>

)

}

export default Canvas;