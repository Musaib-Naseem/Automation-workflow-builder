import React from "react";
import Node from "../Node/Node";
import type { WorkFlowMode } from "../../Types_ts/node";

type CanvasProps={

nodes:WorkFlowMode[];
deleteNode:(id:number)=>void;
updateNodePosition:(id:number,x:number,y:number)=>void

}


const Canvas=({nodes,deleteNode,updateNodePosition}:CanvasProps)=>{

return(

<div className="relative w-full h-screen" style={{ backgroundColor:"#d3d3d3"}}>


 {

   nodes.map((node)=>{

   return(
 
   <>

   <Node key={node.id} id={node.id}  label={node.label} x={node.x}  y={node.y}  deleteNode={deleteNode} updateNodePosition={updateNodePosition}/>   
   
   </>

   )

   })

 }

</div>

)

}

export default Canvas;