import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTask = () => {
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

  const changeTask = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/editTask/${id}`, task);
      navigate('/');
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
    <div className="flex justify-center mt-8">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white shadow-md rounded-lg">
        <input
          type="text"
          name="task_name"
          placeholder="Task Name"
          className="border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 m-2 p-2 rounded"
          value={task.task_name}
          onChange={(e) => setTask({ ...task, task_name: e.target.value })}
        />
        <textarea
          name="task_description"
          rows="4"
          placeholder="Task Description"
          className="border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 m-2 p-2 rounded"
          value={task.task_description}
          onChange={(e) => setTask({ ...task, task_description: e.target.value })}
        ></textarea>
        <button
          type="button"
          className="bg-indigo-500 text-white m-2 p-2 rounded transition-all ease-linear hover:bg-indigo-700"
          onClick={changeTask}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditTask;
