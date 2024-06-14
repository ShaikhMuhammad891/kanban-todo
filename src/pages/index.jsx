import React, { useState, useEffect } from "react";
import Done from "../components/Done";
import Todo from "../components/Todo";
import Modal from "../components/Modal";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [status, setStatus] = useState(null);

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

  const handleAddAndUpdateTodo = (todo, editIndex) => {
    if (status === "todo") {
      //update inside todo
      if (editIndex !== null) {
        const updatedTodo = [...todos];
        updatedTodo[editIndex] = todo;
        setTodos(updatedTodo);
        toast.success("To-do updated successfully!");
      }

      //add inside todo
      else {
        setTodos((prev) => [...prev, { ...todo, id: uuidv4() }]);
        toast.success("To-do added successfully!");
      }
    } else if (status === "done") {
      //update inside done
      if (editIndex !== null) {
        const updatedDone = [...done];
        updatedDone[editIndex] = todo;
        setDone(updatedDone);
        toast.success("Done item updated successfully!");
      }

      // add inside done
      else {
        setDone((prev) => [...prev, { ...editTodo, id: uuidv4() }]);
        toast.success("Done item added successfully!");
      }
    }
  };

  const handleDeleteTodo = (todoId, status) => {
    if (status === "todo") {
      const newTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(newTodos);
      toast.error("To-do deleted successfully!");
    } else if (status === "done") {
      const newDone = done.filter((done) => done.id !== todoId);
      setDone(newDone);
      toast.error("Done item deleted successfully!");
    }
  };

  const handleEditTodo = (todoId, status) => {
    if (status === "todo") {
      const findValue = todos.find((el) => el.id === todoId);
      const findIndex = todos.indexOf(findValue);
      setEditTodo(findValue);
      setEditIndex(findIndex);
      setStatus(status);
      setShowModal(true);
    } else if (status === "done") {
      const findValue = done.find((el) => el.id === todoId);
      const findIndex = done.indexOf(findValue);
      setEditTodo(findValue);
      setEditIndex(findIndex);
      setStatus(status);
      setShowModal(true);
    }

    // setEditTodo(todo);
    // setEditIndex(index);
    // setStatus(status);
    // setShowModal(true);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // dragging isnide todo
      if (source.droppableId === "todoList") {
        const reorderedTodos = [...todos];
        const [movedTodo] = reorderedTodos.splice(source.index, 1);
        reorderedTodos.splice(destination.index, 0, movedTodo);
        setTodos(reorderedTodos);

        // dragging inside completed task
      } else if (source.droppableId === "doneList") {
        const reorderedDone = [...done];
        const [movedDone] = reorderedDone.splice(source.index, 1);
        reorderedDone.splice(destination.index, 0, movedDone);
        setDone(reorderedDone);
      }
    }
    //dragging between todo and completed
    else {
      //dragging from todo to completed
      if (
        source.droppableId === "todoList" &&
        destination.droppableId === "doneList"
      ) {
        const updatedTodos = [...todos];
        const [movedTodo] = updatedTodos.splice(source.index, 1);
        const updatedDone = [...done];
        updatedDone.splice(destination.index, 0, movedTodo);
        setTodos(updatedTodos);
        setDone(updatedDone);
        toast.success("Todo moved to completed");
      }

      //dragging from completed to done
      else if (
        source.droppableId === "doneList" &&
        destination.droppableId === "todoList"
      ) {
        const updatedDone = [...done];
        const [movedDone] = updatedDone.splice(source.index, 1);
        const updatedTodos = [...todos];
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
              handleAddTodo={handleAddAndUpdateTodo}
              handleDeleteTodo={handleDeleteTodo}
              handleEditTodo={handleEditTodo}
              setShowModal={setShowModal}
              setEditTodo={setEditTodo}
              setEditIndex={setEditIndex}
              setStatus={setStatus}
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
            setStatus(null);
          }}
          onSubmit={handleAddAndUpdateTodo}
          editTodo={editTodo}
          editIndex={editIndex}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default MainPage;
