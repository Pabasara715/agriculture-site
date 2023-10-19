import React, { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

function Dropdownqty({ setSelectedqty }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="relative flex flex-col  w-30 h-2 rounded-lg p-5 ">
      <div className="p-2 flex justify-start ">Select the Quantity (Max 5)</div>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`p-2 w-full text-lg rounded-lg tracking-wide border border-transparent active:border-white duration-300
             ${
               isOpen
                 ? "bg-green-400 border-l-white text-green-700"
                 : "bg-green-400 text-white"
             } `}
      >
        <div className="grid grid-cols-2 place-self-center">
          <div className="place-self-center pr-2">
            {selectedValue || "Quantity"}
          </div>

          <div className="place-self-center">
            {!isOpen ? (
              <AiOutlineCaretDown className="h-8" />
            ) : (
              <AiOutlineCaretUp className="h-8" />
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-green-200 relative    top-0 flex flex-col items-center rounded-lg p-2 w-full"
        >
          {[1, 2, 3, 4, 5].map((item, i) => (
            <div
              className="flex w-full justify-between hover:bg-green-100 cursor-pointer rounded-lg border-l-transparent p-4 hover:border-l-white items-center"
              key={i}
              onClick={() => {
                setSelectedValue(item);
                setSelectedqty(item);
              }}
            >
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdownqty;
