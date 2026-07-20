import React from "react";
import type { WorkFlowMode2 } from "../../Types_ts/node";
import { ConfigNode } from "../../Types_ts/ConfigNode";
import { IoArrowUndo } from "react-icons/io5";
import { IoArrowRedo } from "react-icons/io5";
import { useWorkflowStore } from "../../Store/WorkflowStore";
import { FaPlus } from "react-icons/fa";
import InputModal from "../InputModal/InputModal";


type SidebarProps={

nodes:WorkFlowMode2[]

}


const Sidebar=({nodes}:SidebarProps)=>{

const Undo = useWorkflowStore((state)=>state.undo);

const Redo = useWorkflowStore((state)=>state.redo);

const history = useWorkflowStore((state)=>state.history);

const redoContainer = useWorkflowStore((state)=>state.RedoContainer);

const setIsModalOpen = useWorkflowStore((state)=>state.setIsModalOpen);


return(

<div className="pl-6 pt-8">

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


<button onClick={()=>setIsModalOpen(true)}  className="cursor-pointer h-10 w-auto bg-blue-400 text-[#fff] text-sm mb-6 rounded-sm font-bold flex justify-center items-center"><FaPlus />
 &nbsp;&nbsp;Create Node</button>

 {/* <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
   Toggle modal
 </button> */}
<button className={`h-10 w-auto p-1 px-4 ${history.length == 0 ? "bg-gray-400 text-[#fff] cursor-disabled" : "bg-yellow-400 text-[#fff] cursor-pointer" } rounded-sm font-bold text-sm flex justify-center items-center `} onClick={Undo} > <IoArrowUndo className="mr-1"/>
Undo &nbsp; &nbsp; </button>
&nbsp;
<button className={`h-10 w-auto p-1 px-4 ${redoContainer.length == 0 ? "bg-gray-400 text-[#fff] cursor-disabled" : "bg-blue-400 text-[#fff] cursor-pointer" } rounded-sm font-bold text-sm flex justify-center items-center `} onClick={Redo}> <IoArrowRedo className="mr-1"/>
Redo &nbsp; &nbsp; </button>

<InputModal />
</div>

</div>

)

}

export default Sidebar;