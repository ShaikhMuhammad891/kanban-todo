import React from "react";
import { HiDocumentCheck } from "react-icons/hi2";

const Done = () => {
  return (
    <>
      <div className=" max-w-[560px] w-full bg-[#d5ccff] pb-4 pt-3  px-3 rounded-xl">
        <div className=" flex gap-5">
          <HiDocumentCheck className=" text-primary-color w-[40px] h-[40px]" />

          <div className=" text-primary-color text-3xl font-bold">Done</div>
        </div>
      </div>
    </>
  );
};

export default Done;
