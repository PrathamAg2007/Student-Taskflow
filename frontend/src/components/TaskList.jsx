import TaskItem from "./TaskItem"

export default function TaskList({groups, onDelete, onToggleComplete, onEdit}){
    return(
        <div className="flex flex-col gap-3">
            {groups.map(group => {
                return(
                    <div key={group.dateKey}>
                        <h2 className="font-semibold text-lg mb-2">{group.label}</h2>
                        <div className="flex flex-col">
                            {group.tasks.map(task=>(
                                <TaskItem key={task._id} task={task} onDelete={onDelete} onToggleComplete={onToggleComplete} onEdit={onEdit} />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}