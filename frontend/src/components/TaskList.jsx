import TaskItem from "./TaskItem"

export default function TaskList({tasks, onDelete, onToggleComplete, onEdit}){
    return(
        <div className="flex flex-col">
            {tasks.map(task => {
                return(
                    <TaskItem key={task._id} task={task} onDelete={onDelete} onToggleComplete={onToggleComplete} onEdit={onEdit} />
                )
            })}
        </div>
    )
}