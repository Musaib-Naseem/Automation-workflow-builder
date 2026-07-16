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

type WorkflowSnap={

nodes:WorkFlowMode2[],
edges:Edge[]

}


type WorkflowStore = {

nodes : WorkFlowMode2[],
edges : Edge[],
selectedNode:WorkFlowMode | null,
newUpdateNode:WorkFlowMode2[],
history:WorkflowSnap[],
setNodes : (nodes:WorkFlowMode2[])=>void,
setEdges : (edges:Edge[])=>void,
setSelectedNode :(selectedNode:WorkFlowMode | null)=>void,
setNewUpdateNode: (newUpdateNode:WorkFlowMode2[])=>void,
saveHistory:()=>void,
undo:()=>void

}



export const useWorkflowStore = create<WorkflowStore>((set,get)=>({

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

history:[],

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

saveHistory:()=>{

const { nodes,edges,history} = get();

set({

history:[

...history,

{

nodes:structuredClone(nodes),
edges:structuredClone(edges)

}

]


})


},

undo:()=>{

const {history} = get();

if(history.length == 0) return;

const lastSnapShot = history[history.length-1]!;

set({

nodes:lastSnapShot.nodes,
edges:lastSnapShot?.edges,
history:history.slice(0,history.length-1)


})

}


}));