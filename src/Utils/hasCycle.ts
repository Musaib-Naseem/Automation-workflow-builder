export const hasCycle = (
  graph: Record<string, string[]>,
  startNode: string
) => {
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  const dfs = (nodeId: string): boolean => {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    for (const next of graph[nodeId] ?? []) {
      if (!visited.has(next)) {
        if (dfs(next)) return true;
      } else if (recursionStack.has(next)) {
        return true;
      }
    }

    recursionStack.delete(nodeId);

    return false;
  };

  return dfs(startNode);
};