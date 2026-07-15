import type { WorkFlowMode,nodeProps } from "../../Types_ts/node";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";

type CanvasProps={

nodes:WorkFlowMode[];
edges:nodeProps[];
setSelectedNode:(node:WorkFlowMode)=>void

}


const Canvas=({nodes,edges,setSelectedNode}:CanvasProps)=>{

return(

<div style={{ width:"100vw" , height:"100vh"}}>

<ReactFlow nodes={nodes}  edges={edges}  onNodeClick={ (_,node)=>{ setSelectedNode(node) }}/>
</div>

)

}


export default Canvas;

