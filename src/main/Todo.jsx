import React, { useState, useEffect } from "react";
import { IoClipboardOutline } from "react-icons/io5";
import Button from "../components/Button";
import Modal from "../components/Modal";
import DraggableItem from "./DraggableItem";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  // get from localStorage
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
    </>
  );
};

export default Todo;
