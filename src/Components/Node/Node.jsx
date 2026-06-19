import Draggable from "react-draggable";

const Node = ({ id, label, x, y, deleteNode }) => {
  return (
    <Draggable>
      <div
        style={{
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`,
          padding: "10px",
          border: "1px solid black"
        }}
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