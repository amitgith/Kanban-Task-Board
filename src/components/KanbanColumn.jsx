import TaskCard from "./TaskCard";

const statusStyles = {
  Todo: "bg-slate-200 text-slate-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
};

const KanbanColumn = ({ title, tasks, status, onEdit }) => {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-slate-100/80 p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-800">
          {title}
        </h2>

        <span
          className={`rounded-lg px-2.5 py-1 text-xs font-bold ${statusStyles[status]}`}
        >
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-3 py-8 text-center">
          <p className="text-sm font-medium text-slate-600">
            No tasks yet
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Your tasks will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default KanbanColumn;