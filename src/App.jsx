import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import { setTasks } from "./features/tasks/tasksSlice";

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks from LocalStorage
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("kanban-tasks");
      const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];

      dispatch(setTasks(Array.isArray(parsedTasks) ? parsedTasks : []));
    } catch (error) {
      console.error("Failed to load tasks:", error);
      dispatch(setTasks([]));
    } finally {
      setIsLoaded(true);
    }
  }, [dispatch]);

  // Save tasks whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Header />
        <KanbanBoard />
      </div>
    </div>
  );
};

export default App;
