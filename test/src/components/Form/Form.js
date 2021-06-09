import React, { useRef, useState } from "react";
import classes from "./Form.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import axios from "axios";

const Form = () => {
  const ref = useRef();
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState();
  const [array, setArray] = useState({
    name: {
      value: "",
      label: "Имя сотрудника",
      name: "name",
      require: true,
      type: "text",
      valid: false,
    },

    lastName: {
      value: "",
      label: "Фамилия сотрудника",
      name: "last",
      require: true,
      type: "text",
      valid: false,
    },
    post: {
      value: "",
      label: "Должность сотрудника",
      name: "post",
      require: true,
      type: "text",
      valid: false,
    },
    number: {
      value: "",
      label: "Контактный номер сотрудника",
      name: "number",
      require: true,
      type: "number",
      valid: false,
    },
  });

  const handleForm = async (e) => {
    e.preventDefault();
    const data = {
      name: array.name.value,
      lastName: array.lastName.value,
      post: array.post.value,
      number: array.number.value,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/api/employee",
        data
      );
      setError(response.data.message);
    } catch (e) {
      const error = e.response;
      setError(error.data["message"]);
    }
    // eslint-disable-next-line array-callback-return
    Object.keys(array).map((item) => {
      array[item].value = null;
      array[item].touched = false;
      array[item].valid = false;
    });
    for (let a of ref.current) {
      a.value = "";
    }
    setIsFormValid(!isFormValid);
  };

  const onChangeHandler = (event, controlName) => {
    const formControls = { ...array };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.valid = true;
    formControls[controlName] = control;
    let isValid = true;

    Object.keys(formControls).forEach((name) => {
      isValid = formControls[name].valid && isValid;
    });

    setArray(formControls);
    setIsFormValid(isValid);
  };

  const renderInputs = () => {
    return Object.keys(array).map((item, index) => {
      const control = array[item];
      return (
        <Input
          key={index}
          label={control.label}
          name={control.name}
          type={control.type}
          require={control.require}
          onChange={(e) => onChangeHandler(e, item)}
        />
      );
    });
  };
  return (
    <div>
      {error}
      <form ref={ref} onSubmit={(e) => handleForm(e)} className={classes.Form}>
        {renderInputs()}
        <Button disabled={!isFormValid} title="Создать" />
      </form>
    </div>
  );
};

export default Form;
