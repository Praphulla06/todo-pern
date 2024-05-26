import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        const { data } = await axios.get(`http://localhost:5000/task/${id}`);
        setTask(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="flex flex-col items-center mt-8">
      <div className="bg-white shadow-lg rounded-lg p-5 w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-2">{task.task_name}</h2>
        <p className="text-gray-700 mb-4">{task.task_description}</p>
        <div className="flex gap-4 justify-end">
          <Link to={`/editTask/${task.task_id}`} className="text-blue-500 hover:text-blue-600">
            <Pen size={32} />
          </Link>
          <Link to={`/deleteTask/${task.task_id}`} className="text-red-500 hover:text-red-600">
            <Trash size={32} />
          </Link>
        
          <button onClick={() => {}} className="text-green-500 hover:text-green-600">
            <CheckFat size={32} />
          </button>
          <Link to={`/task/${task.task_id}`} className="text-gray-500 hover:text-gray-600">
            <Info size={32} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowTask;
