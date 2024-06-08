import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Draggable } from "react-beautiful-dnd";

const DraggableItem = ({
  todo,
  index,
  handleDeleteTodo,
  handleEditTodo,
  status,
}) => {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          className="mt-4 bg-white rounded-xl p-5 cursor-grab z-[1000]"
          onClick={() => handleEditTodo(todo, index, status)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-black">{todo.title}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTodo(index, status);
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
      )}
    </Draggable>
  );
};

export default DraggableItem;
