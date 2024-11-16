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
import { NavLink, useNavigate } from "react-router-dom";
import UseProjectContext from "../Context/ProjectContext/UseProjectContext";
import { auth, db } from "../Config/Firebase";
import { ChangeEvent, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const CreateTask = () => {
  const { projects, loading } = UseProjectContext();
  const [data, setData] = useState({
    taskTitle: "" as string,
    taskDescription: "" as string,
    status: "" as "to-do" | "in-progress" | "completed" | "overdue",
    category: "" as string,
    projectId: "" as string,
    priority: "" as string,
    dueDate: "" as string,
    tags: [] as string[]
  });
  const navigate = useNavigate();
  const status = ["to-do", "in-progress", "completed", "overdue"];
  const priority = ["low", "medium", "high"];

  const user = auth.currentUser;
  const projectFilter = projects?.filter(
    (project) => project.userId === user?.uid
  );
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    const user = auth.currentUser;
    try {
      const taskRef = collection(db, "tasks");
      await addDoc(taskRef, {
        ...data,
        createdAt: serverTimestamp(),
        userId: user?.uid,
        assignedTo: projects?.find((project) => project.id === data.projectId)
          ?.assignedTo
      });
      toast.success("New task created successfully!");
      setData({
        taskTitle: "" as string,
        taskDescription: "" as string,
        status: "" as "to-do" | "in-progress" | "completed",
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
  if (loading) return <p>Loading...</p>;
  return (
    <Box>
      <NavLink to="/dashboard/tasks">
        <Flex className=" flex justify-end my-1">
          <Button className="bg-background-button text-white dark:text-primary hover:bg-background-button-hover transition border-gray-400 dark:border-green-400 border">
            Back
          </Button>
        </Flex>
      </NavLink>
      <Box className="w-full  flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <Card
              border="1px solid white"
              color={"white"}
              className="bg-background-content overflow-hidden"
            >
              <CardHeader className="bg-background-content">
                <Heading size="md" className="text-center">
                  Create Task
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
                  <Grid className="gap-2 mt-4 w-[45%]  max-md:w-full">
                    <FormLabel htmlFor="status">Task Status</FormLabel>
                    <Select
                      id="status"
                      name="status"
                      required
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
                      required
                      onChange={handleChange}
                      placeholder="Project Id"
                    >
                      {projectFilter?.map((project, i) => (
                        <option
                          key={i}
                          className="text-black"
                          value={project.id}
                        >
                          {project.projectTitle}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                </Box>
                <Box className="justify-between flex max-md:flex-col ">
                  <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Select
                      name="category"
                      required
                      placeholder="Category"
                      onChange={handleChange}
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
                      placeholder="Separate with comma"
                      onChange={handleChange}
                    />
                  </Grid>
                </Box>
                <Box className="justify-between flex max-md:flex-col">
                  <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                    <FormLabel htmlFor="priority">Task Priority</FormLabel>
                    <Select
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
                    <Input type="date" name="dueDate" onChange={handleChange} />
                  </Grid>
                </Box>
              </CardBody>
              <CardFooter className="bg-background-content">
                <Button
                  type="submit"
                  className="hover:bg-background-button-hover dark:hover:bg-background-hover  dark:bg-background bg-background-button dark:text-primary text-white"
                >
                  Create
                </Button>
              </CardFooter>
            </Card>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
};

export default CreateTask;
