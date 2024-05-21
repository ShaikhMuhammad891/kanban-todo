import React from "react";
import { IoClipboardOutline } from "react-icons/io5";
import Button from "../components/Button";

const Todo = () => {
  return (
    <>
      <div className=" max-w-[560px] w-full bg-[#d5ccff] pb-4 pt-3  px-3 rounded-xl">
        <div className=" flex justify-between">
          <div className=" flex gap-4">
            <IoClipboardOutline color= "#2B1887" className=" w-[40px] h-[40px]"/>

            <p className=" text-primary-color text-3xl font-bold">To-Do</p>
          </div>
          <div>
            <Button />
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
