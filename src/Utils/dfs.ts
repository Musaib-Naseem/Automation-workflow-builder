export const dfs = (
  nodeId: string,
  graph: Record<string, string[]>,
  visited: Set<string>
): void => {
  visited.add(nodeId);

  const neighbours = graph[nodeId] ?? [];

  neighbours.forEach((nextNode) => {
    if (!visited.has(nextNode)) {
      dfs(nextNode, graph, visited);
    }
  });
};