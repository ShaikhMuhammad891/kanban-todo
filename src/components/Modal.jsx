import React, { useState, useEffect } from "react";

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
};

const Modal = ({ show, onClose, onSubmit, todo, index }) => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (todo) {
      setData(todo);
    }
  }, [todo]);

  if (!show) {
    return null;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data, index);
    setData({
      title: "",
      description: "",
    });
    onClose();
  };

  return (
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div className="max-w-[600px] py-8 px-5 rounded-xl w-full bg-white fixed mt-14 z-[1000]">
        <h2 className="text-center text-3xl font-semibold text-indigo-900">
          {index !== null ? "Edit Todo" : "Add Todo"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            required
            id="title"
            value={data.title}
            onChange={handleChange}
            className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
            placeholder="Apply For Fullstack Job"
          />
          <textarea
            required
            id="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Write a proposal for job application"
            className="mb-5 mt-2 text-gray-600 focus:outline-none py-2 min-h-[200px] focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
          />
          <button
            type="submit"
            className="focus:outline-none transition duration-150 ease-in-out bg-indigo-700 hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Modal;
