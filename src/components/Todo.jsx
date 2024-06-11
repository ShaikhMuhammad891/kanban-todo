import React from "react";
import { IoClipboardOutline } from "react-icons/io5";
import Button from "../components/Button";
import DraggableItem from "../components/DraggableItem";
import { Droppable } from "react-beautiful-dnd";

const Todo = ({
  todos,
  handleDeleteTodo,
  handleEditTodo,
  setShowModal,
  setEditTodo,
  setEditIndex,
  setCurrentStatus,
}) => {
  return (
    <div className="max-w-[560px] w-full bg-[#d5ccff] pb-8 pt-6 px-6 rounded-xl self-start">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <IoClipboardOutline color="#2B1887" className="w-[40px] h-[40px]" />
          <p className="text-indigo-800 text-3xl font-bold">To-Do</p>
        </div>
        <div>
          <Button
            onClick={() => {
              setShowModal(true);
              setEditTodo(null);
              setEditIndex(null);
              setCurrentStatus("todo");
            }}
          />
        </div>
      </div>

      <Droppable droppableId="todoList">
        {(provided) => (
          <div
            className=" text-center font-semibold text-2xl"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.length === 0
              ? "No Todos here"
              : todos.map((todo, index) => (
                  <DraggableItem
                    key={todo.id}
                    todo={todo}
                    index={index}
                    handleEditTodo={handleEditTodo}
                    handleDeleteTodo={handleDeleteTodo}
                    status="todo"
                  />
                ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Todo;
