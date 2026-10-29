import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",

  initialState: {
    tasks: [],
    search: "",
    priorityFilter: "All",
    statusFilter: "All",
  },

  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare(task) {
        return {
          payload: {
            id: nanoid(),
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            status: "Todo",
          },
        };
      },
    },

    updateTask(state, action) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );

      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
        };
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
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  setSearch,
  setPriorityFilter,
  setStatusFilter,
} = tasksSlice.actions;

export default tasksSlice.reducer;
