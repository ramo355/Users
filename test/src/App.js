import { useState } from "react";
import classes from "./App.module.css";
import Button from "./components/Button/Button";
import Form from "./components/Form/Form";
import Table from "./components/Table/Table";

function App() {
  const [add, setAdd] = useState(false);
  const addEmployee = () => {
    setAdd(true);
  };
  const closeWindow = () => {
    setAdd(false);
  };
  return (
    <div className={classes.App}>
      <h1>Таблица сотрудников компании</h1>
      <Button onClick={addEmployee} title="Добавить сотрудника" />
      {add ? <Button title="Закрыть окно" onClick={closeWindow} /> : null}
      {add ? <Form /> : null}
      <Table />
    </div>
  );
}

export default App;
