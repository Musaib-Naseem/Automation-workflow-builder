import { useState } from 'react'
import Sidebar from './Components/Sidebar/Sidebar';
import Canvas from "./Components/Canvas/Canvas";
import Node from './Components/Node/Node';
import type { WorkFlowMode } from './Types_ts/node';


function App() {

const [nodes,setNodes] = useState<WorkFlowMode[]>([


  {
    id: 1,
    label: "Email",
    x: 100,
    y: 50
  },
  {
    id: 2,
    label: "Delay",
    x: 250,
    y: 50
  },
  {
    id: 3,
    label: "Condition",
    x: 400,
    y: 50
  },

  {
  id: 4,
  label: "Webhook",
  x: 550,
  y: 50
}

]);



console.log(nodes);



const AddNodes=()=>{

  setNodes((prev)=>[...prev,{id:5,label:"Notification",x:950,y:350}])

}


const moveRight=()=>{

setNodes(nodes.map((node)=>({...node,x:node.x+50})))

}

const moveLeft=()=>{

setNodes(nodes.map((node)=>({...node,x:node.x-50})))

}

const moveUp=()=>{

setNodes(nodes.map((node)=>({...node,x:node.y-50})))

}


const moveDown=()=>{

setNodes(nodes.map((node)=>({...node,x:node.y+50})))

}


const deleteNode=(id:number)=>{

setNodes(nodes.filter((node)=>node.id !== id));

}


const updateNodePosition=(id:number,x:number,y:number)=>{

setNodes(nodes.map((node)=>{

return node.id == id ? { ...node,x,y } : node

}))


}

  return (
    <>


   <div>

   <div style={{ borderBottom:"1px solid grey"}} className='h-20 w-full'>

  <h1 className="text-4xl font-bold"> Workflow Builder </h1>

   </div>

   <div  className='flex'>

   <div className='w-[25%] h-[100vh]' style={{ borderRight:"1px solid grey"}}>

 <Sidebar AddNodes={AddNodes} />


   </div>

    <div className='w-full h-[100vh]'>

    <div>

  <Canvas nodes={nodes} deleteNode={deleteNode} updateNodePosition={updateNodePosition} />

   <button onClick={moveRight}> Move Right </button>

   <button onClick={moveLeft}> Move Left </button>

   <button onClick={moveUp}> Move Up </button>

   <button onClick={moveDown}> Move Down </button>

   </div>

   </div>


   </div>






   </div>

    </>
  )
}

export default App
