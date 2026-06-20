// import { useState } from 'react'
// import Sidebar from './Components/Sidebar/Sidebar';
// import Canvas from "./Components/Canvas/Canvas";
// import ReactFlow from "reactflow";
// import "reactflow/dist/style.css";


// function App() {

// const nodes = [

// {

// id:"1",
// position:{x:100,y:100},
// data:{label:"Email"}

// },

// {

// id:"2",
// position:{x:300,y:100},
// data:{label:"Delay"}

// },

// {

// id:"3",
// position:{x:500,y:100},
// data:{label:"Condition"}

// }

// ];



// const edges = [

// {

// id:"e1-2",
// source:"1",
// target:"2"

// },

// {

// id:"e2-3",
// source:"2",
// target:"3"

// }

// ]




//   return (
//     <>


//    <div>

//    <div style={{ borderBottom:"1px solid grey"}} className='h-20 w-full'>

//   <h1 className="text-4xl font-bold"> Workflow Builder </h1>

//    </div>

//    <div  className='flex'>

//    <div className='w-[25%] h-[100vh]' style={{ borderRight:"1px solid grey"}}>

//  <Sidebar />


//    </div>

//     <div className='w-full h-[100vh]'>

//     <div>

//   <Canvas nodes={nodes}  edges={edges}/>

//    </div>

//    </div>


//    </div>


//    </div>

//     </>
//   )
// }

// export default App;
