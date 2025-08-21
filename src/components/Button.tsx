import React from "react";

const Button = ({ text, optional }: { text: string, optional?: boolean }) => {
  return (
    <button className={`bg-white border-2 border-white text-black p-4 rounded-full hover:bg-black hover:border-white hover:border-2 hover:text-white transition-all duration-500 ${optional ? "w-full" : "w-auto"}`}>
      {text}
    </button>
  );
};

export default Button;
