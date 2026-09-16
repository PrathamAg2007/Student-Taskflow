export default function TaskItem({task, onDelete, onToggleComplete, onEdit}){
    return(
        <div className="flex items-center justify-between gap-4 border rounded-md p-3 mb-2">
            <div className="flex items-center gap-3">
                <input type="checkbox" checked={task.completed} onChange={()=>onToggleComplete(task._id, !task.completed)} />
                <p className="font-medium">
                    {task.title}
                    <span className="text-sm" >({task.priority})</span>
                </p>
                <p>{task.description}</p>
                <div className="flex gap-2">
                    <button onClick={()=>onEdit(task)} className="border rounded px-3 py-1">Edit</button>
                    <button onClick={()=>onDelete(task._id)} className="border rounded px-3 py-1" >Delete</button>
                </div>
            </div>
        </div>
    )
}