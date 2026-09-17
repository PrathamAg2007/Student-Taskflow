import { useState, useEffect } from "react";
import { deleteTask, getTasks, updateTask, createTask } from "./api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App(){
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-[#1F2937] dark:text-[#F5F5F4]">
          TaskFlow
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#E5E1D8] dark:border-[#3D3835] bg-white dark:bg-[#292524] text-[#1F2937] dark:text-[#E7E5E4] hover:bg-[#FAF7F2] dark:hover:bg-[#322E2B] transition-colors duration-150 ease-out cursor-pointer shadow-2xs"
          title="Toggle dark mode"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <>
              <svg className="w-3.5 h-3.5 text-[#C99A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <span>Light</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-[#78716C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <span>Dark</span>
            </>
          )}
        </button>
      </div>
      <TaskForm onSubmit={handleFormSubmit} editingTask={editingTask} />
      <div className="flex items-center gap-1.5 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 text-xs sm:text-sm rounded-lg transition-colors duration-150 ease-out cursor-pointer ${
            filter === 'all'
              ? 'bg-[#B5541E] text-white border border-[#B5541E] font-medium shadow-2xs'
              : 'bg-white dark:bg-[#292524] text-[#9CA3AF] dark:text-[#A8A29E] hover:text-[#1F2937] dark:hover:text-[#F5F5F4] hover:border-[#9CA3AF]/60 dark:hover:border-[#524B47] border border-[#E5E1D8] dark:border-[#3D3835]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-3.5 py-1.5 text-xs sm:text-sm rounded-lg transition-colors duration-150 ease-out cursor-pointer ${
            filter === 'pending'
              ? 'bg-[#B5541E] text-white border border-[#B5541E] font-medium shadow-2xs'
              : 'bg-white dark:bg-[#292524] text-[#9CA3AF] dark:text-[#A8A29E] hover:text-[#1F2937] dark:hover:text-[#F5F5F4] hover:border-[#9CA3AF]/60 dark:hover:border-[#524B47] border border-[#E5E1D8] dark:border-[#3D3835]'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3.5 py-1.5 text-xs sm:text-sm rounded-lg transition-colors duration-150 ease-out cursor-pointer ${
            filter === 'completed'
              ? 'bg-[#B5541E] text-white border border-[#B5541E] font-medium shadow-2xs'
              : 'bg-white dark:bg-[#292524] text-[#9CA3AF] dark:text-[#A8A29E] hover:text-[#1F2937] dark:hover:text-[#F5F5F4] hover:border-[#9CA3AF]/60 dark:hover:border-[#524B47] border border-[#E5E1D8] dark:border-[#3D3835]'
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