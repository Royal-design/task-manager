import { useContext } from "react";
import { ProjectContext } from "./ProjectProvider";

const UseProjectContext = () => {
  return useContext(ProjectContext);
};

export default UseProjectContext;
