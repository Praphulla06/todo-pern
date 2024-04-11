import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({ task_name: '', task_description: '' });
  const navigate = useNavigate();

  const sendTask = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/createTask', task);
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask, [name]: value
    }));
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Creating Task...</div>;
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
          onChange={handleInputChange}
        />
        <textarea
          name="task_description"
          rows="4"
          placeholder="Task Description"
          className="border-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 m-2 p-2 rounded"
          value={task.task_description}
          onChange={handleInputChange}
        ></textarea>
        <button
          type="button"
          className="bg-indigo-500 text-white m-2 p-2 rounded transition-all ease-linear hover:bg-indigo-700"
          onClick={sendTask}
        >
          Create Task
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
