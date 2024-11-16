import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { createContext, ReactElement, useEffect, useState } from "react";
import { db } from "../Config/Firebase";

export type TaskItemType = {
  taskTitle: string;
  taskDescription: string;
  status: "to-do" | "in-progress" | "completed" | "overdue";
  category: string;
  projectId: string;
  tags: string[];
  id: string;
  priority: string;
  dueDate: string;
  userId: string;
  assignedTo: string;
};

type TaskContextType = {
  tasks: TaskItemType[] | null;
  taskLoading: boolean;
  setTaskSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  taskSearchQuery: string;
};
const taskState: any = {};
export const TaskContext = createContext<TaskContextType>(taskState);

type ChildrenType = {
  children: ReactElement;
};

export const TaskProvider = ({ children }: ChildrenType) => {
  const [tasks, setTasks] = useState<TaskItemType[] | null>(null);
  const [taskLoading, setTaskLoading] = useState<boolean>(true);
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const getTasks = () => {
    try {
      const taskRef = query(
        collection(db, "tasks"),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(taskRef, (snapshot) => {
        const tasks = snapshot.docs.map((task) => ({
          id: task.id,
          ...task.data()
        })) as TaskItemType[];
        setTasks(tasks);
        setTaskLoading(false);
      });
      return () => unsubscribe();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, taskLoading, setTaskSearchQuery, taskSearchQuery }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
