import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import Modal from "../components/Modal";
import { v4 as uuidv4 } from "uuid";
import Done from "./Done";
import { DndContext } from "@dnd-kit/core";

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Get from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // set to localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const handleAddTodo = (todo, index) => {
    if (index !== null) {
      setTodos((prevTodos) =>
        prevTodos.map((t, i) => (i === index ? todo : t))
      );
    } else {
      setTodos((prevTodos) => [...prevTodos, { ...todo, id: uuidv4() }]);
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEditTodo = (todo, index) => {
    setCurrentTodo(todo);
    setCurrentIndex(index);
    setShowModal(true);
  };



  return (
    <>
      <div className="max-w-[1440px] mx-auto">
        <p className="text-[#ffffff] text-center text-[72px] font-inter font-semibold mt-10 leading-[1]">
          Todo Kanban
        </p>
        <DndContext>
          <div className="mt-12 grid grid-cols-2 gap-5 w-full justify-items-center">
            <Todo
              todos={todos}
              handleAddTodo={handleAddTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleEditTodo={handleEditTodo}
              setShowModal={setShowModal}
              setCurrentTodo={setCurrentTodo}
              setCurrentIndex={setCurrentIndex}
            />
            <Done />
          </div>
        </DndContext>
      </div>

      <div className=" absolute top-1/4 left-1/3">
        <Modal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setCurrentTodo(null);
            setCurrentIndex(null);
          }}
          onSubmit={handleAddTodo}
          todo={currentTodo}
          index={currentIndex}
        />
      </div>
    </>
  );
};

export default MainPage;
