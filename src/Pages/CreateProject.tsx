import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select
} from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../Config/Firebase";
import { useNavigate } from "react-router-dom";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";
import { Button } from "@/components/ui/button";

import "react-datepicker/dist/react-datepicker.css";

const CreateProject = () => {
  const { users } = UseAuthContext();
  const [data, setData] = useState({
    projectTitle: "" as string,
    projectDescription: "" as string,
    tags: [] as string[],
    status: "" as "to-do" | "in-progress" | "completed" | "overdue",
    category: "" as string,
    dueDate: "" as string,
    priority: "" as string,
    assignedTo: "" as string
  });
  const priority = ["low", "medium", "high"];
  const status = ["to-do", "in-progress", "completed", "overdue"];

  const navigate = useNavigate();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (user) {
      try {
        const project = collection(db, "projects");
        await addDoc(project, {
          ...data,
          userId: user.uid,
          createdAt: serverTimestamp()
        });
        toast.success("New project created successfully!");
        setData({
          projectDescription: "" as string,
          projectTitle: "" as string,
          tags: [] as string[],
          category: "" as string,
          dueDate: "" as string,
          priority: "" as string,
          status: "" as "to-do" | "in-progress" | "completed" | "overdue",
          assignedTo: "" as string
        });
        navigate(-1);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
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
    <Box className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <Card
            border="1px solid white"
            className="bg-[#152940] overflow-hidden"
          >
            <CardHeader className=" text-white dark:text-primary bg-background-content">
              <Heading size="md" className="text-center">
                Create Project
              </Heading>
            </CardHeader>
            <CardBody className="bg-background-content">
              <Grid className="gap-2  text-white dark:text-primary">
                <FormLabel htmlFor="title">Project Title</FormLabel>
                <Input
                  id="title"
                  name="projectTitle"
                  required
                  placeholder="Project title..."
                  value={data.projectTitle}
                  onChange={handleChange}
                />
              </Grid>
              <Grid className="gap-2 mt-4  text-white dark:text-primary">
                <FormLabel htmlFor="description">Project Description</FormLabel>
                <Input
                  id="description"
                  name="projectDescription"
                  required
                  placeholder="Project description..."
                  value={data.projectDescription}
                  onChange={handleChange}
                />
              </Grid>
              <Box className="justify-between flex max-md:flex-col">
                <Grid className="gap-2 mt-4 w-[45%] max-md:w-full  text-white dark:text-primary">
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Input
                    type="text"
                    name="category"
                    id="category"
                    onChange={handleChange}
                    required
                    placeholder="Category"
                  />
                </Grid>
                <Grid className="gap-2 mt-4  text-white dark:text-primary w-[45%] max-md:w-full">
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
                <Grid className="gap-2 mt-4 w-[45%] max-md:w-full  text-white dark:text-primary">
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
                <Grid className="gap-2 mt-4 w-[45%] max-md:w-full   text-white dark:text-primary">
                  <FormLabel htmlFor="duedate">Date</FormLabel>
                  <Input
                    id="duedate"
                    type="date"
                    name="dueDate"
                    onChange={handleChange}
                  />
                </Grid>
              </Box>
              <Box className="justify-between items-start flex max-md:flex-col  text-white dark:text-primary">
                <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                  <FormLabel htmlFor="status">Project Status</FormLabel>
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
                  <FormLabel htmlFor="assign">Assigned To</FormLabel>
                  <Select
                    id="assign"
                    name="assignedTo"
                    required
                    onChange={handleChange}
                    placeholder="Assign Project"
                  >
                    {users?.map((user, i) => (
                      <option
                        className="text-black"
                        key={i}
                        value={user.firstname}
                      >
                        {user.firstname}
                      </option>
                    ))}
                  </Select>
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
  );
};

export default CreateProject;
