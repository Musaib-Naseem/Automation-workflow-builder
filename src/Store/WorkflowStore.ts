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

},

{

id:"e3-4",
source:"3",
target:"4"

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

style:{

}

},

{

id:"2",
position:{x:300,y:100},
data:{
label:"Delay",
type:"Delay",
description:"Do the delay of 5 mins"
},
style:{
    
}


},

{

id:"3",
position:{x:500,y:100},
data:{
label:"Condition",
type:"Condition",
description:"Let it fullfill the all condition"

},
style:{
    
}

},


{

id:"4",
position:{x:100,y:200},
data:{
label:"SMS",
type:"SMS",
description:"Send the message in sms format"

},
style:{
    
}

},




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
RedoContainer:WorkflowSnap[],
showLabelError:boolean,
showDescError:boolean,
showDuplicateError:boolean,
isModalOpen:boolean,
setNodes : (nodes:WorkFlowMode2[])=>void,
setEdges : (edges:Edge[])=>void,
setSelectedNode :(selectedNode:WorkFlowMode | null)=>void,
setNewUpdateNode: (newUpdateNode:WorkFlowMode2[])=>void,
saveHistory:()=>void,
saveRedoCont:()=>void,
undo:()=>void,
redo:()=>void,
setShowLabelError:(showLabelError:boolean)=>void,
setShowDescError:(showDescError:boolean)=>void,
setShowDuplicateError:(showDuplicateError:boolean)=>void,
setIsModalOpen:(isModalOpen:boolean)=>void

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

RedoContainer:[],

showLabelError:false,

showDescError:false,

showDuplicateError:false,

isModalOpen:false,

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


saveRedoCont:()=>{

const {nodes,edges,RedoContainer} = get();

set({

RedoContainer:[

...RedoContainer,

{

nodes:structuredClone(nodes),
edges:structuredClone(edges)

}

]

})

},


undo:()=>{

const {saveRedoCont} = get();

saveRedoCont();

const {history,selectedNode} = get();

if(history.length == 0) return;

const lastSnapShot = history[history.length-1]!;

const restoredSelectedNode = selectedNode ? lastSnapShot.nodes.find((node)=>node.id == selectedNode.id ) ?? null : null;

set({

nodes:lastSnapShot.nodes,
edges:lastSnapShot?.edges,
selectedNode:restoredSelectedNode,
history:history.slice(0,history.length-1)

})

},

redo:()=>{

const {RedoContainer} = get();

if(RedoContainer.length == 0) return;

const lastSnapRedo = RedoContainer[RedoContainer.length-1]!;

set({

nodes:lastSnapRedo.nodes,
edges:lastSnapRedo.edges,
RedoContainer:RedoContainer.slice(0,RedoContainer.length-1),

})

},

setShowLabelError:(showLabelError:boolean)=>set({showLabelError}),

setShowDescError:(showDescError:boolean)=>set({showDescError}),

setShowDuplicateError:(showDuplicateError:boolean)=>set({showDuplicateError}),

setIsModalOpen:(isModalOpen:boolean)=>set({isModalOpen})


}));