import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar';
import Canvas from "./Components/Canvas/Canvas";
import Node from './Components/Node/Node';


function App() {

const [nodes,setNodes] = useState([

]);


const AddNodes=()=>{

setNodes((prev)=>[...prev,{id:Date.now(),label:`Node ${nodes.length+1}`}]);

}

  return (
    <>
     
   <h1> Workflow Builder New </h1>

   <Sidebar AddNodes={AddNodes} />

   <br />

   <Canvas nodes={nodes} />

    </>
  )
}

export default App
