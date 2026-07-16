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



function App() {

// const [selectedNode,setSelectedNode] = useState<WorkFlowMode| null>(null);

const selectedNode = useWorkflowStore((state)=>state.selectedNode);

const setSelectedNode = useWorkflowStore((state)=>state.setSelectedNode);

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


const nodes = useWorkflowStore((state)=>state.nodes);

const setNodes = useWorkflowStore((state)=>state.setNodes);

const newUpdateNode = useWorkflowStore((state)=>state.newUpdateNode);

const setNewUpdateNode = useWorkflowStore((state)=>state.setNewUpdateNode);


// const [newUpdateNode,setNewUpdateNode] = useState<WorkFlowMode2[]>(()=>{

// localStorage.removeItem("workflowNodes");

// const savedNodes = localStorage.getItem("workflowNodes");

// return savedNodes ? JSON.parse(savedNodes) : defaultNodes

// })


console.log(nodes);

useEffect(()=>{

localStorage.setItem("workflowNodes",JSON.stringify(nodes));

},[nodes])



const edges = useWorkflowStore((state)=>state.edges);
const setEdges = useWorkflowStore((state)=>state.setEdges);


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



const updateMyNode=()=>{

setNodes(newUpdateNode);

}


const deleteSelectedNode=(id:string):void=>{

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

}


const deleteAllNodes=():void=>{

setSelectedNode(null);
setNodes([]);
setNewUpdateNode([]);

}



console.log(nodes);


const exportWorkflow=()=>{

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


}



  return (
    <>


   <div style={{ backgroundColor:"#ffffff"}} className="overflow-hidden" >

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

    <div className='w-[57%]' style={{ backgroundColor:"#F8FAFC",borderRight:"1.5px solid #D0D0D0"}}>

  <Canvas nodes={nodes}  edges={edges} setSelectedNode={setSelectedNode} />

   </div>

    <div className='w-[25%] z-10 relative'>

    <SettingPanel deleteSelectedNode={deleteSelectedNode} selectedNode={selectedNode}  updateMyNode={updateMyNode} updateSelectedNodes={updateSelectedNodes}  updateSelectedNodesDisc={updateSelectedNodesDisc}/>

   </div>

   </div>


   </div>

    </>
  )
}



export default App;
