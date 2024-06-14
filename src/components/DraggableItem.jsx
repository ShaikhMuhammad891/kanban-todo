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
          onClick={() => handleEditTodo(todo.id, status)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-black">{todo.title}</h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTodo(todo.id, status);
              }}
            >
              <RiDeleteBin6Line color="red" className="w-[25px] h-[25px]" />
            </button>
          </div>
          <p className=" mt-4 text-start font-normal text-[16px] tracking-wide">
            {todo.description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <div
              className={`${
                status === "todo" ? "" : "text-blue-500"
              } flex gap-3 items-center`}
            >
              <p className="py-1 px-2 bg-[#ECB800]  text-[16px] rounded-md font-inter text-white tracking-wide">
                Fri
              </p>
              <p
                className={`${
                  status === "todo"
                    ? "bg-[#ECB800]   rounded-bl-full h-[13px] w-[23px]"
                    : "bg-indigo-700 rounded-bl-full h-[13px] w-[23px]"
                }`}
              ></p>
              <p
                className={`${
                  status === "todo"
                    ? "bg-gray-300 rounded-bl-full h-[13px] w-[23px]"
                    : "bg-indigo-700 rounded-bl-full h-[13px] w-[23px]"
                }`}
              ></p>
            </div>
            <p className="text-2xl text-indigo-800">{index + 1}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
