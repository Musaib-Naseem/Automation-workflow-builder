import React from "react";
import Node from "../Node/Node";

const Canvas=({nodes})=>{

return(

<>

<h1> Canvas </h1>

 {

   nodes.map((node)=>{

   return(
 
   <>

   <Node key={node.id} label={node.label} />   
   
   </>

   )

   })

 }

</>

)

}

export default Canvas;