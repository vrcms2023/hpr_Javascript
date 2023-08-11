import React from "react";

const Button = ({ type, cssClass, label, handlerChange }) => {
  return (
    <button
      type={type}
      className={`${cssClass}`}
      onClick={() => handlerChange(label)}
    >
      {" "}
      {label}{" "}
    </button>
  );
};

export default Button;
