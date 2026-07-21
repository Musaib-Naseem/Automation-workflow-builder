import type { WorkFlowMode,nodeProps } from "../../Types_ts/node";
import {ReactFlow,MiniMap,Controls,
  Background,} from "reactflow";
import "reactflow/dist/style.css";
import type {Connection} from "reactflow";
import {addEdge} from "reactflow";
import { useWorkflowStore } from "../../Store/WorkflowStore";
import {toast} from "react-toastify";


type CanvasProps={

nodes:WorkFlowMode[];
edges:nodeProps[];
setSelectedNode:(node:WorkFlowMode)=>void,
isValidConnection:(connection:Connection)=>boolean


}


const Canvas=({nodes,edges,setSelectedNode,isValidConnection}:CanvasProps)=>{

const setEdges = useWorkflowStore((state)=>state.setEdges);
const setNodes = useWorkflowStore((state)=>state.setNodes);
const setNewUpdateNode = useWorkflowStore((state)=>state.setNewUpdateNode);

const onConnect=(connection:Connection)=>{

const newEdge = {

id:`e${connection.source}-${connection.target}`,
source:connection.source!,
target:connection.target!

}



const UpdatedEdgeAll = [...edges,newEdge];

const graph:Record<string,string[]>={}

UpdatedEdgeAll.forEach((edge)=>{

if(!graph[edge.source]){

graph[edge.source] ??= [];

}

graph[edge.source]!.push(edge.target)

});

console.log(graph);

const visited = new Set<string>();

const dfs=(nodeId:string)=>{

visited.add(nodeId);

const neighbours = graph[nodeId] || [];

neighbours.forEach((nextNode)=>{

if(!visited.has(nextNode)){

dfs(nextNode);

}

})

}

dfs("1");

const updateNodes = nodes.map((node)=>({

...node,

style:{

...node.style,
backgroundColor:visited.has(node.id)  ? "#DCFCE7" // reachable
      : "#FEE2E2",
border:visited.has(node.id)  ? "2px solid green" // reachable
      : "2px solid red",

}

}));



// console.log(updateNodes);



const visitedOne = new Set<string>();
const recursionStack = new Set<string>();

function hasCycle(nodeId:string):boolean{

visitedOne.add(nodeId);
recursionStack.add(nodeId);

const neighbours = graph[nodeId] || [];

for(const next of neighbours){

if(!visitedOne.has(next)){

if(hasCycle(next)){

return true;
}

}

else if(recursionStack.has(next)){

toast.error("Workflow detected cycle");

return true;

}


}

recursionStack.delete(nodeId);

return false;

}

setEdges([...edges,newEdge]);
setNodes(updateNodes);
setNewUpdateNode(updateNodes);
hasCycle("1");

}


const onEdgesDelete=(deletedEdges:nodeProps[])=>{


let UpdatedEdgeAll = edges.filter((edge)=>!deletedEdges.some((del)=>del.id == edge.id));


const graph:Record<string,string[]>={}

UpdatedEdgeAll.forEach((edge)=>{

if(!graph[edge.source]){

graph[edge.source] ??= [];

}

graph[edge.source]!.push(edge.target)

});

console.log(graph);

const visited = new Set<string>();

const dfs=(nodeId:string)=>{

visited.add(nodeId);

const neighbours = graph[nodeId] || [];

neighbours.forEach((nextNode)=>{

if(!visited.has(nextNode)){

dfs(nextNode);

}

})

}

dfs("1");

const updateNodes = nodes.map((node)=>({

...node,

style:{

...node.style,
backgroundColor:visited.has(node.id)  ? "#DCFCE7" // reachable
      : "#FEE2E2",
border:visited.has(node.id)  ? "2px solid green" // reachable
      : "2px solid red",

}

}));

// console.log(updateNodes);

if(visited.size > 0){

toast.error(`Workflow has ${nodes.length-visited.size} disconnected nodes`)

}


const visitedOne = new Set<string>();
const recursionStack = new Set<string>();

function hasCycle(nodeId:string):boolean{

visitedOne.add(nodeId);
recursionStack.add(nodeId);

const neighbours = graph[nodeId] || [];

for(const next of neighbours){

if(!visitedOne.has(next)){

if(hasCycle(next)){

// toast.error("Workflow detected cycle");

return true;
}

}

else if(recursionStack.has(next)){

toast.error("Workflow detected cycle");

return true;

}


}

recursionStack.delete(nodeId);

return false;

}





















setEdges(edges.filter((edge)=>!deletedEdges.some((del)=>del.id == edge.id)));
setNodes(updateNodes);
setNewUpdateNode(updateNodes);
// hasCycle("1");



}





return(

<div style={{ width:"100vw" , height:"100vh", marginTop:"-30px"}}>

<ReactFlow onEdgesDelete={onEdgesDelete} onConnect={onConnect}  isValidConnection={isValidConnection} nodes={nodes}  edges={edges}  onNodeClick={ (_,node)=>{ setSelectedNode(node) }}>

<MiniMap      style={{
    width: 180,
    height: 120,
    background: "#F9FAFB",
    zIndex:99999,
    border: "1px solid #d1d5db",
    borderRadius: 8,
  }} 
  
   position="bottom-left"


  />

<Controls />

<Background />

</ReactFlow> 

  {nodes.length === 0 && (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none ml-[-100px]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          No workflow found
        </h2>
        <p className="mt-2 text-gray-500">
          Create your first node.
        </p>
      </div>
    </div>
  )}

</div>

)

}


export default Canvas;

