import { useContext } from "react";
import { TaskContext } from "./TaskProvider";

const UseTaskContext = () => {
  return useContext(TaskContext);
};

export default UseTaskContext;
