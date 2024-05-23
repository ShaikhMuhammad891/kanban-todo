import React from "react";

const DraggableItem = ({ todo, index, handleDeleteTodo, handleEditTodo }) => {
  return (
    <>
      <div
        className="mt-4 bg-white rounded-xl p-5 cursor-grab"
        onClick={() => handleEditTodo(todo, index)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-black">{todo.title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTodo(index);
            }}
          >
            <RiDeleteBin6Line color="red" className="w-[25px] h-[25px]" />
          </button>
        </div>
        <p>{todo.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">Due Date</p>
          <p className="text-2xl text-indigo-800">{index + 1}</p>
        </div>
      </div>
    </>
  );
};

export default DraggableItem;

<div>
          {todos.length === 0
            ? "No Todos here"
            : todos.map((todo, index) => (
                <DraggableItem
                  key={index}
                  todo={todo}
                  index={index}
                  handleEditTodo={handleEditTodo}
                  handleDeleteTodo={handleDeleteTodo}
                />
              ))}
        </div>
