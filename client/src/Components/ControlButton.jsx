import React from "react";
import ArrowUp from "../Icon/ArrowUp";

const ControlButton = ({ active, ...rest }) => {
  return (
    <button className={`flex items-center justify-center ${active ? 'bg-indigo-500' : 'bg-gray-700'} hover:bg-gray-600 font-bold py-2 px-4 rounded inline-flex items-center h-24 w-24 m-1`}>
      <ArrowUp className={`stroke-current ${active ? 'text-white' : 'text-gray-500'} h-12 w-12`} {...rest}/>
    </button>
  );
};

export default ControlButton;
