import TaskItem from "./TaskItem"

export default function TaskList({groups, onDelete, onToggleComplete, onEdit}){
    if (groups.length === 0) {
        return (
            <div className="text-center py-12 px-4 border border-dashed border-[#E2E2E0] dark:border-[#2A2A2D] rounded-lg bg-white dark:bg-[#18181B] transition-colors duration-150">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#F7F7F5] dark:bg-[#0B0B0C] border border-[#E2E2E0] dark:border-[#2A2A2D] flex items-center justify-center text-[#8E8E93] dark:text-[#71717A]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="font-heading text-sm font-semibold text-[#111113] dark:text-[#F2F0EB]">No tasks found</p>
                <p className="text-xs text-[#71717A] dark:text-[#8E8E93] mt-1">There are no tasks matching your current view.</p>
            </div>
        )
    }

    return(
        <div className="flex flex-col gap-6">
            {groups.map(group => {
                return(
                    <div key={group.dateKey} className="space-y-2.5">
                        <div className="flex items-center gap-2 pb-1.5 border-b border-[#E2E2E0] dark:border-[#2A2A2D]">
                            <h2 className="font-heading text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#111113] dark:text-[#F2F0EB] flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#FF3B30]">
                                {group.label}
                            </h2>
                            <span className="text-[11px] font-semibold px-1.5 py-0.2 rounded-full bg-white dark:bg-[#18181B] text-[#71717A] dark:text-[#8E8E93] border border-[#E2E2E0] dark:border-[#2A2A2D]">
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