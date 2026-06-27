import Sidebar from "./Components/Sidebar/Sidebar";
import Canvas from "./Components/Canvas/Canvas";
import { useEffect, useState } from "react";
import type { WorkFlowMode,WorkFlowMode2 } from "./Types_ts/node";
import SettingPanel from "./Components/SettingPanel/SettingPanel";
import { BiExport } from "react-icons/bi";
import { LuWorkflow } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { TbWebhook } from "react-icons/tb";



function App() {

const [selectedNode,setSelectedNode] = useState<WorkFlowMode| null>(null);

const defaultNodes:WorkFlowMode2[] = [

{

id:"1",
position:{x:100,y:100},
data:{  
label:"Email",
type:"Email"

},

},

{

id:"2",
position:{x:300,y:100},
data:{
label:"Delay",
type:"Delay"

},


},

{

id:"3",
position:{x:500,y:100},
data:{
label:"Condition",
type:"Condition"

},

}

]



const [nodes,setNodes] = useState<WorkFlowMode2[]>(()=>{

const savedNodes = localStorage.getItem("workflowNodes");

return savedNodes ? JSON.parse(savedNodes) : defaultNodes;

});


console.log(nodes);

useEffect(()=>{

localStorage.setItem("workflowNodes",JSON.stringify(nodes));

},[nodes])


const edges = [

{

id:"e1-2",
source:"1",
target:"2"

},

{

id:"e2-3",
source:"2",
target:"3"

}

];


const updateSelectedNodes=(id:string,label:string)=>{

setNodes(nodes.map((node)=>node.id === id ? {...node,data:{...node.data,label}} : node ));
setSelectedNode((prev) => {
  if (!prev || prev.id !== id) return prev;

  return {
    ...prev,
    data: {
      ...prev.data,
      label,
    },
  };
});
};

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
  <button style={{ border:"1px solid #D0D0D0"}} className="mr-6 text-sm px-4 py-2 bg-[#ffffff] text-[#374151] rounded cursor-pointer font-bold  flex items-center hover:bg-[#4F33BD] transition"> <MdOutlineDelete  style={{ fontSize:"18px",color:"#374151"}}/> &nbsp;&nbsp;Clear Workflow</button>
   
  <button className="text-sm px-4 py-2 bg-[#6040E0] text-white rounded cursor-pointer flex items-center hover:bg-[#4F33BD] transition"> <BiExport style={{ fontSize:"18px"}}/> &nbsp;&nbsp;Export Workflow</button>
   </div>
   
  </div>


   <div  className='flex'>

   <div className='w-[18%]' style={{ borderRight:"1.5px solid #D0D0D0"}}>

   <Sidebar nodes={nodes}/>

   </div>

    <div className='w-[57%]' style={{ backgroundColor:"#F8FAFC",borderRight:"1.5px solid #D0D0D0"}}>

  <Canvas nodes={nodes}  edges={edges} setSelectedNode={setSelectedNode} />

   </div>

    <div className='w-[25%]'>

    <SettingPanel selectedNode={selectedNode}  updateSelectedNodes={updateSelectedNodes}/>

   </div>

   </div>


   </div>

    </>
  )
}

export default App;
