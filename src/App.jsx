import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar';
import Canvas from "./Components/Canvas/Canvas";
import Node from './Components/Node/Node';


function App() {

const [nodes,setNodes] = useState([


  {
    id: 1,
    label: "Email",
    x: 0,
    y: 0
  },
  {
    id: 2,
    label: "Delay",
    x: 300,
    y: 100
  },
  {
    id: 3,
    label: "Condition",
    x: 550,
    y: 100
  },

  {
  id: 4,
  label: "Webhook",
  x: 750,
  y: 250
}

]);







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


const deleteNode=(id)=>{

setNodes(nodes.filter((node)=>node.id !== id));

}

  return (
    <>
     
   <h1> Workflow Builder New </h1>

   <Sidebar AddNodes={AddNodes} />

   <div>

   <button onClick={moveRight}> Move Right </button>

   <button onClick={moveLeft}> Move Left </button>

   <button onClick={moveUp}> Move Up </button>

   <button onClick={moveDown}> Move Down </button>

   </div>

   <br />

   <Canvas nodes={nodes} deleteNode={deleteNode}/>

    </>
  )
}

export default App
