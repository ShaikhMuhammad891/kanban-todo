import React, { useState, useEffect } from "react";
import Done from "../components/Done";
import Todo from "../components/Todo";
import Modal from "../components/Modal";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  // Get from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedDone = localStorage.getItem("done");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos || []));
    }
    if (storedDone) {
      setDone(JSON.parse(storedDone || []));
    }
  }, []);

  // Set to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("done", JSON.stringify(done));
  }, [todos, done]);

  const handleAddTodo = (editTodo, editIndex) => {
    if (currentStatus === "todo") {
      if (editIndex !== null) {
        setTodos((prevTodos) =>
          prevTodos.map((t, i) => (i === editIndex ? editTodo : t))
        );
        toast.success("To-do updated successfully!");
      } else {
        setTodos((prevTodos) => [...prevTodos, { ...editTodo, id: uuidv4() }]);
        toast.success("To-do added successfully!");
      }
    } else if (currentStatus === "done") {
      if (editIndex !== null) {
        setDone((prevDone) =>
          prevDone.map((t, i) => (i === editIndex ? editTodo : t))
        );
        toast.success("Done item updated successfully!");
      } else {
        setDone((prevDone) => [...prevDone, { ...editTodo, id: uuidv4() }]);
        toast.success("Done item added successfully!");
      }
    }
  };

  const handleDeleteTodo = (index, status) => {
    if (status === "todo") {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
      toast.error("To-do deleted successfully!");
    } else if (status === "done") {
      const newDone = done.filter((_, i) => i !== index);
      setDone(newDone);
      toast.error("Done item deleted successfully!");
    }
  };

  const handleEditTodo = (todo, index, status) => {
    setEditTodo(todo);
    setEditIndex(index);
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
      if (
        source.droppableId === "todoList" &&
        destination.droppableId === "doneList"
      ) {
        const updatedTodos = Array.from(todos);
        const [movedTodo] = updatedTodos.splice(source.index, 1);
        const updatedDone = Array.from(done);
        updatedDone.splice(destination.index, 0, movedTodo);
        setTodos(updatedTodos);
        setDone(updatedDone);
        toast.success("Todo moved to completed");
      } else if (
        source.droppableId === "doneList" &&
        destination.droppableId === "todoList"
      ) {
        const updatedDone = Array.from(done);
        const [movedDone] = updatedDone.splice(source.index, 1);
        const updatedTodos = Array.from(todos);
        updatedTodos.splice(destination.index, 0, movedDone);
        setDone(updatedDone);
        setTodos(updatedTodos);
        toast.success("Todo moved to pending");
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
              setEditTodo={setEditTodo}
              setEditIndex={setEditIndex}
              setCurrentStatus={setCurrentStatus}
            />
            <Done
              done={done}
              handleDeleteTodo={handleDeleteTodo}
              handleEditTodo={handleEditTodo}
            />
          </div>
        </DragDropContext>
      </div>

      <div className="absolute top-1/4 left-1/3">
        <Modal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setEditTodo(null);
            setEditIndex(null);
            setCurrentStatus(null);
          }}
          onSubmit={handleAddTodo}
          editTodo={editTodo}
          EditIndex={editIndex}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default MainPage;
