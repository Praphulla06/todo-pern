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
        console.error(err);
        setLoading(false);
      });
  }, []);

  const completeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteTask/${id}`);
      // Optimally, you would want to filter out the completed task from the tasks state
      // rather than reloading the page. This makes the UI faster and smoother.
      setTasks(tasks.filter(task => task.task_id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.task_id}
            className="flex justify-between items-center w-full max-w-4xl bg-white shadow-md m-2 p-4 rounded-lg"
          >
            <span className="flex-1 text-sm md:text-lg border-r-2 border-slate-200 pr-4">
              {task.task_name}
            </span>
            <div className="flex-1 flex justify-between items-center pl-4">
              <p className="text-xs md:text-sm lg:text-base">{task.task_description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => completeTask(task.task_id)}
                  className="text-green-500 hover:text-green-700"
                >
                  <CheckFat size={24} />
                </button>
                <Link to={`/task/${task.task_id}`} className="text-blue-500 hover:text-blue-700">
                  <Info size={24} />
                </Link>
                <Link to={`/editTask/${task.task_id}`} className="text-yellow-500 hover:text-yellow-700">
                  <Pen size={24} />
                </Link>
                <Link to={`/deleteTask/${task.task_id}`} className="text-red-500 hover:text-red-700">
                  <Trash size={24} />
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-20 text-lg">No tasks found</div>
      )}
    </div>
  );
};

export default Home;
