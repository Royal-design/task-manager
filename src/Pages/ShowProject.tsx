import { NavLink, useParams } from "react-router-dom";
import UseTaskContext from "../Context/UseTaskContext";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import UseProjectContext from "../Context/ProjectContext/UseProjectContext";
import { ProjectItemType } from "../Context/ProjectContext/ProjectProvider";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";
import { Button } from "@/components/ui/button";
import TaskSection from "@/components/TaskSection";
import { UseTheme } from "@/Context/ThemeContext/UseTheme";

const ShowProject = () => {
  const { id } = useParams();
  const { tasks, taskSearchQuery } = UseTaskContext();
  const { users, user } = UseAuthContext();
  const { projects } = UseProjectContext();
  const { theme } = UseTheme();
  const project = projects?.find((project) => project.id === id);
  const filteredTasks = tasks?.filter(
    (task) =>
      task.userId === user?.id &&
      task.projectId === id &&
      task.taskTitle.toLowerCase().includes(taskSearchQuery)
  );
  console.log(filteredTasks);
  const getPhoto = (project: ProjectItemType) => {
    const photo = users?.find(
      (user) => user.firstname === project.assignedTo
    )?.photo;
    return photo;
  };
  return (
    <Box className="mt-2">
      <Box className="flex flex-col gap-2">
        <Flex className="gap-4 items-center">
          <Text color="gray.500">Priority</Text>
          <Text bg="gray.200" className="rounded-full px-3">
            {project?.priority}
          </Text>
        </Flex>
        <Flex className="gap-4 items-center">
          <Text color="gray.500">Due Date</Text>
          <Text bg="gray.200" className="rounded-full px-3">
            {project?.dueDate}
          </Text>
        </Flex>
        <Flex className="gap-4 items-center">
          <Text color="gray.500">Tags</Text>
          <Flex className="gap-2">
            {project?.tags.map((tag, i) => (
              <Text
                key={i}
                bg={
                  i === 0
                    ? "blue.200"
                    : i === 1
                    ? "orange.200"
                    : i === 2
                    ? "green.200"
                    : "gray.200"
                }
                className="rounded-full px-3"
              >
                {tag}
              </Text>
            ))}
          </Flex>
        </Flex>
        {project && (
          <Flex className="gap-4 items-center">
            <Text color="gray.500">Assigned to</Text>
            <Flex
              bg="gray.200"
              className="rounded-full px-1 items-center gap-2"
            >
              <Image
                src={getPhoto(project)}
                boxSize="2rem"
                border="1px dotted white"
                className="rounded-full "
              />
              <Text className="text-sm">{project?.assignedTo}</Text>
            </Flex>
          </Flex>
        )}
      </Box>
      <NavLink to="create">
        <Button className="hover:bg-background-button-hover bg-background-button text-primary mt-4">
          Create Task
        </Button>
      </NavLink>

      <Box className="gap-3 mt-3 flex justify-between max-sm:flex-col">
        <TaskSection
          bg={theme ? "var(--background-content)" : "#00a87a"}
          tasks={filteredTasks}
          status="to-do"
          title="ToDo"
        />
        <TaskSection
          bg={theme ? "var(--background-content)" : "#62a800"}
          tasks={filteredTasks}
          status="in-progress"
          title="In Progress"
        />
        <TaskSection
          bg={theme ? "var(--background-content)" : "#d9800e"}
          tasks={filteredTasks}
          status="completed"
          title="Completed"
        />
        <TaskSection
          bg={theme ? "var(--background-content)" : "#a3a4a3"}
          tasks={filteredTasks}
          status="overdue"
          title="Overdue"
        />
      </Box>
    </Box>
  );
};

export default ShowProject;
