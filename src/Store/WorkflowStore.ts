import { create } from 'zustand';
import type { WorkFlowMode2,WorkFlowMode } from '../Types_ts/node';
import type { Edge } from 'reactflow';

const defaultEdges:Edge[] = [

{

id:"e1-2",
source:"1",
target:"2"

},

{

id:"e2-3",
source:"2",
target:"3"

}

];


const defaultNodes:WorkFlowMode2[] = [

{

id:"1",
position:{x:100,y:100},
data:{  
label:"Email",
type:"Email",
description:"Send the Welcome Email to the User"

},

},

{

id:"2",
position:{x:300,y:100},
data:{
label:"Delay",
type:"Delay",
description:"Do the delay of 5 mins"

},


},

{

id:"3",
position:{x:500,y:100},
data:{
label:"Condition",
type:"Condition",
description:"Let it fullfill the all condition"

},

}

]

type WorkflowStore = {

nodes : WorkFlowMode2[],
edges : Edge[],
selectedNode:WorkFlowMode | null,
newUpdateNode:WorkFlowMode2[],
setNodes : (nodes:WorkFlowMode2[])=>void,
setEdges : (edges:Edge[])=>void,
setSelectedNode :(selectedNode:WorkFlowMode | null)=>void,
setNewUpdateNode: (newUpdateNode:WorkFlowMode2[])=>void

}


export const useWorkflowStore = create<WorkflowStore>((set)=>({

nodes:(()=>{

localStorage.removeItem("workflowNodes");

const savedNodes = localStorage.getItem("workflowNodes");

return savedNodes ? JSON.parse(savedNodes) : defaultNodes;

})(),

edges : defaultEdges,

selectedNode:null,

newUpdateNode:(()=>{

localStorage.removeItem("workflowNodes");

const savedNodes = localStorage.getItem("workflowNodes");

return savedNodes ? JSON.parse(savedNodes) : defaultNodes;

})(),

setNodes:(nodes)=>{

localStorage.setItem("workflowNodes",JSON.stringify(nodes));

set({nodes})

},

setEdges:(edges)=>set({edges}),

setSelectedNode:(selectedNode)=>set({selectedNode}),

setNewUpdateNode : (newUpdateNode)=>{

localStorage.setItem("workflowNodes",JSON.stringify(newUpdateNode));
set({newUpdateNode})

},


}));