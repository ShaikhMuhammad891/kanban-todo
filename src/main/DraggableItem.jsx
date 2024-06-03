import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const DraggableItem = ({ todo, index, handleDeleteTodo, handleEditTodo }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="mt-4 bg-white rounded-xl p-5 cursor-grab z-[1000]"
      onClick={() => handleEditTodo(todo, index)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-black">{todo.title}</h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteTodo(index);
          }}
        >
          <RiDeleteBin6Line color="red" className="w-[25px] h-[25px]" />
        </button>
      </div>
      <p>{todo.description}</p>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">Due Date</p>
        <p className="text-2xl text-indigo-800">{index + 1}</p>
      </div>
    </div>
  );
};

export default DraggableItem;
