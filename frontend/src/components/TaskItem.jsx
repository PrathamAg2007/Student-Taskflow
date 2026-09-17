export default function TaskItem({task, onDelete, onToggleComplete, onEdit}){
    return(
        <div className={`group border border-l-[3px] border-[#E2E2E0] dark:border-[#2A2A2D] ${
            task.priority === 'high'
                ? 'border-l-[#FF3B30]'
                : task.priority === 'medium'
                ? 'border-l-[#FFB020]'
                : 'border-l-[#3ED598]'
        } rounded-lg p-4 sm:p-5 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-[#8E8E93]/60 dark:hover:border-[#3E3E42] ${
            task.completed
                ? 'bg-[#F7F7F5]/80 dark:bg-[#121214] border-[#E2E2E0]/60 dark:border-[#2A2A2D]/60 opacity-55 hover:translate-y-0'
                : 'bg-white dark:bg-[#18181B] shadow-xs'
        }`}>
            <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-3.5 gap-y-1.5 items-start">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={()=>onToggleComplete(task._id, !task.completed)}
                    className="custom-checkbox mt-1 shrink-0"
                />
                <p className={`font-heading text-sm sm:text-[15px] font-medium leading-normal break-words transition-colors duration-150 ${task.completed ? 'line-through text-[#8E8E93] dark:text-[#71717A]' : 'text-[#111113] dark:text-[#F2F0EB]'}`}>
                    {task.title}
                    <span className={`inline-flex items-center text-xs font-medium tracking-wide px-2 py-0.5 rounded ml-2 align-middle border no-underline transition-colors duration-150 ${
                        task.priority === 'high'
                            ? 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/30 dark:bg-[#FF3B30]/15 dark:text-[#FF453A] dark:border-[#FF3B30]/40'
                            : task.priority === 'medium'
                            ? 'bg-[#FFB020]/10 text-[#D98E00] border-[#FFB020]/30 dark:bg-[#FFB020]/15 dark:text-[#FFB020] dark:border-[#FFB020]/40'
                            : 'bg-[#3ED598]/10 text-[#1BA870] border-[#3ED598]/30 dark:bg-[#3ED598]/15 dark:text-[#3ED598] dark:border-[#3ED598]/40'
                    }`}>
                        ({task.priority})
                    </span>
                </p>
                <p className="col-start-2 text-xs sm:text-sm text-[#71717A] dark:text-[#8E8E93] leading-relaxed break-words empty:hidden transition-colors duration-150">
                    {task.description}
                </p>
                <div className="col-start-2 sm:col-start-3 sm:row-start-1 sm:row-span-2 sm:self-center flex items-center gap-2 mt-1 sm:mt-0">
                    <button
                        onClick={()=>onEdit(task)}
                        className="px-2.5 py-1 text-xs font-medium text-[#111113] dark:text-[#F2F0EB] hover:text-[#111113] bg-[#F7F7F5] dark:bg-[#0B0B0C] hover:bg-[#EAEAE7] dark:hover:bg-[#18181B] border border-[#E2E2E0] dark:border-[#2A2A2D] hover:border-[#8E8E93] dark:hover:border-[#3E3E42] rounded-md transition-colors duration-150 ease-out cursor-pointer shadow-2xs"
                    >
                        Edit
                    </button>
                    <button
                        onClick={()=>onDelete(task._id)}
                        className="px-2.5 py-1 text-xs font-medium text-[#71717A] dark:text-[#8E8E93] hover:text-[#FF3B30] dark:hover:text-[#FF3B30] bg-[#F7F7F5] dark:bg-[#0B0B0C] hover:bg-[#FF3B30]/10 dark:hover:bg-[#FF3B30]/15 border border-[#E2E2E0] dark:border-[#2A2A2D] hover:border-[#FF3B30]/30 dark:hover:border-[#FF3B30]/40 rounded-md transition-colors duration-150 ease-out cursor-pointer shadow-2xs"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}