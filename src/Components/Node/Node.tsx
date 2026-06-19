import Draggable from "react-draggable";

type NodeProps={

id:number,
label:string,
x:number,
y:number,
deleteNode:(id:number)=>void;
updateNodePosition:(id:number,x:number,y:number)=>void;

}

const Node = ({ id, label, x, y, deleteNode,updateNodePosition }:NodeProps) => {
  return (
    <Draggable position={{ x,y }}  onStop={ (e,data)=>{ updateNodePosition(id,data.x,data.y)}}>
      <div
        style={{
          padding: "10px",
          border: "1px solid black",
          zIndex:10
        }}

        className="w-30 absolute "
      >
        <h2>{id} - {label}</h2>

        <button onClick={() => deleteNode(id)}>
          Delete Node
        </button>
      </div>
    </Draggable>
  );
};

export default Node;