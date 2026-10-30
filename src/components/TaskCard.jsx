<<<<<<< HEAD
=======
import TaskActions from "./TaskActions";
>>>>>>> e861065 (feat: add localStorage persistence to kanban tasks)
const priorityStyles = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

const TaskCard = ({ task, onEdit }) => {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`rounded-md px-2 py-1 text-xs font-semibold ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>

        <span className="text-xs text-slate-500">
          {task.dueDate || "No due date"}
        </span>
      </div>

      <h3 className="mt-4 wrap-break-word text-base font-semibold text-slate-800">
        {task.title}
      </h3>

      <p className="mt-2 wrap-break-word text-sm leading-6 text-slate-500">
        {task.description || "No description provided."}
      </p>

      <TaskActions task={task} onEdit={onEdit} />
    </article>
  );
};

export default TaskCard;
