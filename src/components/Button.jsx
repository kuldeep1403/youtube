import React from "react";

const Button = ({ name }) => {
  return (
    <button className="mx-2 mb-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition">
      {name}
    </button>
  );
};

export default Button;
