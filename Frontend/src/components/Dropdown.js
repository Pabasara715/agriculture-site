import React, { useEffect, useState } from "react";
import axios from "axios";

import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

function Dropdown({ setSelectedValue_D }) {
  const [isOpen, setIsOpen] = useState(false);
  const [listofvegetable, setlistofvegetable] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/vegetabledata").then((response) => {
      setlistofvegetable(response.data);
    });
  }, []);

  return (
    <div className="relative flex flex-col  w-30 h-2 rounded-lg p-5 ">
      <div className="p-2 flex justify-start ">Select the vegetable</div>

      <button
        className={`${
          isOpen
            ? "bg-green-400 border-l-white"
            : "bg-green-400 border-transparent"
        } p-2 w-full content-evenly flex justify-evenly items-center text-lg rounded-lg tracking-wide border text-white duration-300 active:border-white active:text-white`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="grid grid-cols-2 place-self-center">
          <div className="place-self-center">
            {selectedValue || "Vegetable"}
          </div>
          <div className="place-self-center">
            {isOpen ? (
              <AiOutlineCaretUp className="h-8" />
            ) : (
              <AiOutlineCaretDown className="h-8" />
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-green-200 relative    top-0 flex flex-col items-center rounded-lg p-2 w-full"
        >
          {listofvegetable.map((item, i) => (
            <div
              className={`flex w-full justify-between cursor-pointer rounded-lg p-4 border-l-transparent items-center
                   ${
                     isOpen
                       ? "hover:bg-green-100 hover:border-l-white"
                       : "hover:bg-green-200 hover:border-l-green text-green-700"
                   }`}
              key={i}
              onClick={() => {
                setSelectedValue(item.vegetype);
                setSelectedValue_D(item.vegetype);
              }}
            >
              <h3>{item.vegetype}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
