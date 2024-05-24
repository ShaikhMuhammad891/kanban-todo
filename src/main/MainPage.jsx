import React from "react";
import Todo from "./Todo";
import Done from "./Done";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

const MainPage = () => {
  return (
    <>
      <div className=" max-w-[1440px] mx-auto">
        <p className=" text-[#ffffff] text-center text-[72px] font-inter font-semibold mt-10 leading-[1]">
          Todo Kanban
        </p>
        <div className=" mt-12 grid grid-cols-2 gap-5 w-full  justify-items-center">
          <Todo />
          <Done />
        </div>
      </div>
    </>
  );
};

export default MainPage;
