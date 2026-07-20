import React,{useState} from "react";
import { useWorkflowStore } from "../../Store/WorkflowStore";

import {
  MdEmail,
  MdOutlineSms,
  MdStorage,
  MdSecurity,
} from "react-icons/md";

import {
  LuClock3,
  LuFileText,
  LuDatabase,
} from "react-icons/lu";

import {
  GoGitBranch,
} from "react-icons/go";

import {
  FaBell,
  FaGlobe,
} from "react-icons/fa6";



const InputModal=()=>{

const isModalOpen = useWorkflowStore((state)=>state.isModalOpen);

const setIsModalOpen = useWorkflowStore((state)=>state.setIsModalOpen);

const edges = useWorkflowStore((state)=>state.edges);

const setEdges = useWorkflowStore((state)=>state.setEdges);

const [inputData,setInputData] = useState({ label:"",type:"",description:""});

console.log(inputData);

const nodes = useWorkflowStore((state)=>state.nodes);
const setNodes = useWorkflowStore((state)=>state.setNodes);
const setNewUpdateNode = useWorkflowStore((state)=>state.setNewUpdateNode);


const createNewNode=(e)=>{

e.preventDefault();

const lastNode = nodes[nodes.length-1];

const lastEdge = edges[edges.length-1];

const newNode = {

id:crypto.randomUUID(),
position:{x:lastNode ? lastNode.position.x == 500 ? 100: lastNode.position.x+200 : 100 ,y:lastNode ? lastNode.position.x === 500 ? lastNode.position.y+100 : lastNode.position.y : 100 },
data:{
label:inputData.label,
type:inputData.type,
description:inputData.description
},
style:{}

}

if(!lastEdge) return;

const newEdgeOne = {

id:`e${lastEdge?.target}-${newNode.id}`,
source:lastEdge?.target,
target:newNode.id

}

const UpdatedEdgeAll = [...edges,newEdgeOne]

const updateNodesAll = [...nodes,newNode];

setEdges(UpdatedEdgeAll);

const graph:Record<string,string[]>={}

UpdatedEdgeAll.forEach((edge)=>{

if(!graph[edge.source]){

graph[edge.source] ??= [];

}

graph[edge.source]!.push(edge.target)

});

console.log(graph);

const visited = new Set<string>();

const dfs=(nodeId:string)=>{

visited.add(nodeId);

const neighbours = graph[nodeId] || [];

neighbours.forEach((nextNode)=>{

if(!visited.has(nextNode)){

dfs(nextNode);

}

})

}

dfs("1");

const updateNodes = updateNodesAll.map((node)=>({

...node,

style:{

...node.style,
backgroundColor:visited.has(node.id)  ? "#DCFCE7" // reachable
      : "#FEE2E2",
border:visited.has(node.id)  ? "2px solid green" // reachable
      : "2px solid red",

}

}));

// console.log(updateNodes);

setNodes(updateNodes);
setNewUpdateNode(updateNodes);


setInputData({

label:"",
type:"",
description:""

})

setIsModalOpen(false);

}





return(

<>

{

isModalOpen && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
  <div className="w-full max-w-md p-4">
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Create New Node
        </h3>

        <button
          onClick={() => setIsModalOpen(false)}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <form className="p-4 space-y-4">

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Label
          </label>

          <input
            id="name"
            type="text"
            placeholder="Type node name"
            value={inputData.label}
            onChange={(e)=>setInputData((prev)=>({ ...prev,label:e.target.value}))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">

        

          <div>
            <label
              htmlFor="icon"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Type

            </label>

            <select
              id="icon"
              value={inputData.type}
              onChange={(e)=>setInputData((prev)=>({...prev,type:e.target.value}))}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Select Type</option>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
              <option value="Storage">Storage</option>
              <option value="Security">Security</option>
              <option value="Clock">Clock</option>
              <option value="File">File</option>
              <option value="Database">Database</option>
              <option value="Git Branch">Git Branch</option>
              <option value="Bell">Bell</option>

            </select>
          </div>

        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Node Description
          </label>

          <textarea
            id="description"
            value={inputData.description}
            onChange={(e)=>setInputData((prev)=>({...prev,description:e.target.value}))}
            rows={4}
            placeholder="Write product description here"
            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-300 pt-4">

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={(e)=>createNewNode(e)}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
          >
            Add Node
          </button>

        </div>
      </form>
    </div>
  </div>
</div>


)

}



</>


)

}


export default InputModal;








// <!-- Modal toggle -->
// <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
//   Toggle modal
// </button>

// <!-- Main modal -->













