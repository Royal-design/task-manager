import { useNavigate, useParams } from "react-router-dom";
import UseProjectContext from "../Context/ProjectContext/UseProjectContext";
import {
  Box,
  Button,
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
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../Config/Firebase";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";

const EditProjectPage = () => {
  const { id } = useParams();
  const { users } = UseAuthContext();
  const { projects } = UseProjectContext();
  const project = projects?.find((project) => project.id === id);

  const [data, setData] = useState({
    projectTitle: project?.projectTitle as string,
    projectDescription: project?.projectDescription as string,
    tags: project?.tags,
    category: project?.category,
    dueDate: project?.dueDate,
    priority: project?.priority,
    status: project?.status,
    assignedTo: project?.assignedTo
  });
  const status = ["to-do", "in-progress", "completed", "overdue"];

  const navigate = useNavigate();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (project?.id) {
      try {
        const projectRef = doc(db, "projects", project.id);
        await updateDoc(projectRef, {
          ...data,
          userId: user?.uid,
          updatedAt: serverTimestamp(),
          createdAt: serverTimestamp()
        });
        toast.success("Project updated successfully!");
        setData({
          projectDescription: "",
          projectTitle: "",
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
    <Box className="w-full mt-4 flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <Card
            border="1px solid white"
            color="white"
            className="overflow-hidden"
          >
            <CardHeader className="bg-background-content">
              <Heading size="md" className="text-center">
                Edit Project
              </Heading>
            </CardHeader>
            <CardBody className="bg-background-content">
              <Grid className="gap-2">
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
              <Grid className="gap-2 mt-4">
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
                <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Input
                    type="text"
                    name="category"
                    id="category"
                    value={data.category}
                    onChange={handleChange}
                    required
                    placeholder="Category"
                  />
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
                  <Input
                    type="text"
                    value={data.priority}
                    name="priority"
                    id="priority"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                  <FormLabel htmlFor="duedate">Date</FormLabel>
                  <Input
                    type="date"
                    id="duedate"
                    name="dueDate"
                    value={data.dueDate}
                    onChange={handleChange}
                  />
                </Grid>
              </Box>
              <Box className="justify-between items-start flex max-md:flex-col">
                <Grid className="gap-2 mt-4 w-[45%] max-md:w-full">
                  <FormLabel htmlFor="status">Project Status</FormLabel>
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
                  <FormLabel htmlFor="assign">Assigned To</FormLabel>
                  <Select
                    id="assign"
                    name="assignedTo"
                    required
                    value={data.assignedTo}
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
              <Button type="submit">Update</Button>
            </CardFooter>
          </Card>
        </FormControl>
      </form>
    </Box>
  );
};

export default EditProjectPage;
