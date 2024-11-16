import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import UseTaskContext from "../Context/UseTaskContext";
import { auth } from "../Config/Firebase";

import TaskSection from "../components/TaskSection";
import { Button } from "@/components/ui/button";
import { UseTheme } from "@/Context/ThemeContext/UseTheme";

const Tasks = () => {
  const { taskLoading, tasks, taskSearchQuery } = UseTaskContext();
  const { theme } = UseTheme();

  const user = auth.currentUser;
  const filteredTasks = tasks?.filter(
    (task) =>
      task.userId === user?.uid &&
      (task.taskTitle.toLowerCase().includes(taskSearchQuery) ||
        task.taskDescription.toLowerCase().includes(taskSearchQuery))
  );
  console.log(filteredTasks);

  if (taskLoading) return <p>Task is loading...</p>;
  return (
    <Box className="w-full">
      <Flex className=" flex justify-between mb-2">
        <Text className="text-primary text-xl ">Task Overview</Text>
        <NavLink to="create">
          <Button
            className="bg-background-button dark:
          text-primary text-white hover:bg-background-button-hover"
          >
            Create Task
          </Button>
        </NavLink>
      </Flex>
      {filteredTasks?.length ? (
        <Box className="gap-3 flex justify-between max-sm:flex-col">
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
      ) : (
        <p className="text-white text-center text-xl">No task available</p>
      )}
    </Box>
  );
};

export default Tasks;
