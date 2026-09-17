export default function TaskItem({task, onDelete, onToggleComplete, onEdit}){
    return(
        <div className={`group border border-l-[3px] border-[#E5E1D8] dark:border-[#3D3835] ${
            task.priority === 'high'
                ? 'border-l-[#B5541E]'
                : task.priority === 'medium'
                ? 'border-l-[#C99A2E]'
                : 'border-l-[#6B8F71]'
        } rounded-xl p-4 sm:p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(31,41,55,0.06)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:border-[#D6D0C4] dark:hover:border-[#524B47] ${
            task.completed
                ? 'bg-[#FAF7F2]/60 dark:bg-[#1C1917]/60 border-[#E5E1D8]/60 dark:border-[#3D3835]/60 opacity-50 hover:translate-y-0'
                : 'bg-white dark:bg-[#292524] shadow-xs'
        }`}>
            <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] gap-x-3.5 gap-y-1.5 items-start">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={()=>onToggleComplete(task._id, !task.completed)}
                    className="mt-1 h-4 w-4 rounded border-[#E5E1D8] dark:border-[#524B47] text-[#1F2937] dark:text-[#FAF7F2] accent-[#1F2937] dark:accent-[#B5541E] cursor-pointer transition-all duration-150 ease-out focus:ring-0 focus:ring-offset-0 active:scale-95"
                />
                <p className={`font-heading text-sm sm:text-[15px] font-medium leading-normal break-words transition-all duration-200 ease-out ${task.completed ? 'line-through text-[#9CA3AF] dark:text-[#78716C]' : 'text-[#1F2937] dark:text-[#F5F5F4]'}`}>
                    {task.title}
                    <span className={`inline-flex items-center text-xs font-normal tracking-wide px-2 py-0.5 rounded-md ml-2 align-middle border no-underline transition-colors duration-150 ${
                        task.priority === 'high'
                            ? 'bg-[#B5541E]/10 text-[#B5541E] border-[#B5541E]/25 dark:bg-[#B5541E]/20 dark:text-[#D97036] dark:border-[#B5541E]/40'
                            : task.priority === 'medium'
                            ? 'bg-[#C99A2E]/10 text-[#C99A2E] border-[#C99A2E]/25 dark:bg-[#C99A2E]/20 dark:text-[#E0B24A] dark:border-[#C99A2E]/40'
                            : 'bg-[#6B8F71]/10 text-[#6B8F71] border-[#6B8F71]/25 dark:bg-[#6B8F71]/20 dark:text-[#8CB092] dark:border-[#6B8F71]/40'
                    }`}>
                        ({task.priority})
                    </span>
                </p>
                <p className="col-start-2 text-xs sm:text-sm text-[#9CA3AF] dark:text-[#A8A29E] leading-relaxed break-words empty:hidden transition-colors duration-150">
                    {task.description}
                </p>
                <div className="col-start-2 sm:col-start-3 sm:row-start-1 sm:row-span-2 sm:self-center flex items-center gap-2 mt-1 sm:mt-0">
                    <button
                        onClick={()=>onEdit(task)}
                        className="px-2.5 py-1 text-xs font-medium text-[#1F2937] dark:text-[#E7E5E4] hover:text-[#1F2937] bg-white dark:bg-[#292524] hover:bg-[#FAF7F2] dark:hover:bg-[#322E2B] border border-[#E5E1D8] dark:border-[#3D3835] hover:border-[#9CA3AF] dark:hover:border-[#524B47] rounded-md transition-colors duration-150 ease-out cursor-pointer shadow-2xs"
                    >
                        Edit
                    </button>
                    <button
                        onClick={()=>onDelete(task._id)}
                        className="px-2.5 py-1 text-xs font-medium text-[#9CA3AF] dark:text-[#78716C] hover:text-[#B5541E] dark:hover:text-[#D97036] bg-white dark:bg-[#292524] hover:bg-[#B5541E]/10 dark:hover:bg-[#B5541E]/15 border border-[#E5E1D8] dark:border-[#3D3835] hover:border-[#B5541E]/30 dark:hover:border-[#B5541E]/40 rounded-md transition-colors duration-150 ease-out cursor-pointer shadow-2xs"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}