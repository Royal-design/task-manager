import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Grid,
  HStack,
  Image,
  Text
} from "@chakra-ui/react";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";
import { TaskItemType } from "../Context/TaskProvider";
import Menu from "./Menu";

type PropsType = {
  tasks: TaskItemType[] | undefined;
  bg: string;
  status: string;
  title: string;
};
const TaskSection = ({ tasks, bg, status, title }: PropsType) => {
  const { users } = UseAuthContext();

  const getPhoto = (task: TaskItemType) => {
    const photo = users?.find(
      (user) => user.firstname === task.assignedTo
    )?.photo;
    return photo;
  };
  function getDateStatus(dateString: string): string {
    const inputDate: Date = new Date(dateString);
    const today: Date = new Date();

    // Normalize the dates to ignore the time part for comparison
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    // Calculate the difference in time between today and the input date
    const timeDifference: number = today.getTime() - inputDate.getTime(); // in milliseconds
    const daysDifference: number = timeDifference / (1000 * 60 * 60 * 24); // convert milliseconds to days

    if (daysDifference === 0) {
      return "Today";
    } else if (daysDifference < -10) {
      return "Overdue";
    } else {
      const dayNames: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const dayOfWeek: string = dayNames[inputDate.getDay()];
      return `Upcoming on ${dayOfWeek}`;
    }
  }
  return (
    <Box>
      <Flex
        bg={`${bg}`}
        className="flex rounded-sm p-1 justify-between items-center "
        height={"2rem"}
      >
        <HStack>
          <Text className="text-white">{title}</Text>
          <Text
            bg={bg}
            className="rounded-full shadow-custom-heavy h-2 w-2 flex items-center border-white border border-dotted text-white justify-center p-3"
          >
            {tasks?.filter((task) => task.status === status).length}
          </Text>
        </HStack>
      </Flex>
      {tasks?.map((task, i) => {
        if (task.status === status) {
          return (
            <Grid
              gridTemplateColumns=" repeat(auto-fit, minmax(220px, 1fr)) "
              key={i}
              className="max-w-full"
            >
              <Card
                border="0.5px solid #049437"
                bg={`${bg}`}
                className=" mt-2 rounded-md p-1 hover:scale-[1.01] transition  hover:animate-pulse hover:ring-1  hover:ring-green-600 duration-500"
              >
                <CardHeader padding="4px">
                  <Flex className="w-full  text-xs items-center justify-between">
                    <Text
                      bg={`${bg}.500`}
                      padding="3px"
                      className="text-white shadow-custom-medium rounded-full w-full "
                    >
                      {task.category}
                    </Text>
                    <Menu
                      description={task.taskTitle}
                      check={false}
                      document={task}
                      name="task"
                      docName="tasks"
                    />
                  </Flex>
                </CardHeader>
                <Flex className="items-center text-white justify-between gap-2">
                  <Box className="flex gap-2 items-center">
                    <Box
                      bg={`${
                        getDateStatus(task.dueDate) === "Today"
                          ? "green"
                          : getDateStatus(task.dueDate) === "Overdue" && "red"
                      }`}
                      className="h-2 w-2 bg-blue-500  rounded-full"
                    ></Box>
                    <Text className="text-sm">
                      {getDateStatus(task.dueDate)}
                    </Text>
                  </Box>
                </Flex>
                <Divider border="1px dotted gray" />

                <CardBody className="text-white ">
                  <Text className="text-lg text-white dark:text-green-500 font-bold ">
                    {task.taskTitle}
                  </Text>
                  <Text className="text-sm ">{task.taskDescription}</Text>
                </CardBody>

                <Divider border="1px dotted gray" />
                <CardFooter className="flex flex-col">
                  <Flex className="gap-1 flex-wrap mb-4 text-center justify-center text-xs">
                    {task.tags.map((tag, i) => (
                      <Text
                        transform="scale(0.8)"
                        bg={`${bg}.500`}
                        className="scale rounded-full p-1 shadow-custom-heavy text-white "
                        key={i}
                      >
                        {tag}
                      </Text>
                    ))}
                  </Flex>
                  <Flex className=" items-center justify-between w-full">
                    <Text className="text-sm mt-2  text-white ">
                      {task.priority}
                    </Text>
                    <Box
                      border="1px dotted white"
                      className="flex p-[2px] items-center gap-2 rounded-full"
                    >
                      <Image
                        src={getPhoto(task)}
                        boxSize="1.5rem"
                        className="rounded-full"
                      />
                      <Text className="text-sm text-white ">
                        {task.assignedTo}
                      </Text>
                    </Box>
                  </Flex>
                </CardFooter>
              </Card>
            </Grid>
          );
        }
      })}
    </Box>
  );
};

export default TaskSection;
