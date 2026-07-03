import React from "react";
import type { WorkFlowMode } from "../../Types_ts/node";


type settingPanelProps={

selectedNode:WorkFlowMode|null;
updateSelectedNodes:(id:string,label:string)=>void

}


const SettingPanel=({selectedNode,updateSelectedNodes}:settingPanelProps)=>{

return(

<div className="pt-6 ">

<h2 className="pl-8 pb-4 text-sm font-bold text-[#111827] border-b-1 border-[#E5E7EB]">

SETTING PANEL

</h2>

{!selectedNode && ( <p className="pl-8 pt-4 text-[#374151] font-[500]"> No Node Selected </p> )}

{

selectedNode && (

<div>

<p> Selected Node : { selectedNode.id}</p>

<p> Selected Label : { selectedNode.data.label}</p>

<input type="text" value={selectedNode?.data.label || ""}  onChange={ (e)=>updateSelectedNodes(selectedNode.id,e.target.value)  }/>

</div>

)

}

</div>

)


}


export default SettingPanel;