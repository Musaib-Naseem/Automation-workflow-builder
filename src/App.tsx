import Sidebar from "./Components/Sidebar/Sidebar";
import Canvas from "./Components/Canvas/Canvas";
import { useEffect, useState } from "react";
import type { WorkFlowMode,WorkFlowMode2 } from "./Types_ts/node";
import SettingPanel from "./Components/SettingPanel/SettingPanel";
import { BiExport } from "react-icons/bi";
import { LuWorkflow } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";

import { TbWebhook } from "react-icons/tb";
import { useWorkflowStore } from "./Store/WorkflowStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import {toast} from "react-toastify";
import type { Connection } from "reactflow";


function App() {

// const [selectedNode,setSelectedNode] = useState<WorkFlowMode| null>(null);

const selectedNode = useWorkflowStore((state)=>state.selectedNode);

const setSelectedNode = useWorkflowStore((state)=>state.setSelectedNode);

const history = useWorkflowStore((state)=>state.history);

const saveHistory = useWorkflowStore((state)=>state.saveHistory);

const saveRedoCont = useWorkflowStore((state)=>state.saveRedoCont);

const edges = useWorkflowStore((state)=>state.edges);

const setEdges = useWorkflowStore((state)=>state.setEdges);

const nodes = useWorkflowStore((state)=>state.nodes);

const setNodes = useWorkflowStore((state)=>state.setNodes);

const setShowLabelError = useWorkflowStore((state)=>state.setShowLabelError);

const setShowDescError = useWorkflowStore((state)=>state.setShowDescError);

const setShowDuplicateError = useWorkflowStore((state)=>state.setShowDuplicateError);


const Undo = useWorkflowStore((state)=>state.undo);

const Redo = useWorkflowStore((state)=>state.redo);




const handleKeyDown = (event:KeyboardEvent)=>{

const target = event.target as HTMLElement;

if(

target.tagName == "INPUT" || target.tagName == "TEXTAREA" || target.isContentEditable

) {

return;

}





if(event.ctrlKey && event.key.toLowerCase() == "z"){

event.preventDefault();

if(event.shiftKey){

Redo();

}

else{

Undo();

}



}

}


// const defaultNodes:WorkFlowMode2[] = [

// {

// id:"1",
// position:{x:100,y:100},
// data:{  
// label:"Email",
// type:"Email",
// description:"Send the Welcome Email to the User"

// },

// },

// {

// id:"2",
// position:{x:300,y:100},
// data:{
// label:"Delay",
// type:"Delay",
// description:"Do the delay of 5 mins"

// },


// },

// {

// id:"3",
// position:{x:500,y:100},
// data:{
// label:"Condition",
// type:"Condition",
// description:"Let it fullfill the all condition"

// },


// }

// ]



const newUpdateNode = useWorkflowStore((state)=>state.newUpdateNode);

const setNewUpdateNode = useWorkflowStore((state)=>state.setNewUpdateNode);


const disconnectedNodes=()=>{

const connectedNodeIds = new Set<string>();

edges.forEach((edge)=>{

connectedNodeIds.add(edge.source);
connectedNodeIds.add(edge.target);

});


const myDisconnectedNotes = nodes.filter((node)=>!connectedNodeIds.has(node.id));

if(myDisconnectedNotes.length > 0){

return{

valid:false,
message:`${myDisconnectedNotes.length} disconnected node(s) found`,
disconnectedId:myDisconnectedNotes[0]

}

}

return{

valid:true,
message:"All nodes are connected"

}


// const labels = myDisconnectedNotes.map((node)=>node.data.label);

// return{

// valid:false,
// message:`Disconnected Nodes : ${labels.join(", ")}`

// }


}




const getDisconnectedId = disconnectedNodes();

console.log(getDisconnectedId);

console.log(nodes);

const graph:Record<string,string[]>={}

edges.forEach((edge)=>{

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

console.log(visited);

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

console.log(updateNodes);


const visitedOne = new Set<string>();
const recursionStack = new Set<string>();

function hasCycle(nodeId:string):boolean{

visitedOne.add(nodeId);
recursionStack.add(nodeId);

const neighbours = graph[nodeId] || [];

for(const next of neighbours){

if(!visitedOne.has(next)){

if(hasCycle(next)){

toast.error("Workflow detected cycle");

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

useEffect(()=>{

// const updatedNodes = nodes.map((node)=>

// node.id === getDisconnectedId.disconnectedId?.id ? {

// ...node,
// style:{

// ...node.style,
//           border: "1px solid red",
//           // borderRadius: "8px",
//           // boxShadow: "0 0 0 2px red",

// }

// } : node

// );

// setNodes(updatedNodes);





setNodes(updateNodes);


// if(hasCycle("1")){

// toast.error(`Workflow has Cycle`)

// }


localStorage.setItem("workflowNodes",JSON.stringify(nodes));

window.addEventListener("keydown",handleKeyDown);

return ()=>{

window.removeEventListener("keydown",handleKeyDown);

}


},[])





const updateSelectedNodes=(id:string,label:string)=>{

if (!selectedNode || selectedNode.id !== id) return;


setSelectedNode({
  ...selectedNode,
  data: {
    ...selectedNode.data,
    label,
  },
});

setNewUpdateNode(newUpdateNode.map((node)=>node.id === id ? {...node,data:{...node.data,label}} : node ));

};


const updateSelectedNodesDisc=(id:string,description:string)=>{


 if (!selectedNode || selectedNode.id !== id) return;

 setSelectedNode(
  {
    ...selectedNode,
    data: {
      ...selectedNode.data,
      description
    
    }}
 );

setNewUpdateNode(newUpdateNode.map((node)=>node.id === id ? {...node,data:{...node.data,description}} : node ));

};



const validateWorkflow=()=>{

if(nodes.length == 0){

return{

valid:false,
message:"Workflow is empty"

}

}


for(const node of nodes){

if(!node.data.label.trim()){

return{

valid:false,
message:`${node.data.type} node has empty label`

}

}

if(!node.data.description.trim()){

return{

valid:false,
message:`${node.id} has empty description`

}

}

}

return{

valid : true,
message:"Workflow is valid"

}


}

const updateMyNode=()=>{
 
if(selectedNode?.data.label.trim() == ""){
setShowLabelError(true);
return;

}

if(selectedNode?.data.description.trim() == ""){
setShowDescError(true);
return;

}


const isDuplicate = newUpdateNode.find((myData)=>{

return(

selectedNode?.id !== myData.id && myData?.data?.label.trim() == selectedNode?.data?.label 

)

});


if(isDuplicate){

setShowDuplicateError(true);
return;

}

else{

setShowLabelError(false);
setShowDescError(false);
setShowDuplicateError(false);
saveHistory();
setNodes(newUpdateNode);

}

}







const deleteSelectedNode=(id:string):void=>{

saveHistory();

setSelectedNode(null);

setNodes(nodes.filter((data)=>data.id !== id));
setNewUpdateNode(newUpdateNode.filter((data)=>data.id !== id));
setEdges(edges.filter((edge)=>edge.source !== id && edge.target !== id));


const incoming= edges.find((edge)=>edge.target == id);
const outgoing = edges.find((edge)=>edge.source == id);

const filtered = edges.filter(
  (edge) => edge.source !== id && edge.target !== id
);

if (incoming && outgoing) {
  filtered.push({
    id: `e${incoming.source}-${outgoing.target}`,
    source: incoming.source,
    target: outgoing.target,
  });
}

setEdges(filtered);

toast.success("Node Deleted Successfully");

}


const deleteAllNodes=():void=>{

saveHistory();

setSelectedNode(null);
setNodes([]);
setNewUpdateNode([]);
toast.success("All Node Deleted Successfully");


}


console.log(nodes);


const exportWorkflow=()=>{

const isValid = validateWorkflow();

if(!isValid.valid){

toast.error(`${isValid.message}`)
return;

}

if(hasCycle("1")){

toast.error(`Workflow has Cycle`);
return;

}

const workflow={

nodes,
edges

}


const blob =new Blob(

[JSON.stringify(workflow,null,2)],
{

type:"application/json",

}

);


const url = URL.createObjectURL(blob);

const a = document.createElement("a");

a.href = url;
a.download = "workflow.json";
a.click();
toast.success(`Workflow Exported Successfully`);

}


const isValidConnection=(connection:Connection)=>{

if(connection.source == connection.target){

toast.error("A node cannnot connect to itself");
return false;

}

const isDuplicate = edges.some(

edge=> edge.source == connection.source && edge.target == connection.target

);


if(isDuplicate){

toast.error("This connection already exist");
return false;

}

return true;


}




  return (
    <>


   <div style={{ backgroundColor:"#ffffff"}} className="overflow-hidden" >

   <ToastContainer position="top-right" autoClose={3000}  theme="colored" />

   <div style={{ borderBottom:"1px solid #D0D0D0"}} className='h-20 flex items-center p-2 px-10 py-2 justify-between'>

  <h1 className="text-2xl font-bold flex items-center"> <LuWorkflow style={{ color:"#6040E0"}} size={28} /> &nbsp; Workflow Builder </h1>
  
  <div className="flex">
  <button style={{ border:"1px solid #D0D0D0"}} className="mr-6 text-sm px-4 py-2 bg-[#ffffff] text-[#374151] rounded cursor-pointer font-bold  flex items-center hover:bg-[#4F33BD] hover:text-[#fff] transition" onClick={deleteAllNodes}> <MdOutlineDelete  style={{ fontSize:"18px",}}/> &nbsp;&nbsp;Clear Workflow</button>
   
  <button className="text-sm px-4 py-2 bg-[#6040E0] text-white rounded cursor-pointer flex items-center hover:bg-[#4F33BD] transition" onClick={exportWorkflow}> <BiExport style={{ fontSize:"18px"}}/> &nbsp;&nbsp;Export Workflow</button>
   </div>
   
  </div>


   <div  className='flex'>

   <div className='w-[18%]' style={{ borderRight:"1.5px solid #D0D0D0"}}>

   <Sidebar nodes={nodes}/>

   </div>

    <div className='w-[57%]' style={{ backgroundColor:"#F8FAFC",borderRight:"1.5px solid #D0D0D0",overflow:"hidden"}}>

  <Canvas   isValidConnection={isValidConnection}  nodes={nodes}  edges={edges} setSelectedNode={setSelectedNode} />

   </div>

    <div className='w-[25%] z-[99999] relative'>

    <SettingPanel deleteSelectedNode={deleteSelectedNode} selectedNode={selectedNode}  updateMyNode={updateMyNode} updateSelectedNodes={updateSelectedNodes}  updateSelectedNodesDisc={updateSelectedNodesDisc}/>

   </div>

   </div>


   </div>

    </>
  )
}



export default App;
