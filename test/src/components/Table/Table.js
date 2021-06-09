import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import Loader from '../Loader/Loader';
import axios from "axios";

const Table = () => {
  const [employees, setEmployees] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:4000/api/employee");
      setEmployees(response.data);
    };
    fetch();
  }, [employees]);

  const deleteWorkers = async (id) => {
    await axios.delete(
      `http://localhost:4000/api/employee/${id}`
    );
  };

  const renderWorkers = () => {
    return employees.map((item, index) => {
      return (
        <tr key={item._id}>
          <td style={{ display: "flex", justifyContent: "space-between" }}>
            {item.name} {item.lastName}
            <button onClick={() => deleteWorkers(item._id)}>
              Удалить сотрудника
            </button>
          </td>
          <td>{item.position}</td>
          <td>{item.number}</td>
        </tr>
      );
    });
  };

  return (
    <>
      {employees ? (
        <table className={classes.Table} border="1">
          <tr>
            <th>Имя, Фамилия</th>
            <th>Должность</th>
            <th>Номер телефона</th>
          </tr>
          {renderWorkers()}
        </table>
      ) : <Loader />}
    </>
  );
};

export default Table;
