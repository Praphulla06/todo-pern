import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pen, Trash, Info, CheckFat } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const ShowTask = () => {
  const [task, setTask] = useState({task_name: "", task_description: ""});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
    try {
        const taskToEdit = await axios.get(`http://localhost:5000/task/${id}`);
        setTask(taskToEdit.data);
        setLoading(false);
      } catch (error) {
        console.logE(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData()
  }, [id]);
  
  return (
    <div>
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
    </div>
  );
};

export default ShowTask;
