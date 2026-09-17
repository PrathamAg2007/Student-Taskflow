export default function TaskItem({task, onDelete, onToggleComplete, onEdit}){
    return(
        <div className={`border rounded-xl p-4 sm:p-5 transition-opacity duration-150 ${task.completed ? 'bg-[#FAF7F2]/60 border-[#E5E1D8]/80 opacity-50' : 'bg-white border-[#E5E1D8] shadow-xs'}`}>
            <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-3.5 gap-y-1.5 items-start">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={()=>onToggleComplete(task._id, !task.completed)}
                    className="mt-1 h-4 w-4 rounded border-[#E5E1D8] text-[#1F2937] accent-[#1F2937] cursor-pointer transition-colors duration-150 focus:ring-0 focus:ring-offset-0"
                />
                <p className={`text-sm sm:text-base font-medium leading-normal break-words ${task.completed ? 'line-through text-[#9CA3AF]' : 'text-[#1F2937]'}`}>
                    {task.title}
                    <span className={`inline-flex items-center text-xs font-normal tracking-wide px-2 py-0.5 rounded-md ml-2 align-middle border no-underline ${
                        task.priority === 'high'
                            ? 'bg-[#B5541E]/10 text-[#B5541E] border-[#B5541E]/25'
                            : task.priority === 'medium'
                            ? 'bg-[#C99A2E]/10 text-[#C99A2E] border-[#C99A2E]/25'
                            : 'bg-[#6B8F71]/10 text-[#6B8F71] border-[#6B8F71]/25'
                    }`}>
                        ({task.priority})
                    </span>
                </p>
                <p className="col-start-2 text-sm text-[#9CA3AF] leading-relaxed break-words empty:hidden">
                    {task.description}
                </p>
                <div className="col-start-2 sm:col-start-3 sm:row-start-1 sm:row-span-2 sm:self-center flex items-center gap-2 mt-1 sm:mt-0">
                    <button
                        onClick={()=>onEdit(task)}
                        className="px-2.5 py-1 text-xs font-medium text-[#1F2937] hover:text-[#1F2937] bg-white hover:bg-[#FAF7F2] border border-[#E5E1D8] hover:border-[#9CA3AF] rounded-md transition-colors duration-150 cursor-pointer"
                    >
                        Edit
                    </button>
                    <button
                        onClick={()=>onDelete(task._id)}
                        className="px-2.5 py-1 text-xs font-medium text-[#9CA3AF] hover:text-[#B5541E] bg-white hover:bg-[#B5541E]/10 border border-[#E5E1D8] hover:border-[#B5541E]/30 rounded-md transition-colors duration-150 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}