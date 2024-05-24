import React from "react";
import MainPage from "./main/MainPage";
import { DndContext } from "@dnd-kit/core";

const App = () => {
  return (
    <>
      <DndContext>
        <MainPage />
      </DndContext>
    </>
  );
};

export default App;
