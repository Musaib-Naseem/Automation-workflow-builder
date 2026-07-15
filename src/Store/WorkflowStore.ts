import { create } from "zustand";

type WorkflowStore = {
 
  selectedNode: Node | null;

  setSelectedNode: (node: Node | null) => void;
};

export const useWorkflowStore = create<WorkflowStore>((set) => ({
  // State
  nodes: [],
  edges: [],
  selectedNode: null,

  setSelectedNode: (node) => set({ selectedNode: node }),
}));