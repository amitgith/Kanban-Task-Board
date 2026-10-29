import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setPriorityFilter,
  setStatusFilter,
} from "../features/tasks/tasksSlice";

const TaskFilters = () => {
  const dispatch = useDispatch();

  const { search, priorityFilter, statusFilter } = useSelector(
    (state) => state.tasks,
  );

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <input
        type="search"
        value={search}
        onChange={(event) => dispatch(setSearch(event.target.value))}
        placeholder="Search tasks by title..."
        aria-label="Search tasks by title"
        className={inputClass}
      />

      <select
        value={priorityFilter}
        onChange={(event) => dispatch(setPriorityFilter(event.target.value))}
        aria-label="Filter by priority"
        className={inputClass}
      >
        <option value="All">All Priorities</option>
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>

      <select
        value={statusFilter}
        onChange={(event) => dispatch(setStatusFilter(event.target.value))}
        aria-label="Filter by status"
        className={inputClass}
      >
        <option value="All">All Statuses</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskFilters;
