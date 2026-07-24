import React,{useRef} from "react";
import type { WorkFlowMode2 } from "../../Types_ts/node";
import { ConfigNode } from "../../Types_ts/ConfigNode";
import { IoArrowUndo } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { useWorkflowStore } from "../../Store/WorkflowStore";
import { FaPlus } from "react-icons/fa";
import InputModal from "../InputModal/InputModal";
import {toast} from "react-toastify";
import { BiExport,BiImport } from "react-icons/bi";

type SidebarProps={

nodes:WorkFlowMode2[]

}



const Sidebar=React.memo(({nodes}:SidebarProps)=>{

  const setEdges = useWorkflowStore((state)=>state.setEdges);

const setNodes = useWorkflowStore((state)=>state.setNodes);

const Undo = useWorkflowStore((state)=>state.undo);

const Redo = useWorkflowStore((state)=>state.redo);

const history = useWorkflowStore((state)=>state.history);

const redoContainer = useWorkflowStore((state)=>state.RedoContainer);

const setIsModalOpen = useWorkflowStore((state)=>state.setIsModalOpen);

const fileInputRef = useRef<HTMLInputElement>(null);

const handleImport = (e) => {
  
let file = e.target.files?.[0];

if(!file) return;

const reader = new FileReader();

reader.onload = () => {

const workflow = JSON.parse(reader.result as string);

console.log(workflow);

setNodes(workflow.nodes);
setEdges(workflow.edges);

toast.success("Workflow Imported Successfully");

}

reader.readAsText(file);

};

return(

<div className="pl-6 pt-8 pb-8">

  <input type="file" ref={fileInputRef} accept=".json" hidden onChange={handleImport} />


<div className="pt-1 flex flex-col pr-16 mb-8">
<button onClick={()=>setIsModalOpen(true)}  className="cursor-pointer h-10 w-auto bg-blue-400 text-[#fff] text-sm mb-6 rounded-sm font-bold flex justify-center items-center"><FaPlus />
 &nbsp;&nbsp;Create Node</button>

  <button style={{ border:"1px solid #0EA5E9"}} className="text-sm px-4 py-2 bg-[#fff] border-2 text-[#0EA5E9] rounded cursor-pointer flex items-center hover:bg-[#0284C7] transition font-bold flex justify-center items-center " onClick={()=>fileInputRef.current?.click()}> <BiImport style={{ fontSize:"18px"}}/> &nbsp;&nbsp;Import File </button>
   
 </div>

<h2 className="text-sm font-bold text-[#D0D0D0]"> NODES </h2>

<div className="flex flex-col gap-4 mt-6">

{

nodes.length !==0 ? nodes.map((details)=>{
 
const config = ConfigNode[details.data.type as keyof typeof ConfigNode];

const Icon = config && config.icon;

return(

<div key={details.id} className="w-38 flex items-center gap-4 p-2 border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition">

<div className={`w-10 h-10 flex items-center justify-center rounded-lg ${config && config.bg}`}> 

{ Icon && <Icon className={`text-xl ${config && config.color}`}  /> }

</div>

<span className="font-medium text-gray-800 text-sm">{details.data.type}</span>

</div>

)

}) : <h2 className="text-[#374151] font-[500]"> No Nodes Available </h2>

}


</div>

<div className="pt-8 flex flex-col pr-16 ">

 {/* <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
   Toggle modal
 </button> */}

<button
  className={`h-10 w-auto px-4 rounded-md font-bold text-sm flex justify-center items-center transition-all duration-200 ${
   history.length === 0
  ? "bg-violet-100 text-violet-500 border border-violet-300 cursor-not-allowed disabled"
  : "bg-violet-600 hover:bg-violet-700 text-white border border-violet-600 cursor-pointer"
  }`}
  onClick={Undo}
>
  <IoArrowUndo className="mr-1" />
  Undo
</button>

&nbsp;

<button
  className={`h-10 w-auto px-4 rounded-md font-bold text-sm flex justify-center items-center transition-all duration-200 ${
  redoContainer.length === 0
  ? "bg-sky-100 text-sky-500 border border-sky-300 cursor-not-allowed disabled"
  : "bg-sky-500 hover:bg-sky-600 text-white border border-sky-500 cursor-pointer"
  }`}
  onClick={Redo}
>
  <IoArrowRedo className="mr-1" />
  Redo
</button>

<InputModal />
</div>

</div>

)

});

export default Sidebar;