import React,{useState} from "react";
import type { WorkFlowMode } from "../../Types_ts/node";
import { ConfigNode } from "../../Types_ts/ConfigNode";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useWorkflowStore } from "../../Store/WorkflowStore";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";



type settingPanelProps={

selectedNode:WorkFlowMode|null;
updateSelectedNodes:(id:string,label:string)=>void;
updateSelectedNodesDisc:(id:string,description:string)=>void;
updateMyNode:()=>void;
deleteSelectedNode:(id:string)=>void;

}


const SettingPanel=({selectedNode,updateSelectedNodes,updateSelectedNodesDisc,updateMyNode,deleteSelectedNode}:settingPanelProps)=>{

const config = selectedNode
  ? ConfigNode[selectedNode.data.type as keyof typeof ConfigNode]
  : null;

const Icon = config?.icon;


const edges = useWorkflowStore((state)=>state.edges);
const nodes = useWorkflowStore((state)=>state.nodes);
const setExecutionNode = useWorkflowStore((state)=>state.setExecutionNode);
const setNodes = useWorkflowStore((state)=>state.setNodes);
const executionNodeId = useWorkflowStore((state)=>state.executionNodeId);
const logs = useWorkflowStore((state)=>state.logs);
const setLog = useWorkflowStore((state)=>state.setLog)
const clearLog = useWorkflowStore((state)=>state.clearLog)


const [startNode,setStartNode] = useState("");



const runWorkflow = async () => {
  const targetEdges = new Set<string>();

  edges.forEach((edge) => {
    targetEdges.add(edge.target);
  });

  const graph:Record<string,string[]>={};

edges.forEach((edge)=>{

if(!graph[edge.source]){

graph[edge.source] ??= []

}

graph[edge.source]!.push(edge.target)

});

console.log(graph);



  const startNode = nodes.find(
    (node) => !targetEdges.has(node.id)
  );

  if (!startNode) return;

  const sleep =(ms:number)=> new Promise((resolve)=>setTimeout(resolve,ms));

  let currentNode = startNode.id;

while(currentNode){

  setExecutionNode(currentNode);

  const node1 = nodes.find((node)=>node.id == currentNode);

  setLog(`${node1?.data?.label ?? "" } executed`);

  await sleep(1000);

  const neighbours = graph[currentNode] ?? [];

  if(neighbours.length == 0){

  break;

  }

  currentNode=neighbours[0]!;
  
}

setExecutionNode(null);

clearLog();

toast.success("Workflow Completed");

};




const upLabel=(e:string,id:string):void=>{

updateSelectedNodes(id,e);

}


const upDesc=(e:string,id:string):void=>{

updateSelectedNodesDisc(id,e);

}


const showLabelError = useWorkflowStore((state)=>state.showLabelError);

const showDescError = useWorkflowStore((state)=>state.showDescError);

const showDuplicateError = useWorkflowStore((state)=>state.showDuplicateError);

return(

<div className="pt-6">

<h2 className="pl-8 pb-4 text-sm font-bold text-[#111827] border-b-1 border-[#E5E7EB]">

SETTING PANEL

</h2>

{!selectedNode && ( <p className="pl-8 pt-4 text-[#374151] font-[500]"> No Node Selected </p> )}

{

selectedNode && (

<div className="pl-8 pt-4">

<label className="text-sm font-[500]"> Node ID </label>

<br />

<input disabled type="text" value={selectedNode.id} className="cursor-not-allowed bg-[#F9FAFB] p-2 border border-1 border-[#D1D5DB] mt-2 rounded-md w-[90%] hover:shadow-sm transition"/>

<br /><br />

<label className="text-sm font-[500]"> Node Type </label>

<br />

<div className="cursor-not-allowed flex items-center border border-[#D1D5DB] rounded-md w-[90%] mt-2 px-1 bg-[#F9FAFB] hover:shadow-sm transition">
<div className={`w-8 h-8 flex items-center justify-center rounded-lg ${config && config.bg}`}> 

  {Icon && <Icon className="text-lg text-purple-600" />}

</div>

  <input
    type="text"
    value={selectedNode.data.type}
    readOnly
    className="cursor-not-allowed flex-1 p-2 outline-none bg-transparent"
  />
  
</div>

<br />


<label className="text-sm font-[500]"> Node Label </label>

<br />

<input type="text" onChange={(e)=>upLabel(e.target.value,selectedNode.id)}  
value={selectedNode.data.label} 
className="p-2 border border-1 border-[#D1D5DB] mt-2 rounded-md w-[90%] hover:shadow-sm transition 
focus:outline-none focus:ring-1 focus:ring-[#6040E0] focus:border-[#6040E0]"/>
{showLabelError && <span className="text-red-600 text-sm"> *Label can't be empty </span>}
{showDuplicateError && <span className="text-red-600 text-sm"> *Label already exists </span>}

<br /><br />

<label className="text-sm font-[500]"> Node Description </label>

<br />

<textarea  onChange={(e)=>upDesc(e.target.value,selectedNode.id)}  value={selectedNode.data.description}  className="h-[95px] p-2 border border-1 border-[#D1D5DB] mt-2 rounded-md w-[90%] hover:shadow-sm transition focus:outline-none focus:ring-1 focus:ring-[#6040E0] focus:border-[#6040E0]"></textarea>
{showDescError && <span className="text-red-500 text-sm"> *Description can't be empty </span>}

<br /><br />

<div className="flex flex-col">

<button className="cursor-pointer border-[#059669] border-2 bg-[#059669] text-[#fff] w-[90%] p-2 font-[500] rounded-md mt-2 flex justify-center items-center text-sm" onClick={updateMyNode}> <FaSave /> &nbsp;  Save Changes </button>

<button className="cursor-pointer border-[#EF4444] border-2 text-[#EF4444] w-[90%] p-2 font-[500] rounded-md mt-4 mb-4 flex justify-center items-center text-sm" onClick={()=>deleteSelectedNode(selectedNode!.id)}  > <MdDelete /> &nbsp; Delete Node </button>

</div>

</div>

)

}

<div>


<button onClick={runWorkflow} className="cursor-pointer border-[#EF4444] border-2 text-[#EF4444] w-[90%] p-2 font-[500] rounded-md mt-4 mb-4 flex justify-center items-center text-sm"> Run Workflow </button> 


<h1>Execution </h1>

{

logs && logs.map((val,index)=>{

return(

<div>

<h2><FaCheck /> {val}</h2>

</div>

)

})


}

</div>

</div>

)


}


export default SettingPanel;