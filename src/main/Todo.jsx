// import React, { useState, useEffect } from "react";
// import { IoClipboardOutline } from "react-icons/io5";
// import Button from "../components/Button";
// import Modal from "../components/Modal";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const Todo = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [todos, setTodos] = useState([]);

//   // set to localStorage
//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   // get from localStorage
//   useEffect(() => {
//     const storedTodos = localStorage.getItem("todos");
//     if (storedTodos) {
//       setTodos(JSON.parse(storedTodos));
//     }
//   }, []);
//   const handleAddTodo = (todo) => {
//     setTodos((prevTodos) => [...prevTodos, todo]);
//   };

//   return (
//     <>
//       <div className="max-w-[560px] w-full bg-[#d5ccff] pb-8 pt-6 px-6 rounded-xl self-start">
//         <div className="flex justify-between">
//           <div className="flex gap-4">
//             <IoClipboardOutline color="#2B1887" className="w-[40px] h-[40px]" />
//             <p className="text-indigo-800 text-3xl font-bold">To-Do</p>
//           </div>
//           <div>
//             <Button onClick={() => setShowModal(true)} />
//           </div>
//         </div>
//         <div className="">
//           {todos.length === 0
//             ? "No Todos here"
//             : todos.map((todo, index) => (
//                 <div key={index} className="mt-4 bg-white rounded-xl p-5">
//                   <div className=" flex justify-between items-center">
//                     <h3 className=" text-2xl font-bold text-black">
//                       {todo.title}
//                     </h3>
//                     <button>
//                       <RiDeleteBin6Line
//                         color="red"
//                         className="w-[25px] h-[25px]"
//                       />
//                     </button>
//                   </div>
//                   <p>{todo.description}</p>

//                   <div className=" flex justify-between items-center mt-4">
//                     <p className="text-sm text-gray-500">Due Date</p>
//                     <p className=" text-2xl text-indigo-800">{index + 1}</p>
//                   </div>
//                 </div>
//               ))}
//         </div>
//       </div>
//       <Modal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         onSubmit={handleAddTodo}
//       />
//     </>
//   );
// };

// export default Todo;

import React, { useState, useEffect } from "react";
import { IoClipboardOutline } from "react-icons/io5";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";

const Todo = () => {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);

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

  const handleAddTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
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
            <Button onClick={() => setShowModal(true)} />
          </div>
        </div>
        <div className="">
          {todos.length === 0
            ? "No Todos here"
            : todos.map((todo, index) => (
                <div key={index} className="mt-4 bg-white rounded-xl p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-black">
                      {todo.title}
                    </h3>
                    <button onClick={() => handleDeleteTodo(index)}>
                      <RiDeleteBin6Line
                        color="red"
                        className="w-[25px] h-[25px]"
                      />
                    </button>
                  </div>
                  <p>{todo.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p className="text-2xl text-indigo-800">{index + 1}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTodo}
      />
    </>
  );
};

export default Todo;
