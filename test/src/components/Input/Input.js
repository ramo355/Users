import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  const inputType = props.type || "text";
  const htmlFor = `${inputType}-${Math.random()}`;
  return (
    <div ref={props.ref} className={classes.Input}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        required={props.require}
        name={props.name}
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
