import React from "react";
import type { WorkFlowMode2 } from "../../Types_ts/node";
import { ConfigNode } from "../../Types_ts/ConfigNode";

type SidebarProps={

nodes:WorkFlowMode2[]

}


const Sidebar=({nodes}:SidebarProps)=>{

return(

<div className="pl-6 pt-8">

<h2 className="text-sm font-bold text-[#D0D0D0]"> NODES </h2>

<div className="flex flex-col gap-4 mt-6">

{

nodes && nodes.map((details)=>{
 
const config = ConfigNode[details.data.type as keyof typeof ConfigNode];

const Icon = config && config.icon;

return(

<div key={details.id} className="w-38 flex items-center gap-4 p-2 border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition">

<div className={`w-10 h-10 flex items-center justify-center rounded-lg ${config && config.bg}`}> 

{ Icon && <Icon className={`text-xl ${config && config.color}`}  /> }

</div>

<span className="font-medium text-gray-800 text-sm">{details.data.label}</span>

</div>

)

})

}

</div>

</div>

)

}

export default Sidebar;