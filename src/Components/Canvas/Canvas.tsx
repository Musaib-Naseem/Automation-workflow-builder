import type { WorkFlowMode,nodeProps } from "../../Types_ts/node";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import type {Connection} from "reactflow";

type CanvasProps={

nodes:WorkFlowMode[];
edges:nodeProps[];
setSelectedNode:(node:WorkFlowMode)=>void,
isValidConnection:(connection:Connection)=>boolean

}


const Canvas=({nodes,edges,setSelectedNode,isValidConnection}:CanvasProps)=>{

return(

<div style={{ width:"100vw" , height:"100vh", marginTop:"-30px"}}>

<ReactFlow isValidConnection={isValidConnection} nodes={nodes}  edges={edges}  onNodeClick={ (_,node)=>{ setSelectedNode(node) }}/>
</div>

)

}


export default Canvas;

