import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
const ShowTask = () => {
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(false)
    const {id} = useParams();
  return (
    <div>
      {id}
    </div>
  )
}

export default ShowTask
