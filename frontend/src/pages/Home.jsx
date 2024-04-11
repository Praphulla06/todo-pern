import React, { useEffect, useState } from "react";
import axios from "axios";
import {Pen, Trash, Info} from '@phosphor-icons/react'
import { Link } from "react-router-dom";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => {
        setTasks(res.data);
        setLoading(false); // Set loading to false once data fetching is complete
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Make sure to set loading to false in case of error too
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.task_id}
            className=" flex justify-around w-[100vw] m-2 p-2 "
          >
            {" "}
            <span className="w-[20vw] border-2 border-slate-600 m-1 p-2 rounded">
              {task.task_name}
            </span>{" "}
            <div className="w-[80vw] border-2 border-slate-600 m-1 p-2 rounded flex justify-between">
              {task.task_description}
              <div className="flex mx-8">
              <Link to={`/editTask/${task.task_id}`} ><Pen size={32}/></Link>
              <Link to={`/deleteTask/${task.task_id}`} ><Trash size={32}/></Link>
              <Link to={`/task/${task.task_id}`} ><Info size={32}/></Link>
              </div>
            </div>{" "}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
