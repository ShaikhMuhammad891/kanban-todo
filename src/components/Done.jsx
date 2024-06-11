import React from "react";
import { HiDocumentCheck } from "react-icons/hi2";
import DraggableItem from "./DraggableItem";
import { Droppable } from "react-beautiful-dnd";

const Done = ({ done, handleDeleteTodo, handleEditTodo }) => {
  return (
    <div className="max-w-[560px] w-full bg-[#d5ccff] pb-8 pt-6 px-6 rounded-xl self-start">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <HiDocumentCheck className="text-indigo-800 w-[40px] h-[40px]" />
          <p className="text-indigo-800 text-3xl font-bold">Done</p>
        </div>
      </div>

      <Droppable droppableId="doneList">
        {(provided) => (
          <div
            className=" text-center text-2xl font-semibold"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {done.length === 0
              ? "No Done items here"
              : done.map((todo, index) => (
                  <DraggableItem
                    key={todo.id}
                    todo={todo}
                    index={index}
                    handleEditTodo={handleEditTodo}
                    handleDeleteTodo={handleDeleteTodo}
                    status="done"
                  />
                ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Done;
