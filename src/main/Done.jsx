import React, { useEffect, useState } from "react";
import { HiDocumentCheck } from "react-icons/hi2";
import DroppableTodo from "./DroppableTodo";

const Done = () => {
  return (
    <>
      <div className=" max-w-[560px] w-full bg-[#d5ccff] pb-4 pt-3  px-3 rounded-xl self-start">
        <div className=" flex gap-5">
          <HiDocumentCheck className=" text-indigo-800 w-[40px] h-[40px]" />

          <div className=" text-indigo-800 text-3xl font-bold">Done</div>
        </div>

        <DroppableTodo />
      </div>
    </>
  );
};

export default Done;
