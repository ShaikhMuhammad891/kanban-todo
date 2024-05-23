import React from "react";
import { HiDocumentCheck } from "react-icons/hi2";
import { useDroppable } from "@dnd-kit/core";

const Done = () => {
  const { setNodeRef } = useDroppable({
    id: 856,
  });
  return (
    <>
      <div className=" max-w-[560px] w-full bg-[#d5ccff] pb-4 pt-3  px-3 rounded-xl self-start">
        <div className=" flex gap-5">
          <HiDocumentCheck className=" text-indigo-800 w-[40px] h-[40px]" />

          <div className=" text-indigo-800 text-3xl font-bold">Done</div>
        </div>
        <div className=" w-full h-[80vh] bg-green-400" ref={setNodeRef}></div>
      </div>
    </>
  );
};

export default Done;
