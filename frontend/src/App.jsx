import { useState, useEffect } from "react";
import { deleteTask, getTasks, updateTask, createTask } from "./api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Login from "./components/Login";
import Register from "./components/Register";

function App(){
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [filter, setFilter] = useState('all')
  const [darkMode, setDarkMode] = useState(false)
  const [userName, setUserName] = useState(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    return token ? (localStorage.getItem('userName') || 'User') : null
  })
  const [showAuth, setShowAuth] = useState('login')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const fetchInitialTasks = async () => {
        try {
          const data = await getTasks()
          setTasks(data.tasks)
        } catch {
          localStorage.removeItem('token')
          localStorage.removeItem('userName')
          setUserName(null)
        }
      }
      fetchInitialTasks()
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

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

  const fetchUserTasks = async () => {
    try {
      const data = await getTasks()
      setTasks(data.tasks)
    } catch {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      setUserName(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    setUserName(null)
    setTasks([])
    setEditingTask(null)
    setShowAuth('login')
  }

  const filteredTasks = tasks.filter(task => {
    if(filter === 'pending') return !task.completed
    if(filter === 'completed') return task.completed
    return true
  })

  const groupedTasks = filteredTasks.reduce((groups, task) => {
    const key = task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : 'no-date'
    if (!groups[key]) groups[key] = []
    groups[key].push(task)
    return groups
  }, {})

  const priorityWeight = { high: 3, medium: 2, low: 1 }

  const sortedGroups = Object.keys(groupedTasks).sort((a, b) => {
    if (a === 'no-date') return 1
    if (b === 'no-date') return -1
    return a.localeCompare(b)
  }).map(key => ({
    dateKey: key,
    label: key === 'no-date'
      ? 'No due date'
      : new Date(key).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
    tasks: [...groupedTasks[key]].sort((a, b) => {
      const weightA = priorityWeight[a.priority] || 0
      const weightB = priorityWeight[b.priority] || 0
      return weightB - weightA
    })
  }))

  return(
    <div className="max-w-xl mx-auto px-4 py-6 sm:py-10 sm:px-5">
      <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 mb-6 rounded-lg bg-white dark:bg-[#18181B] border border-[#E2E2E0] dark:border-[#2A2A2D] shadow-xs">
        <div className="flex items-center gap-2.5">
          <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#111113] dark:text-[#F2F0EB]">
            TaskFlow
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-md border border-[#E2E2E0] dark:border-[#2A2A2D] bg-[#F7F7F5] dark:bg-[#0B0B0C] text-[#111113] dark:text-[#F2F0EB] hover:border-[#FF3B30]/50 dark:hover:border-[#FF3B30]/50 transition-colors cursor-pointer"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-4 h-4 text-[#FFB020]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-[#71717A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2">
          {userName ? (
            <>
              <span className="text-xs sm:text-sm font-medium text-[#111113] dark:text-[#F2F0EB]">Hi, {userName}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-[#E2E2E0] dark:border-[#2A2A2D] bg-[#F7F7F5] dark:bg-[#0B0B0C] text-[#71717A] dark:text-[#8E8E93] hover:text-[#FF3B30] dark:hover:text-[#FF3B30] hover:border-[#FF3B30]/40 dark:hover:border-[#FF3B30]/40 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setShowAuth('login') }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                  showAuth === 'login'
                    ? 'bg-[#FF3B30] text-white border-[#FF3B30]'
                    : 'bg-[#F7F7F5] dark:bg-[#0B0B0C] text-[#71717A] dark:text-[#8E8E93] border-[#E2E2E0] dark:border-[#2A2A2D] hover:text-[#FF3B30] hover:border-[#FF3B30]/40'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => { setShowAuth('register') }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors cursor-pointer ${
                  showAuth === 'register'
                    ? 'bg-[#FF3B30] text-white border-[#FF3B30]'
                    : 'bg-[#F7F7F5] dark:bg-[#0B0B0C] text-[#71717A] dark:text-[#8E8E93] border-[#E2E2E0] dark:border-[#2A2A2D] hover:text-[#FF3B30] hover:border-[#FF3B30]/40'
                }`}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {!userName && showAuth ? (
        <div>
          {showAuth === 'login' ? (
            <>
              <Login onLogin={(name) => { setUserName(name); setShowAuth(null); fetchUserTasks() }} />
              <p className="text-center text-xs text-[#71717A] dark:text-[#8E8E93] mt-4">
                Don't have an account?{' '}
                <button onClick={() => setShowAuth('register')} className="text-[#FF3B30] hover:underline font-medium cursor-pointer">
                  Register here
                </button>
              </p>
            </>
          ) : (
            <>
              <Register onRegister={(name) => { setUserName(name); setShowAuth(null); fetchUserTasks() }} />
              <p className="text-center text-xs text-[#71717A] dark:text-[#8E8E93] mt-4">
                Already have an account?{' '}
                <button onClick={() => setShowAuth('login')} className="text-[#FF3B30] hover:underline font-medium cursor-pointer">
                  Login here
                </button>
              </p>
            </>
          )}
        </div>
      ) : userName ? (
        <>
          <TaskForm onSubmit={handleFormSubmit} editingTask={editingTask} />
          <div className="flex items-center gap-1.5 mb-6">
            <button onClick={() => setFilter('all')} className={`px-3.5 py-1.5 text-xs sm:text-sm rounded-md transition-colors duration-150 ease-out cursor-pointer ${filter === 'all' ? 'bg-[#FF3B30] text-white border border-[#FF3B30] font-medium shadow-xs' : 'bg-white dark:bg-[#18181B] text-[#71717A] dark:text-[#8E8E93] hover:text-[#111113] dark:hover:text-[#F2F0EB] hover:border-[#8E8E93] dark:hover:border-[#71717A] border border-[#E2E2E0] dark:border-[#2A2A2D]'}`}>All</button>
            <button onClick={() => setFilter('pending')} className={`px-3.5 py-1.5 text-xs sm:text-sm rounded-md transition-colors duration-150 ease-out cursor-pointer ${filter === 'pending' ? 'bg-[#FF3B30] text-white border border-[#FF3B30] font-medium shadow-xs' : 'bg-white dark:bg-[#18181B] text-[#71717A] dark:text-[#8E8E93] hover:text-[#111113] dark:hover:text-[#F2F0EB] hover:border-[#8E8E93] dark:hover:border-[#71717A] border border-[#E2E2E0] dark:border-[#2A2A2D]'}`}>Pending</button>
            <button onClick={() => setFilter('completed')} className={`px-3.5 py-1.5 text-xs sm:text-sm rounded-md transition-colors duration-150 ease-out cursor-pointer ${filter === 'completed' ? 'bg-[#FF3B30] text-white border border-[#FF3B30] font-medium shadow-xs' : 'bg-white dark:bg-[#18181B] text-[#71717A] dark:text-[#8E8E93] hover:text-[#111113] dark:hover:text-[#F2F0EB] hover:border-[#8E8E93] dark:hover:border-[#71717A] border border-[#E2E2E0] dark:border-[#2A2A2D]'}`}>Completed</button>
          </div>
          <TaskList groups={sortedGroups} onDelete={handleDelete} onToggleComplete={handleToggleComplete} onEdit={handleEditClick} />
        </>
      ) : null}
    </div>
  )
}

export default App