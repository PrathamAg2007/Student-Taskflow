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
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#292524] border border-[#E5E1D8] dark:border-[#3D3835] rounded-xl p-4 sm:p-5 mb-6 shadow-xs flex flex-col gap-3.5 transition-colors duration-150">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm text-[#1F2937] dark:text-[#F5F5F4] placeholder-[#9CA3AF] dark:placeholder-[#78716C] bg-[#FAF7F2]/50 dark:bg-[#1C1917]/50 border border-[#E5E1D8] dark:border-[#3D3835] rounded-lg focus:outline-none focus:border-[#B5541E] focus:bg-white dark:focus:bg-[#1C1917] focus:ring-1 focus:ring-[#B5541E]/20 transition-colors duration-150"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm text-[#1F2937] dark:text-[#F5F5F4] placeholder-[#9CA3AF] dark:placeholder-[#78716C] bg-[#FAF7F2]/50 dark:bg-[#1C1917]/50 border border-[#E5E1D8] dark:border-[#3D3835] rounded-lg focus:outline-none focus:border-[#B5541E] focus:bg-white dark:focus:bg-[#1C1917] focus:ring-1 focus:ring-[#B5541E]/20 transition-colors duration-150 h-20 resize-y"
            />
            <div className="flex flex-col sm:flex-row gap-2.5">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full sm:w-1/2 px-3.5 py-2.5 text-sm text-[#1F2937] dark:text-[#F5F5F4] bg-[#FAF7F2]/50 dark:bg-[#1C1917]/50 border border-[#E5E1D8] dark:border-[#3D3835] rounded-lg focus:outline-none focus:border-[#B5541E] focus:bg-white dark:focus:bg-[#1C1917] focus:ring-1 focus:ring-[#B5541E]/20 transition-colors duration-150 cursor-pointer"
                >
                    <option value="low" className="dark:bg-[#292524]">Low</option>
                    <option value="medium" className="dark:bg-[#292524]">Medium</option>
                    <option value="high" className="dark:bg-[#292524]">High</option>
                </select>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full sm:w-1/2 px-3.5 py-2.5 text-sm text-[#1F2937] dark:text-[#F5F5F4] bg-[#FAF7F2]/50 dark:bg-[#1C1917]/50 border border-[#E5E1D8] dark:border-[#3D3835] rounded-lg focus:outline-none focus:border-[#B5541E] focus:bg-white dark:focus:bg-[#1C1917] focus:ring-1 focus:ring-[#B5541E]/20 transition-colors duration-150 cursor-pointer"
                />
            </div>
            <button
                type="submit"
                className="w-full sm:w-auto sm:self-end px-5 py-2 text-sm font-medium text-white bg-[#1F2937] dark:bg-[#E7E5E4] dark:text-[#1C1917] hover:bg-[#B5541E] dark:hover:bg-[#B5541E] dark:hover:text-white active:bg-[#B5541E] rounded-lg shadow-xs transition-all duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B5541E]/30 active:translate-y-px"
            >
                {editingTask ? 'Update task' : 'Add Task'}
            </button>
        </form>
    )
}