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

  const groupedTasks = filteredTasks.reduce((groups, task) => {
    const key = task.dueDate ? task.dueDate.slice(0, 10) : 'no-date'
    if (!groups[key]) groups[key] = []
    groups[key].push(task)
    return groups
  }, {})

  const sortedGroups = Object.keys(groupedTasks).sort((a, b) => {
    if (a === 'no-date') return 1
    if (b === 'no-date') return -1
    return a.localeCompare(b)
  }).map(key => ({
    dateKey: key,
    label: key === 'no-date'
      ? 'No due date'
      : new Date(key).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
    tasks: groupedTasks[key]
  }))

  return(
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 sm:px-6">
      <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1F2937] mb-6">TaskFlow</h1>
      <TaskForm onSubmit={handleFormSubmit} editingTask={editingTask} />
      <div className="flex items-center gap-1.5 mb-5">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-colors duration-150 cursor-pointer ${
            filter === 'all'
              ? 'bg-[#B5541E] text-white border border-[#B5541E] font-medium shadow-2xs'
              : 'bg-white text-[#9CA3AF] hover:text-[#1F2937] hover:border-[#9CA3AF]/60 border border-[#E5E1D8]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-colors duration-150 cursor-pointer ${
            filter === 'pending'
              ? 'bg-[#B5541E] text-white border border-[#B5541E] font-medium shadow-2xs'
              : 'bg-white text-[#9CA3AF] hover:text-[#1F2937] hover:border-[#9CA3AF]/60 border border-[#E5E1D8]'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg transition-colors duration-150 cursor-pointer ${
            filter === 'completed'
              ? 'bg-[#B5541E] text-white border border-[#B5541E] font-medium shadow-2xs'
              : 'bg-white text-[#9CA3AF] hover:text-[#1F2937] hover:border-[#9CA3AF]/60 border border-[#E5E1D8]'
          }`}
        >
          Completed
        </button>
      </div>
      <TaskList groups={sortedGroups} onDelete={handleDelete} onToggleComplete={handleToggleComplete} onEdit={handleEditClick} />
    </div>
  )
}

export default App