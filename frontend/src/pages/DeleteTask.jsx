import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, XCircle } from "@phosphor-icons/react";
import axios from "axios";

const DeleteTask = () => {
  const [task, setTask] = useState({ task_name: "", task_description: "" });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  const deleteTask = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/deleteTask/${id}`);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h3 className="text-xl font-semibold mb-4">Delete Task</h3>
        <p className="mb-2"><strong>Task:</strong> {task.task_name}</p>
        <p className="mb-4"><strong>Description:</strong> {task.task_description}</p>
        <div className="flex justify-between items-center">
          <span>Are you sure you want to delete this task?</span>
          <div className="flex gap-4">
            <button
              onClick={deleteTask}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
            >
              <Check size={20} /> Yes, Delete
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
            >
              <XCircle size={20} /> No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
