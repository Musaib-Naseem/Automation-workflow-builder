import type { Edge } from "reactflow";

export const BuildGraph=(edges:Edge[])=>{

const graph:Record<string,string[]> = {};

for(const edge of edges){

graph[edge.source] ??= [];
graph[edge.source]?.push(edge.target);

}

return graph;

}