import React from "react";

type sidebarProps={

AddNodes:()=>void

}

const Sidebar=({AddNodes}:sidebarProps)=>{

return(

<>

<button onClick={AddNodes}> Add Node </button>

</>

)

}

export default Sidebar;