import React from "react";
import { useWorkflowStore } from "../../Store/WorkflowStore";

const InputModal=()=>{

const isModalOpen = useWorkflowStore((state)=>state.isModalOpen);

const setIsModalOpen = useWorkflowStore((state)=>state.setIsModalOpen);

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
            placeholder="Type product name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Type
            </label>

            <input
              id="price"
              type="number"
              placeholder="$2999"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Icon
            </label>

            <select
              id="category"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Select category</option>
              <option>TV/Monitors</option>
              <option>PC</option>
              <option>Gaming/Console</option>
              <option>Phones</option>
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
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
          >
            Add Product
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













