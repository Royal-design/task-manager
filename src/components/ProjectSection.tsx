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
import { ProjectItemType } from "../Context/ProjectContext/ProjectProvider";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";
import Menu from "./Menu";

type PropsType = {
  projects: ProjectItemType[] | undefined;
  bg: string;
  status: string;
  title: string;
  color: string;
};
const ProjectSection = ({ projects, bg, status, title, color }: PropsType) => {
  const { users } = UseAuthContext();

  const getPhoto = (project: ProjectItemType) => {
    const photo = users?.find(
      (user) => user.firstname === project.assignedTo
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
          <Text color={color}>{title}</Text>
          <Text
            bg={bg}
            color={color}
            className="rounded-full shadow-custom-heavy h-2 w-2 flex items-center border-white border border-dotted justify-center p-3"
          >
            {projects?.filter((project) => project.status === status).length}
          </Text>
        </HStack>
      </Flex>
      {projects?.map((project, i) => {
        if (project.status === status) {
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
                      color={color}
                      className="shadow-custom-medium rounded-full w-full "
                    >
                      {project.category}
                    </Text>
                    <Menu
                      description={project.projectTitle}
                      check={true}
                      document={project}
                      name="project"
                      docName="projects"
                    />
                  </Flex>
                </CardHeader>
                <Flex
                  color={color}
                  className="items-center justify-between gap-2"
                >
                  <Box className="flex gap-2 items-center">
                    <Box
                      bg={`${
                        getDateStatus(project.dueDate) === "Today"
                          ? "green"
                          : getDateStatus(project.dueDate) === "Overdue" &&
                            "red"
                      }`}
                      className="h-2 w-2 bg-blue-500  rounded-full"
                    ></Box>
                    <Text className="text-sm">
                      {getDateStatus(project.dueDate)}
                    </Text>
                  </Box>
                </Flex>
                <Divider border="1px dotted gray" />

                <CardBody color={color}>
                  <Text className="text-lg font-bold text-white dark:text-green-500 ">
                    {project.projectTitle}
                  </Text>
                  <Text className="text-sm ">{project.projectDescription}</Text>
                </CardBody>

                <Divider border="1px dotted gray" />
                <CardFooter className="flex flex-col">
                  <Flex className="gap-1 flex-wrap mb-4 text-center justify-center text-xs">
                    {project.tags.map((tag, i) => (
                      <Text
                        color={color}
                        transform="scale(0.8)"
                        bg={`${bg}.500`}
                        className="scale rounded-full p-1 shadow-custom-heavy  "
                        key={i}
                      >
                        {tag}
                      </Text>
                    ))}
                  </Flex>
                  <Flex className=" items-center justify-between w-full">
                    <Text color={color} className="text-sm mt-2">
                      {project.priority}
                    </Text>
                    <Box
                      border="1px dotted white"
                      className="flex p-[2px] items-center gap-2 rounded-full"
                    >
                      <Image
                        src={getPhoto(project)}
                        boxSize="1.5rem"
                        className="rounded-full"
                      />
                      <Text color={color} className="text-sm">
                        {project.assignedTo}
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

export default ProjectSection;
