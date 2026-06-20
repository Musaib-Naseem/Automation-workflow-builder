import Sidebar from "./Components/Sidebar/Sidebar";
import Canvas from "./Components/Canvas/Canvas";
import { useEffect, useState } from "react";
import type { WorkFlowMode } from "./Types_ts/node";
import SettingPanel from "./Components/SettingPanel/SettingPanel";


function App() {

const [selectedNode,setSelectedNode] = useState<WorkFlowMode| null>(null);

console.log(selectedNode);


const defaultNodes:WorkFlowMode[] = [

{

id:"1",
position:{x:100,y:100},
data:{label:"Email"}

},

{

id:"2",
position:{x:300,y:100},
data:{label:"Delay"}

},

{

id:"3",
position:{x:500,y:100},
data:{label:"Condition"}

}

]







const [nodes,setNodes] = useState<WorkFlowMode[]>(()=>{

const savedNodes = localStorage.getItem("workflowNodes");

return savedNodes ? JSON.parse(savedNodes) : defaultNodes;

});


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

  return (
    <>


   <div>

   <div style={{ borderBottom:"1px solid grey"}} className='h-20'>

  <h1 className="text-4xl font-bold"> Workflow Builder </h1>

   </div>

   <div  className='flex'>

   <div className='w-[40%] h-[100vh]' style={{ borderRight:"1px solid grey"}}>

 <Sidebar />


   </div>

    <div className='h-[100vh]'>

    <div>

  <Canvas nodes={nodes}  edges={edges} setSelectedNode={setSelectedNode} />

   </div>

   </div>


    <div className='w-[40%] h-[100vh]' style={{ borderRight:"1px solid grey"}}>

 

    <SettingPanel selectedNode={selectedNode}  updateSelectedNodes={updateSelectedNodes}/>


   </div>


   </div>


   </div>

    </>
  )
}

export default App;


// const App=()=>{

// return(


// <div style={{ width:"100vw" , height:"100vh"}}>
// <ReactFlow nodes={nodes}  edges={edges}/>
// </div>

// )

// }


// export default App;