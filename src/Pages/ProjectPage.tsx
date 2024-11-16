import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import UseProjectContext from "../Context/ProjectContext/UseProjectContext";
import { auth } from "../Config/Firebase";

import ProjectSection from "../components/ProjectSection";
import { Button } from "@/components/ui/button";
import { UseTheme } from "@/Context/ThemeContext/UseTheme";

const ProjectPage = () => {
  const { theme } = UseTheme();
  const { projects, loading, projectSearchQuery } = UseProjectContext();
  const user = auth.currentUser;

  const projectFilter = projects?.filter(
    (project) =>
      project.userId === user?.uid &&
      (project.projectTitle.toLowerCase().includes(projectSearchQuery) ||
        project.projectDescription.toLowerCase().includes(projectSearchQuery))
  );

  if (loading) return <p>Loading...</p>;
  return (
    <Box>
      <Flex className=" flex justify-between mb-2">
        <Text className="text-primary text-xl ">Project Overview</Text>
        <NavLink to="create">
          <Button className="bg-background-button text-white dark:text-primary hover:bg-background-button-hover">
            Create Project
          </Button>
        </NavLink>
      </Flex>
      {projectFilter?.length ? (
        <Box className="gap-5 flex justify-between max-sm:flex-col">
          <ProjectSection
            bg={theme ? "var(--background-content)" : "#00a87a"}
            color={theme ? "var(--text-color)" : "#fff"}
            projects={projectFilter}
            status="to-do"
            title="ToDo"
          />
          <ProjectSection
            bg={theme ? "var(--background-content)" : "#62a800"}
            color={theme ? "var(--text-color)" : "#fff"}
            projects={projectFilter}
            status="in-progress"
            title="In Progress"
          />
          <ProjectSection
            color={theme ? "var(--text-color)" : "#fff"}
            bg={theme ? "var(--background-content)" : "#d9800e"}
            projects={projectFilter}
            status="completed"
            title="Completed"
          />
          <ProjectSection
            color={theme ? "var(--text-color)" : "#fff"}
            bg={theme ? "var(--background-content)" : "#a3a4a3"}
            projects={projectFilter}
            status="overdue"
            title="Overdue"
          />
        </Box>
      ) : (
        <p className="text-white text-center text-xl">No project available</p>
      )}
    </Box>
  );
};

export default ProjectPage;
