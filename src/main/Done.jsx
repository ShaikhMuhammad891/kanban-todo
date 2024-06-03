import React, { useState } from "react";
import { HiDocumentCheck } from "react-icons/hi2";
import { DndContext, useDroppable } from "@dnd-kit/core";
import DraggableItem from "./DraggableItem";
import { arrayMove } from "@dnd-kit/sortable";

const Done = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDrop = (event) => {
    const { over, active } = event;

    if (over) {
      setDroppedItems((items) => {
        const newIndex = over.index;
        const movedItems = arrayMove(items, active.id, newIndex);
        return movedItems;
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDrop}>
      <div className="max-w-[560px] w-full bg-[#d5ccff] pb-4 pt-3 px-3 rounded-xl self-start">
        <div className="flex gap-5">
          <HiDocumentCheck className="text-indigo-800 w-[40px] h-[40px]" />
          <div className="text-indigo-800 text-3xl font-bold">Done</div>
        </div>
        <DroppableTodo droppedItems={droppedItems} />
      </div>
    </DndContext>
  );
};

export default Done;
