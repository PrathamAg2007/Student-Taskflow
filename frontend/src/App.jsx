import { useState, useEffect } from "react";
import { deleteTask, getTasks, updateTask, createTask } from "./api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App(){
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter] = useState('all')

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

  const filteredTasks = tasks.filter(task => {
    if(filter === 'pending') return !task.completed
    if(filter === 'completed') return task.completed
    return true
  })

  return(
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">TaskFlow</h1>
      <TaskForm onSubmit={handleFormSubmit} editingTask={editingTask} />
      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter('all')} className="border rounded px-3 py-1">All</button>
        <button onClick={() => setFilter('pending')} className="border rounded px-3 py-1">Pending</button>
        <button onClick={() => setFilter('completed')} className="border rounded px-3 py-1">Completed</button>
      </div>
      <TaskList tasks={filteredTasks} onDelete={handleDelete} onToggleComplete={handleToggleComplete} onEdit={handleEditClick} />
    </div>
  )
}

export default App