import { useEffect, useState } from "react";
import { fetchTasks, updateTask, deleteTask } from "../services/api";

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadTasks = async () => {
      if (!token) return;
      try {
        const res = await fetchTasks(token);
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    loadTasks();
  }, [token]);

  const handleComplete = async (id: number) => {
    try {
      await updateTask(token!, id, { isComplete: true });
      setTasks(tasks.map(task => (task.id === id ? { ...task, isComplete: true } : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(token!, id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.isComplete ? "✅" : "❌"}
            <button onClick={() => handleComplete(task.id)}>Complete</button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
