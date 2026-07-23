import React,{useState} from "react";
import type { WorkFlowMode } from "../../Types_ts/node";
import { ConfigNode } from "../../Types_ts/ConfigNode";
import { FaSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useWorkflowStore } from "../../Store/WorkflowStore";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";



type settingPanelProps={

selectedNode:WorkFlowMode|null;
updateSelectedNodes:(id:string,label:string)=>void;
updateSelectedNodesDisc:(id:string,description:string)=>void;
updateMyNode:()=>void;
deleteSelectedNode:(id:string)=>void;
pause:()=>void,
resume:()=>void,
stop:()=>void,
reset:()=>void,

}


const SettingPanel=({pause,resume,stop,reset,selectedNode,updateSelectedNodes,updateSelectedNodesDisc,updateMyNode,deleteSelectedNode}:settingPanelProps)=>{

const config = selectedNode
  ? ConfigNode[selectedNode.data.type as keyof typeof ConfigNode]
  : null;

const Icon = config?.icon;



const setExecutionNode = useWorkflowStore((state)=>state.setExecutionNode); 

const logs = useWorkflowStore((state)=>state.logs);


const upLabel=(e:string,id:string):void=>{

updateSelectedNodes(id,e);

}


const upDesc=(e:string,id:string):void=>{

updateSelectedNodesDisc(id,e);

}


const showLabelError = useWorkflowStore((state)=>state.showLabelError);

const showDescError = useWorkflowStore((state)=>state.showDescError);

const showDuplicateError = useWorkflowStore((state)=>state.showDuplicateError);

const setShowExecutionPanel = useWorkflowStore((state)=>state.setShowExecutionPanel);


return(

<div>

{
  !useWorkflowStore.getState().showExecutionPanel ? (

    <div className="pt-6">

      <h2 className="pl-8 pb-4 text-sm font-bold text-[#111827] border-b border-[#E5E7EB]">
        SETTING PANEL
      </h2>

      {!selectedNode && (
        <p className="pl-8 pt-4 text-[#374151] font-[500]">
          No Node Selected
        </p>
      )}

      {selectedNode && (
        <div className="pl-8 pt-4">

          <label className="text-sm font-[500]">Node ID</label>
          <br />

          <input
            disabled
            type="text"
            value={selectedNode.id}
            className="cursor-not-allowed bg-[#F9FAFB] p-2 border border-[#D1D5DB] mt-2 rounded-md w-[90%] hover:shadow-sm transition"
          />

          <br />
          <br />

          <label className="text-sm font-[500]">Node Type</label>

          <br />

          <div className="cursor-not-allowed flex items-center border border-[#D1D5DB] rounded-md w-[90%] mt-2 px-1 bg-[#F9FAFB] hover:shadow-sm transition">

            <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${config?.bg}`}>
              {Icon && <Icon className={`text-lg ${config?.color}`} />}
            </div>

            <input
              type="text"
              value={selectedNode.data.type}
              readOnly
              className="cursor-not-allowed flex-1 p-2 outline-none bg-transparent"
            />

          </div>

          <br />

          <label className="text-sm font-[500]">Node Label</label>

          <br />

          <input
            type="text"
            value={selectedNode.data.label}
            onChange={(e) => upLabel(e.target.value, selectedNode.id)}
            className="p-2 border border-[#D1D5DB] mt-2 rounded-md w-[90%] hover:shadow-sm transition focus:outline-none focus:ring-1 focus:ring-[#6040E0] focus:border-[#6040E0]"
          />

          {showLabelError && (
            <span className="text-red-600 text-sm">
              *Label can't be empty
            </span>
          )}

          {showDuplicateError && (
            <span className="text-red-600 text-sm">
              *Label already exists
            </span>
          )}

          <br />
          <br />

          <label className="text-sm font-[500]">
            Node Description
          </label>

          <br />

          <textarea
            value={selectedNode.data.description}
            onChange={(e) => upDesc(e.target.value, selectedNode.id)}
            className="h-[95px] p-2 border border-[#D1D5DB] mt-2 rounded-md w-[90%] hover:shadow-sm transition focus:outline-none focus:ring-1 focus:ring-[#6040E0] focus:border-[#6040E0]"
          />

          {showDescError && (
            <span className="text-red-500 text-sm">
              *Description can't be empty
            </span>
          )}

          <br />
          <br />

          <div className="flex flex-col">

            <button
              onClick={updateMyNode}
              className="cursor-pointer border-[#059669] border-2 bg-[#059669] text-white w-[90%] p-2 font-[500] rounded-md mt-2 flex justify-center items-center text-sm"
            >
              <FaSave />
              &nbsp; Save Changes
            </button>

            <button
              onClick={() => deleteSelectedNode(selectedNode.id)}
              className="cursor-pointer border-[#EF4444] border-2 text-[#EF4444] w-[90%] p-2 font-[500] rounded-md mt-4 mb-4 flex justify-center items-center text-sm"
            >
              <MdDelete />
              &nbsp; Delete Node
            </button>

          </div>

        </div>
      )}

    </div>

  ) : (

    <div className="pt-6">

   

      {/* <h1 className="mt-6 px-4 text-lg font-semibold">
        Execution
      </h1> */}

       <h2 className="pl-4 pb-4 text-lg font-bold text-[#111827] border-b border-[#E5E7EB]">
        Execution
      </h2>


  { setExecutionNode !== null &&  <div className="flex gap-2 px-4 pt-4 pb-4">


  <button
    onClick={pause}
    className="w-1/4 py-2 rounded-lg bg-[#F59E0B] text-white font-semibold text-sm shadow-md hover:bg-[#D97706] hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
  >
    Pause
  </button>

  <button
    onClick={resume}
    className="w-1/4 py-2 rounded-lg bg-[#10B981] text-white font-semibold text-sm shadow-md hover:bg-[#059669] hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
  >
    Resume
  </button>

  <button
    onClick={stop}
    className="w-1/4 py-2 rounded-lg bg-[#EF4444] text-white font-semibold text-sm shadow-md hover:bg-[#DC2626] hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
  >
    Stop
  </button>

  <button
    onClick={reset}
    className="w-1/4 py-2 rounded-lg bg-[#3B82F6] text-white font-semibold text-sm shadow-md hover:bg-[#2563EB] hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer"
  >
    Reset
  </button>

</div>

}


      <div className="mt-4 px-4 space-y-2">

        {logs.map((val, index) => (
          <div key={index}>
            <h2 className="flex items-center gap-2 text-sm">
              <FaCheck className="text-green-600" />
              {val}
            </h2>
          </div>
        ))}

      </div>


    </div>

  )}

  </div>
  
)
}

export default SettingPanel;