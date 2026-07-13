import React from "react";
import type { WorkFlowMode } from "../../Types_ts/node";
import { ConfigNode } from "../../Types_ts/ConfigNode";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


type settingPanelProps={

selectedNode:WorkFlowMode|null;
updateSelectedNodes:(id:string,label:string)=>void

}


const SettingPanel=({selectedNode,updateSelectedNodes}:settingPanelProps)=>{

const config = selectedNode
  ? ConfigNode[selectedNode.data.label as keyof typeof ConfigNode]
  : null;

const Icon = config?.icon;


const upLabel=(e:string,id:string):void=>{

updateSelectedNodes(id,e);

}


const upDesc=(e:string,id:string):void=>{

updateSelectedNodes(id,e);

}


return(

<div className="pt-6 nodrag">

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

<br /><br />


<label className="text-sm font-[500]"> Node Description </label>

<br />

<textarea  onChange={(e)=>upDesc(e.target.value,selectedNode.id)}  value={selectedNode.data.description}  className="h-[95px] p-2 border border-1 border-[#D1D5DB] mt-2 rounded-md w-[90%] hover:shadow-sm transition focus:outline-none focus:ring-1 focus:ring-[#6040E0] focus:border-[#6040E0]"></textarea>

<br /><br />

<div className="flex flex-col">

<button className="border-[#059669] border-2 bg-[#059669] text-[#fff] w-[90%] p-2 font-[500] rounded-md mt-2 flex justify-center items-center text-sm" > <FaSave /> &nbsp;  Save Changes </button>

<button className="border-[#EF4444] border-2 text-[#EF4444] w-[90%] p-2 font-[500] rounded-md mt-4 mb-4 flex justify-center items-center text-sm" > <MdDelete /> &nbsp; Delete Node </button>

</div>


</div>

)

}

</div>

)


}


export default SettingPanel;