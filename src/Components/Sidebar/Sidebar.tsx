import React from "react";
import type { WorkFlowMode2 } from "../../Types_ts/node";


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

const Icon = details.data.icon;

console.log(details)

return(

<div key={details.id} className="w-38 flex items-center gap-4 p-2 border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition">

<div className={`w-10 h-10 flex items-center justify-center rounded-lg ${details.data.bg}`}> 

{ Icon && <Icon className={`text-xl ${details.data.color}`}  /> }

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