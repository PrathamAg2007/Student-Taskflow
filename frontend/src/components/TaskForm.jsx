import { useState, useEffect } from 'react'

export default function TaskForm({ onSubmit, editingTask }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('medium')
    const [dueDate, setDueDate] = useState('')

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title)
            setDescription(editingTask.description || '')
            setPriority(editingTask.priority)
            setDueDate(editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : '')
        }
    }, [editingTask])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ title, description, priority, dueDate })
        setTitle('')
        setDescription('')
        setPriority('medium')
        setDueDate('')
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-[#E5E1D8] rounded-xl p-5 mb-6 shadow-xs flex flex-col gap-3.5">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm text-[#1F2937] placeholder-[#9CA3AF] bg-[#FAF7F2]/40 border border-[#E5E1D8] rounded-lg focus:outline-none focus:border-[#B5541E] focus:bg-white focus:ring-1 focus:ring-[#B5541E]/20 transition-colors duration-150"
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2 text-sm text-[#1F2937] placeholder-[#9CA3AF] bg-[#FAF7F2]/40 border border-[#E5E1D8] rounded-lg focus:outline-none focus:border-[#B5541E] focus:bg-white focus:ring-1 focus:ring-[#B5541E]/20 transition-colors duration-150 h-20 resize-y"
            />
            <div className="flex flex-col sm:flex-row gap-2.5">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full sm:w-1/2 px-3 py-2 text-sm text-[#1F2937] bg-[#FAF7F2]/40 border border-[#E5E1D8] rounded-lg focus:outline-none focus:border-[#B5541E] focus:bg-white focus:ring-1 focus:ring-[#B5541E]/20 transition-colors duration-150 cursor-pointer"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full sm:w-1/2 px-3 py-2 text-sm text-[#1F2937] bg-[#FAF7F2]/40 border border-[#E5E1D8] rounded-lg focus:outline-none focus:border-[#B5541E] focus:bg-white focus:ring-1 focus:ring-[#B5541E]/20 transition-colors duration-150 cursor-pointer"
                />
            </div>
            <button
                type="submit"
                className="w-full sm:w-auto sm:self-end px-4 py-2 text-sm font-medium text-white bg-[#1F2937] hover:bg-[#B5541E] active:bg-[#B5541E] rounded-lg shadow-xs transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#B5541E]/30"
            >
                {editingTask ? 'Update task' : 'Add Task'}
            </button>
        </form>
    )
}