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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border rounded-md p-4 mb-4">
            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className='border rounded px-2 py-1'
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded px-2 py-1"
            />
            <div className='flex gap-2'>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border rounded px-2 py-1"
                />
            </div>
            <button type="submit" className="border rounded px-3 py-1">{editingTask? 'Update task' : 'Add Task'}</button>
        </form>
    )
}