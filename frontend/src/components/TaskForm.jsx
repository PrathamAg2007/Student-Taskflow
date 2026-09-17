import { useState } from 'react'

export default function TaskForm({ onSubmit, editingTask }) {
    const [title, setTitle] = useState(editingTask?.title || '')
    const [description, setDescription] = useState(editingTask?.description || '')
    const [priority, setPriority] = useState(editingTask?.priority || 'medium')
    const [dueDate, setDueDate] = useState(editingTask?.dueDate ? editingTask.dueDate.slice(0, 10) : '')
    const [prevTask, setPrevTask] = useState(editingTask)

    if (editingTask !== prevTask) {
        setPrevTask(editingTask)
        setTitle(editingTask ? editingTask.title : '')
        setDescription(editingTask ? (editingTask.description || '') : '')
        setPriority(editingTask ? editingTask.priority : 'medium')
        setDueDate(editingTask && editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : '')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ title, description, priority, dueDate })
        setTitle('')
        setDescription('')
        setPriority('medium')
        setDueDate('')
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#18181B] border border-[#E2E2E0] dark:border-[#2A2A2D] rounded-lg p-4 sm:p-5 mb-6 shadow-xs flex flex-col gap-3.5 transition-colors duration-150">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm text-[#111113] dark:text-[#F2F0EB] placeholder-[#8E8E93] dark:placeholder-[#71717A] bg-[#F7F7F5] dark:bg-[#0B0B0C] border border-[#E2E2E0] dark:border-[#2A2A2D] rounded-md focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30]/20 transition-colors duration-150"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-[#111113] dark:text-[#F2F0EB] placeholder-[#8E8E93] dark:placeholder-[#71717A] bg-[#F7F7F5] dark:bg-[#0B0B0C] border border-[#E2E2E0] dark:border-[#2A2A2D] rounded-md focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30]/20 transition-colors duration-150 h-20 resize-y"
            />
            <div className="flex flex-col sm:flex-row gap-2.5">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full sm:w-1/2 px-3.5 py-2.5 text-sm text-[#111113] dark:text-[#F2F0EB] bg-[#F7F7F5] dark:bg-[#0B0B0C] border border-[#E2E2E0] dark:border-[#2A2A2D] rounded-md focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30]/20 transition-colors duration-150 cursor-pointer"
                >
                    <option value="low" className="dark:bg-[#18181B] dark:text-[#F2F0EB]">Low</option>
                    <option value="medium" className="dark:bg-[#18181B] dark:text-[#F2F0EB]">Medium</option>
                    <option value="high" className="dark:bg-[#18181B] dark:text-[#F2F0EB]">High</option>
                </select>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full sm:w-1/2 px-3.5 py-2.5 text-sm text-[#111113] dark:text-[#F2F0EB] bg-[#F7F7F5] dark:bg-[#0B0B0C] border border-[#E2E2E0] dark:border-[#2A2A2D] rounded-md focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30]/20 transition-colors duration-150 cursor-pointer"
                />
            </div>
            <button
                type="submit"
                className="w-full sm:w-auto sm:self-end px-5 py-2 text-sm font-semibold text-white bg-[#FF3B30] hover:bg-[#E03227] active:bg-[#C92920] rounded-md shadow-xs transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/40 active:translate-y-px"
            >
                {editingTask ? 'Update task' : 'Add Task'}
            </button>
        </form>
    )
}