import type { WorkFlowMode } from './../Types_ts/node';

export const updateReachableNodes = (
  nodes: WorkFlowMode[],
  visited: Set<string>
) => {
  return nodes.map((node) => ({
    ...node,
    style: {
      ...node.style,
      backgroundColor: visited.has(node.id)
        ? "#DCFCE7"
        : "#FEE2E2",
      border: visited.has(node.id)
        ? "2px solid green"
        : "2px solid red",
    },
  }));
};