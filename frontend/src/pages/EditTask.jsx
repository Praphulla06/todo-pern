import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const EditTask = () => {
  const [task, setTask] = useState({task_name: "", task_description: ""});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate()
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
  const changeTask = async () => {
    setLoading(true)
    try {
      const newTask = await axios.put(`http://localhost:5000/editTask/${id}`, task)
      setTask(newTask.data)
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
          onChange={(e) => setTask({ ...task, task_name: e.target.value })}
        />
        <input
          type="text"
          name="task_description"
          id=""
          placeholder="Task Description: "
          className="border-2 border-black m-2 p-2 rounded"
          value={task.task_description}
          onChange={(e) => setTask({ ...task, task_description: e.target.value })}
        />
        <button
          type="button"
          className="border-2 border-black m-2 p-1 rounded transition-all ease-linear hover:scale-[1.02]"
          onClick={changeTask}
        >
          Edit Task
        </button>
      </div>
    </div>
  );
};

export default EditTask;
