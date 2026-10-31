import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../features/tasks/tasksSlice";

const defaultValues = {
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
};

export default function TaskForm({ editingTask, onClose }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    reset(
      editingTask
        ? {
            title: editingTask.title,
            description: editingTask.description,
            priority: editingTask.priority,
            dueDate: editingTask.dueDate || "",
          }
        : defaultValues,
    );
  }, [editingTask, reset]);

  const onSubmit = (data) => {
    if (editingTask) {
      dispatch(updateTask({ ...data, id: editingTask.id }));
    } else {
      dispatch(addTask(data));
    }

    reset(defaultValues);
    onClose();
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="text-lg font-bold text-slate-900">
        {editingTask ? "Edit Task" : "Create New Task"}
      </h2>

      <div>
        <label className="text-sm font-medium text-slate-700">
          Task Title *
        </label>

        <input
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Title must contain at least 3 characters",
            },
            maxLength: {
              value: 100,
              message: "Title cannot exceed 100 characters",
            },
          })}
          placeholder="e.g. Complete React project"
          className={inputClass}
        />

        {errors.title && (
          <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          {...register("description", {
            maxLength: {
              value: 500,
              message: "Description cannot exceed 500 characters",
            },
          })}
          rows={3}
          placeholder="Add task details..."
          className={inputClass}
        />

        {errors.description && (
          <p className="mt-1 text-xs text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Priority *
          </label>

          <select
            {...register("priority", { required: true })}
            className={inputClass}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">Due Date</label>

          <input type="date" {...register("dueDate")} className={inputClass} />
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border cursor-pointer border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-blue-600  cursor-pointer px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {editingTask ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  );
}
