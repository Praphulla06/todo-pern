import React from 'react'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import DeleteTask from './pages/DeleteTask'
import ShowTask from './pages/ShowTask'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/createTask' element={<CreateTask/>}/>
        <Route path='/editTask/:id' element={<EditTask/>} />
        <Route path='/deleteTask/:id' element={<DeleteTask/>} />
        <Route path='/task/:id' element={<ShowTask/>} />
        <Route path='*' element={<PageNotFound/>} />

      </Routes>
    </div>
  )
}

export default App
