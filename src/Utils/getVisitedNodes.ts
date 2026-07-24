export const getVisitedNodes = (
  graph: Record<string, string[]>,
  startNode: string
) => {
  const visited = new Set<string>();

  const dfs = (nodeId: string) => {
    visited.add(nodeId);

    for (const next of graph[nodeId] ?? []) {
      if (!visited.has(next)) {
        dfs(next);
      }
    }
  };

  dfs(startNode);

  return visited;
};