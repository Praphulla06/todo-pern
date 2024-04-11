import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pen, Trash, Info, CheckFat } from "@phosphor-icons/react";
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const completeTask = async (id) => {
    setLoading(true);
    try {
      const completedTask = await axios.delete(
        `http://localhost:5000/deleteTask/${id}`
      );
      setLoading(false);
      window.location.reload()
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
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
                <CheckFat
                  size={32}
                  className=" cursor-pointer "
                  onClick={() => completeTask(task.task_id)}
                />
                <Link to={`/task/${task.task_id}`}>
                  <Info size={32} />
                </Link>
                <Link to={`/editTask/${task.task_id}`}>
                  <Pen size={32} />
                </Link>
                <Link to={`/deleteTask/${task.task_id}`}>
                  <Trash size={32} />
                </Link>
              </div>
            </div>{" "}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
