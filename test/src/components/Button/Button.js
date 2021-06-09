import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={classes.Button}
    >
      {props.title}
    </button>
  );
};

export default Button;
