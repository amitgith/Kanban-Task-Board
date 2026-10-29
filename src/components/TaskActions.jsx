import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/tasksSlice";

export default function TaskActions({ task, onEdit }) {
  const dispatch = useDispatch();

  const changeStatus = (event) => {
    dispatch(
      updateTask({
        id: task.id,
        status: event.target.value,
      }),
    );
  };

  const handleDelete = () => {
    const confirmed = window.confirm(`Delete "${task.title}"?`);

    if (confirmed) {
      dispatch(deleteTask(task.id));
    }
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
      <select
        value={task.status}
        onChange={changeStatus}
        aria-label={`Change status for ${task.title}`}
        className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-slate-700"
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button
        type="button"
        onClick={() => onEdit(task)}
        className="rounded-lg px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50"
      >
        Edit
      </button>

      <button
        type="button"
        onClick={handleDelete}
        className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
      >
        Delete
      </button>
    </div>
  );
}
