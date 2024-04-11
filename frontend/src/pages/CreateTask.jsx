import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const CreateTask = () => {
    const [loading, setLoading] = useState(false)
    const [task, setTask] = useState({task_name: '', task_description: ''});
    const navigate  = useNavigate();
    const sendTask = async () => {
        setLoading(true);
        try {
           const newTask = await axios.post('http://localhost:5000/createTask', task)
           navigate('/')
           setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
        finally{
            setLoading(false)
        }
    }
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setTask(prevTask => ({
            ...prevTask, [name]: value
        }))
    }
  return (
    <div className="w-[100vw] flex justify-center mt-8">
      <div className="flex flex-col w-[50vw] ">
        <input
          type="text"
          name="task_name"
          id=""
          placeholder="Task Name: "
          className="border-2 border-black m-2 p-2  rounded"
          value={task.task_name}
          onChange={handleInputChange}
          />
        <input
          type="text"
          name="task_description"
          id=""
          placeholder="Task Description: "
          className="border-2 border-black m-2 p-2 rounded"
          value={task.task_description}
          onChange={handleInputChange}
          />
        <button type="button" className="border-2 border-black m-2 p-1 rounded transition-all ease-linear hover:scale-[1.02]" onClick={sendTask}>Create Task</button>
      </div>
    </div>
  );
};

export default CreateTask;
