import React from "react";
import { IoClipboardOutline } from "react-icons/io5";
import Button from "../components/Button";
import DraggableItem from "./DraggableItem";

const Todo = ({
  todos,
  handleAddTodo,
  handleDeleteTodo,
  handleEditTodo,
  setShowModal,
  setCurrentTodo,
  setCurrentIndex,
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
              setCurrentTodo(null);
              setCurrentIndex(null);
            }}
          />
        </div>
      </div>

      <div>
        {todos.length === 0
          ? "No Todos here"
          : todos.map((todo, index) => (
              <DraggableItem
                key={todo.id}
                todo={todo}
                index={index}
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
              />
            ))}
      </div>
    </div>
  );
};

export default Todo;