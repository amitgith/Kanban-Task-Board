import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  search: "",
  priorityFilter: "All",
  statusFilter: "All",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {
    // Add new task
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },

      prepare(task) {
        return {
          payload: {
            id: nanoid(),
            title: task.title.trim(),
            description: task.description.trim(),
            priority: task.priority,
            dueDate: task.dueDate || "",
            status: "Todo",
          },
        };
      },
    },

    // Update existing task
    updateTask(state, action) {
      const { id, ...updatedData } = action.payload;

      const existingTask = state.tasks.find((task) => task.id === id);

      if (existingTask) {
        Object.assign(existingTask, updatedData);
      }
    },

    // Delete task
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    // Update task search
    setSearch(state, action) {
      state.search = action.payload;
    },

    // Filter tasks by priority
    setPriorityFilter(state, action) {
      state.priorityFilter = action.payload;
    },

    // Filter tasks by status
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },

    // Reset all filters
    resetFilters(state) {
      state.search = "";
      state.priorityFilter = "All";
      state.statusFilter = "All";
    },

    // Load tasks from LocalStorage or another source
    setTasks(state, action) {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  setSearch,
  setPriorityFilter,
  setStatusFilter,
  resetFilters,
  setTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
