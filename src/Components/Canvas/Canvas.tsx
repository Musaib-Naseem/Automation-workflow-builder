
import type { WorkFlowMode,nodeProps } from "../../Types_ts/node";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

type CanvasProps={

nodes:WorkFlowMode[];
edges:nodeProps[]

}


const Canvas=({nodes,edges}:CanvasProps)=>{

return(

<div style={{ width:"100vw" , height:"100vh"}}>
<ReactFlow nodes={nodes}  edges={edges}/>
</div>

)

}

export default Canvas;