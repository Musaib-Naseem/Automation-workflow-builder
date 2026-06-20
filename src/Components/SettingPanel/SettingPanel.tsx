import React from "react";
import type { WorkFlowMode } from "../../Types_ts/node";


type settingPanelProps={

selectedNode:WorkFlowMode|null;
updateSelectedNodes:(id:string,label:string)=>void

}


const SettingPanel=({selectedNode,updateSelectedNodes}:settingPanelProps)=>{

return(

<>

<h1>

Setting Panel

</h1>


{!selectedNode && ( <p>Select a Node</p> )}

{

selectedNode && (

<div>

<p> Selected Node : { selectedNode.id}</p>

<p> Selected Label : { selectedNode.data.label}</p>

<input type="text" value={selectedNode?.data.label || ""}  onChange={ (e)=>selectedNode && updateSelectedNodes(selectedNode.id,e.target.value)  }/>

</div>

)


}

</>

)


}


export default SettingPanel;