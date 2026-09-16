import { useState, useEffect } from "react";
import { deleteTask, getTasks, updateTask, createTask } from "./api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App(){
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)

  useEffect(()=>{
    const fetchTasks = async() => {
      const data = await getTasks()
      setTasks(data.tasks)
    }
    fetchTasks()
  }, [])

  const handleDelete = async (id) => {
    await deleteTask(id)
    setTasks(tasks.filter(task => task._id !== id))
  }

  const handleToggleComplete = async (id, status) => {
    const data = await updateTask(id, {completed: status})
    setTasks(tasks.map(task => task._id === id ? data.task : task))
  }

  const handleCreate = async (taskData) => {
    const data = await createTask(taskData)
    setTasks([...tasks, data.task])
  }

  const handleFormSubmit = async (taskData) => {
    if(editingTask){
      const data = await updateTask(editingTask._id, taskData)
      setTasks(tasks.map(task=>task._id === editingTask._id ? data.task : task))
      setEditingTask(null)
    } else {
      await handleCreate(taskData)
    }
  }

  const handleEditClick = (task) => {
    setEditingTask(task)
  }

  return(
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">TaskFlow</h1>
      <TaskForm onSubmit={handleFormSubmit} editingTask={editingTask} />
      <TaskList tasks={tasks} onDelete={handleDelete} onToggleComplete={handleToggleComplete} onEdit={handleEditClick} />
    </div>
  )
}

export default App