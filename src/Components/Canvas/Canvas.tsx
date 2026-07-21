import type { WorkFlowMode,nodeProps } from "../../Types_ts/node";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import type {Connection} from "reactflow";
import {addEdge} from "reactflow";
import { useWorkflowStore } from "../../Store/WorkflowStore";

type CanvasProps={

nodes:WorkFlowMode[];
edges:nodeProps[];
setSelectedNode:(node:WorkFlowMode)=>void,
isValidConnection:(connection:Connection)=>boolean

}


const Canvas=({nodes,edges,setSelectedNode,isValidConnection}:CanvasProps)=>{

const setEdges = useWorkflowStore((state)=>state.setEdges);

const onConnect=(connection:Connection)=>{

const newEdge = {

id:`e${connection.source}-${connection.target}`,
source:connection.source!,
target:connection.target!

}

setEdges([...edges,newEdge]);

}


const onEdgesDelete=(deletedEdges:nodeProps[])=>{

setEdges(edges.filter((edge)=>!deletedEdges.some((deleted)=>deleted.id == edge.id)))

}





return(

<div style={{ width:"100vw" , height:"100vh", marginTop:"-30px"}}>

<ReactFlow onEdgesDelete={onEdgesDelete} onConnect={onConnect}  isValidConnection={isValidConnection} nodes={nodes}  edges={edges}  onNodeClick={ (_,node)=>{ setSelectedNode(node) }}/>
</div>

)

}


export default Canvas;

