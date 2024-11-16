import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Grid,
  Heading
} from "@chakra-ui/react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../Config/Firebase";
import { ChangeEvent, useState } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import UseTaskContext from "../Context/UseTaskContext";
import UseProjectContext from "../Context/ProjectContext/UseProjectContext";
import { Button } from "@/components/ui/button";

const EditTask = () => {
  const { projects } = UseProjectContext();

  const { tasks } = UseTaskContext();
  const { id } = useParams();
  const filteredTask = tasks?.find((task) => task.id === id);
  const [data, setData] = useState({
    taskTitle: filteredTask?.taskTitle,
    taskDescription: filteredTask?.taskDescription,
    status: filteredTask?.status,
    category: filteredTask?.category,
    projectId: filteredTask?.projectId,
    priority: filteredTask?.priority,
    dueDate: filteredTask?.dueDate,
    tags: filteredTask?.tags
  });
  const navigate = useNavigate();
  const status = ["to-do", "in-progress", "completed", "overdue"];
  const priority = ["low", "medium", "high"];

  const user = auth.currentUser;
  const projectFilter = projects?.filter(
    (project) => project.userId === user?.uid
  );
  console.log(data);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    const user = auth.currentUser;
    if (filteredTask?.id) {
      try {
        const taskRef = doc(db, "tasks", filteredTask.id);
        await updateDoc(taskRef, {
          ...data,
          createdAt: serverTimestamp(),
          userId: user?.uid,
          updatedAt: serverTimestamp()
        });
        toast.success("Task updated successfully!");
        setData({
          taskTitle: "" as string,
          taskDescription: "" as string,
          status: "" as "to-do" | "in-progress" | "completed" | "overdue",
          category: "" as string,
          projectId: "" as string,
          priority: "" as string,
          dueDate: "" as string,
          tags: [] as string[]
        });
        navigate(-1);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "tags" ? value.split(",").map((tag) => tag.trim()) : value
    }));
  };
  return (
    <Box>
      <NavLink to="/tasks">
        <Flex className=" flex justify-end my-4">
          <Button
            type="submit"
            className="hover:bg-background-button-hover text-white dark:text-primary border dark:border-green-500 transition bg-background-button"
          >
            Back
          </Button>
        </Flex>
      </NavLink>
      <Box className="w-full h-auto flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <Card
              color="white"
              border="1px solid white"
              className="overflow-hidden"
            >
              <CardHeader className="bg-background-content">
                <Heading size="md" className="text-center">
                  Edit Task
                </Heading>
              </CardHeader>
              <CardBody className="bg-background-content">
                <Grid className="gap-2">
                  <FormLabel htmlFor="title">Task Title</FormLabel>
                  <Input
                    id="title"
                    name="taskTitle"
                    required
                    placeholder="Task title..."
                    value={data.taskTitle}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid className="gap-2 mt-4">
                  <FormLabel htmlFor="description">Task Description</FormLabel>
                  <Input
                    id="description"
                    name="taskDescription"
                    required
                    placeholder="Task description..."
                    value={data.taskDescription}
                    onChange={handleChange}
                  />
                </Grid>
                <Box className="justify-between flex max-md:flex-col">
                  <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                    <FormLabel htmlFor="status">Task Status</FormLabel>
                    <Select
                      id="status"
                      name="status"
                      required
                      value={data.status}
                      onChange={handleChange}
                      placeholder="Status"
                    >
                      {status.map((status, i) => (
                        <option className="text-black" key={i} value={status}>
                          {status}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                    <FormLabel htmlFor="projectid">Project Id</FormLabel>
                    <Select
                      id="projectid"
                      name="projectId"
                      value={data.projectId}
                      required
                      onChange={handleChange}
                      placeholder="Project Id"
                    >
                      {projectFilter?.map((project, i) => (
                        <option
                          className="text-black"
                          key={i}
                          value={project.id}
                        >
                          {project.projectTitle}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                </Box>
                <Box className="justify-between flex max-md:flex-col">
                  <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Select
                      required
                      placeholder="Category"
                      onChange={handleChange}
                      value={data.category}
                      name="category"
                    >
                      {projectFilter?.map((project, id) => (
                        <option
                          className="text-black"
                          key={id}
                          value={project.category}
                          id="category"
                        >
                          {project.category}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                    <FormLabel htmlFor="tags">Tags</FormLabel>
                    <Input
                      id="tags"
                      name="tags"
                      value={data.tags}
                      placeholder="Separate with comma"
                      onChange={handleChange}
                    />
                  </Grid>
                </Box>
                <Box className="justify-between flex max-md:flex-col">
                  <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                    <FormLabel htmlFor="priority">Task Priority</FormLabel>
                    <Select
                      value={data.priority}
                      id="priority"
                      name="priority"
                      required
                      onChange={handleChange}
                      placeholder="Priority"
                    >
                      {priority.map((priority, i) => (
                        <option className="text-black" key={i} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                  <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                    <FormLabel htmlFor="duedate">Date</FormLabel>
                    <Input
                      type="date"
                      value={data.dueDate}
                      id="duedate"
                      name="dueDate"
                      onChange={handleChange}
                    />
                  </Grid>
                </Box>
              </CardBody>
              <CardFooter className="bg-background-content">
                <Button
                  type="submit"
                  className="hover:bg-background-button-hover dark:hover:bg-background-hover  dark:bg-background bg-background-button dark:text-primary text-white"
                >
                  Update
                </Button>
              </CardFooter>
            </Card>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default EditTask;
