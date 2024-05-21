import React from "react";

const Button = ({onClick}) => {
  return (
    <>
      <div>
        <button onClick={onClick} className="text-[#2B1887] font-bold text-lg bg-[#F4F2FF] rounded-lg p-2 cursor-pointer hover:bg-[#e5e2f5]">
          Add +
        </button>
      </div>
    </>
  );
};

export default Button;
