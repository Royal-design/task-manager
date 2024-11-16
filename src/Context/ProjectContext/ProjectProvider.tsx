import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { createContext, ReactElement, useEffect, useState } from "react";
import { db } from "../../Config/Firebase";

export type ProjectItemType = {
  projectTitle: string;
  projectDescription: string;
  userId: string;
  id: string;
  tags: string[];
  status: "to-do" | "in-progress" | "completed" | "overdue";
  category: string;
  dueDate: string;
  priority: string;
  assignedTo: string;
};

type ProjectType = {
  projects: ProjectItemType[] | null;
  loading: boolean;
  setProjects: React.Dispatch<React.SetStateAction<ProjectItemType[] | null>>;
  setProjectSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  projectSearchQuery: string;
};
const projectState: any = {};
export const ProjectContext = createContext<ProjectType>(projectState);
type ChildrenType = {
  children: ReactElement;
};

export const ProjectProvider = ({ children }: ChildrenType) => {
  const [projects, setProjects] = useState<ProjectItemType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [projectSearchQuery, setProjectSearchQuery] = useState("");

  const getProjects = async () => {
    try {
      const projectRef = query(
        collection(db, "projects"),
        orderBy("createdAt", "desc")
      );
      // const data = await getDocs(projectRef);
      // const projects = data.docs.map((project) => ({
      //   ...project.data(),
      //   id: project.id
      // })) as ProjectItemType[];
      // setProjects(projects);
      // setLoading(false);
      const unsubscribe = onSnapshot(projectRef, (snapshot) => {
        const projects = snapshot.docs.map((project) => ({
          id: project.id,
          ...project.data()
        })) as ProjectItemType[];
        setProjects(projects);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        setProjects,
        setProjectSearchQuery,
        projectSearchQuery
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
