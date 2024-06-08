import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import Done from "./Done";
import Modal from "../components/Modal";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  // Get from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedDone = localStorage.getItem("done");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    if (storedDone) {
      setDone(JSON.parse(storedDone));
    }
  }, []);

  // Set to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("done", JSON.stringify(done));
  }, [todos, done]);

  const handleAddTodo = (todo, index) => {
    if (currentStatus === "todo") {
      if (index !== null) {
        setTodos((prevTodos) =>
          prevTodos.map((t, i) => (i === index ? todo : t))
        );
      } else {
        setTodos((prevTodos) => [...prevTodos, { ...todo, id: uuidv4() }]);
      }
    } else if (currentStatus === "done") {
      if (index !== null) {
        setDone((prevDone) =>
          prevDone.map((t, i) => (i === index ? todo : t))
        );
      } else {
        setDone((prevDone) => [...prevDone, { ...todo, id: uuidv4() }]);
      }
    }
  };

  const handleDeleteTodo = (index, status) => {
    if (status === "todo") {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
    } else if (status === "done") {
      const newDone = done.filter((_, i) => i !== index);
      setDone(newDone);
    }
  };

  const handleEditTodo = (todo, index, status) => {
    setCurrentTodo(todo);
    setCurrentIndex(index);
    setCurrentStatus(status);
    setShowModal(true);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "todoList") {
        const reorderedTodos = Array.from(todos);
        const [movedTodo] = reorderedTodos.splice(source.index, 1);
        reorderedTodos.splice(destination.index, 0, movedTodo);
        setTodos(reorderedTodos);
      } else if (source.droppableId === "doneList") {
        const reorderedDone = Array.from(done);
        const [movedDone] = reorderedDone.splice(source.index, 1);
        reorderedDone.splice(destination.index, 0, movedDone);
        setDone(reorderedDone);
      }
    } else {
      if (source.droppableId === "todoList" && destination.droppableId === "doneList") {
        const updatedTodos = Array.from(todos);
        const [movedTodo] = updatedTodos.splice(source.index, 1);
        const updatedDone = Array.from(done);
        updatedDone.splice(destination.index, 0, movedTodo);
        setTodos(updatedTodos);
        setDone(updatedDone);
      } else if (source.droppableId === "doneList" && destination.droppableId === "todoList") {
        const updatedDone = Array.from(done);
        const [movedDone] = updatedDone.splice(source.index, 1);
        const updatedTodos = Array.from(todos);
        updatedTodos.splice(destination.index, 0, movedDone);
        setDone(updatedDone);
        setTodos(updatedTodos);
      }
    }
  };

  return (
    <>
      <div className="max-w-[1440px] mx-auto">
        <p className="text-[#ffffff] text-center text-[72px] font-inter font-semibold mt-10 leading-[1]">
          Todo Kanban
        </p>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="mt-12 grid grid-cols-2 gap-5 w-full justify-items-center">
            <Todo
              todos={todos}
              handleAddTodo={handleAddTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleEditTodo={handleEditTodo}
              setShowModal={setShowModal}
              setCurrentTodo={setCurrentTodo}
              setCurrentIndex={setCurrentIndex}
              setCurrentStatus={setCurrentStatus}
            />
            <Done
              done={done}
              handleAddTodo={handleAddTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleEditTodo={handleEditTodo}
              setShowModal={setShowModal}
              setCurrentTodo={setCurrentTodo}
              setCurrentIndex={setCurrentIndex}
              setCurrentStatus={setCurrentStatus}
            />
          </div>
        </DragDropContext>
      </div>

      <div className="absolute top-1/4 left-1/3">
        <Modal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setCurrentTodo(null);
            setCurrentIndex(null);
            setCurrentStatus(null);
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
