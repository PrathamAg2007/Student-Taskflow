import TaskItem from "./TaskItem"

export default function TaskList({groups, onDelete, onToggleComplete, onEdit}){
    if (groups.length === 0) {
        return (
            <div className="text-center py-12 px-4 border border-dashed border-[#E5E1D8] dark:border-[#3D3835] rounded-xl bg-white/40 dark:bg-[#292524]/40 transition-colors duration-150">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5E1D8] dark:border-[#3D3835] flex items-center justify-center text-[#9CA3AF] dark:text-[#78716C]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="font-heading text-sm font-medium text-[#1F2937] dark:text-[#F5F5F4]">No tasks found</p>
                <p className="text-xs text-[#9CA3AF] dark:text-[#78716C] mt-1">There are no tasks matching your current view.</p>
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-6">
            {groups.map(group => {
                return(
                    <div key={group.dateKey} className="space-y-2.5">
                        <div className="flex items-center gap-2 pb-1 border-b border-[#E5E1D8]/70 dark:border-[#3D3835]/70">
                            <h2 className="font-heading text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] dark:text-[#78716C]">
                                {group.label}
                            </h2>
                            <span className="text-[11px] font-medium px-1.5 py-0.2 rounded-full bg-white dark:bg-[#292524] text-[#9CA3AF] dark:text-[#78716C] border border-[#E5E1D8] dark:border-[#3D3835]">
                                {group.tasks.length}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2.5">
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