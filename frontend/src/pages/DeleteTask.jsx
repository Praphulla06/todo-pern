import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check } from "@phosphor-icons/react";
import axios from "axios";
const DeleteTask = () => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const taskToEdit = await axios.get(`http://localhost:5000/task/${id}`);
        setTask(taskToEdit.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const deleteTask = async () => {
    setLoading(true);
    try {
      const deletedTask = await axios.delete(
        `http://localhost:5000/deleteTask/${id}`
      );
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
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
            <span className="mx-4">
              Are You Sure You Want To Delete This Task?{" "}
            </span>
            <Check size={28} className="cursor-pointer" onClick={deleteTask} />
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default DeleteTask;
