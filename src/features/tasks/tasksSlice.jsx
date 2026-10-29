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
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare(task) {
        return {
          payload: {
            id: nanoid(),
            title: task.title.trim(),
            description: (task.description || "").trim(),
            priority: task.priority,
            dueDate: task.dueDate || "",
            status: "Todo",
          },
        };
      },
    },

    updateTask(state, action) {
      const { id, ...updatedData } = action.payload;
      const task = state.tasks.find((item) => item.id === id);

      if (task) {
        Object.assign(task, updatedData);
      }
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    setSearch(state, action) {
      state.search = action.payload;
    },

    setPriorityFilter(state, action) {
      state.priorityFilter = action.payload;
    },

    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },

    resetFilters(state) {
      state.search = "";
      state.priorityFilter = "All";
      state.statusFilter = "All";
    },

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
