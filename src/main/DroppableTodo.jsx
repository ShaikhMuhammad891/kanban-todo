import React from "react";
import { useDroppable } from "@dnd-kit/core";
import DraggableItem from "./DraggableItem";

const DroppableTodo = ({ droppedItems }) => {
  const droppable = useDroppable({
    id: "droppable-todo",
  });

  const style = {
    backgroundColor: droppable.isOver ? "lightblue" : "white",
  };

  return (
    <div
      ref={droppable.setNodeRef}
      style={style}
      className="mt-4 bg-white rounded-xl p-5 cursor-grab z-[1000]"
    >
      {droppedItems.map((item, index) => (
        <DraggableItem key={item.id} todo={item} index={index} />
      ))}
    </div>
  );
};

export default DroppableTodo;
// commit by mehtab