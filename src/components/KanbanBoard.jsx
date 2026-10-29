import { useState } from "react";
import { useSelector } from "react-redux";
import KanbanColumn from "./KanbanColumn";
import TaskForm from "./TaskForm";

const columns = [
  { title: "Todo", status: "Todo" },
  { title: "In Progress", status: "In Progress" },
  { title: "Completed", status: "Completed" },
];

const KanbanBoard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openAddForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-800">Your Tasks</h2>

        <button
          type="button"
          onClick={openAddForm}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <TaskForm editingTask={editingTask} onClose={closeForm} />
        </div>
      )}

      <main className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks.filter((task) => task.status === column.status)}
            onEdit={openEditForm}
          />
        ))}
      </main>
    </div>
  );
};

export default KanbanBoard;
