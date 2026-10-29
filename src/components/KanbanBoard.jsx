import { useState } from "react";
import { useSelector } from "react-redux";
import KanbanColumn from "./KanbanColumn";
import TaskForm from "./TaskForm";
import TaskFilters from "./TaskFilters";

const columns = [
  { title: "Todo", status: "Todo" },
  { title: "In Progress", status: "In Progress" },
  { title: "Completed", status: "Completed" },
];

const KanbanBoard = () => {
  const { tasks, search, priorityFilter, statusFilter } = useSelector(
    (state) => state.tasks,
  );
  console.log({
    search,
    priorityFilter,
    statusFilter,
    tasks,
  });

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Open form for adding a task
  const openAddForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  // Open form for editing a task
  const openEditForm = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Search and filter tasks
  const filteredTasks = tasks.filter((task) => {
    const taskTitle = (task.title || "").toLowerCase();
    const searchText = search.trim().toLowerCase();

    const matchesSearch = taskTitle.includes(searchText);

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  console.log("Filtered tasks:", filteredTasks);

  return (
    <div>
      {/* Board Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Your Tasks</h2>

          <p className="mt-1 text-sm text-slate-500">
            Organize and track your daily work.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      {/* Search and Filters */}
      <TaskFilters />

      {/* Add/Edit Task Form */}
      {showForm && (
        <div className="mb-6">
          <TaskForm editingTask={editingTask} onClose={closeForm} />
        </div>
      )}

      {/* No Search Results */}
      {tasks.length > 0 && filteredTasks.length === 0 && (
        <div className="mb-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h3 className="font-semibold text-slate-800">
            No matching tasks found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try another search term or change your filters.
          </p>
        </div>
      )}

      {/* Empty Board */}
      {tasks.length === 0 && (
        <div className="mb-5 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h3 className="font-semibold text-slate-800">No tasks yet</h3>

          <p className="mt-2 text-sm text-slate-500">
            Click Add Task to create your first task.
          </p>
        </div>
      )}

      {/* Kanban Columns */}
      <main className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(
            (task) => task.status === column.status,
          );

          return (
            <KanbanColumn
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={columnTasks}
              onEdit={openEditForm}
            />
          );
        })}
      </main>
    </div>
  );
};

export default KanbanBoard;
