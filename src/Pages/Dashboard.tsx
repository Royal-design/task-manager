import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { FileCheck, FolderOpenDot, House } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Box className="dashboard">
      <Grid gridTemplateColumns="repeat(5, 1fr)">
        <GridItem
          className="bg-gray-200 pt-4 px-4 sidebar flex flex-col gap-3"
          colSpan={1}
        >
          <NavLink to="/">
            <Flex
              _hover={{ borderRadius: "4px", bg: "#d8d8d8" }}
              className="gap-2 items-center p-1 duration-200 transition"
            >
              <House size={20} strokeWidth={1.5} />
              <Text>Home</Text>
            </Flex>
          </NavLink>
          <NavLink to="projects">
            <Flex
              _hover={{ borderRadius: "4px", bg: "#d8d8d8" }}
              className="gap-2 items-center p-1 duration-200 transition"
            >
              <FolderOpenDot size={20} strokeWidth={1.5} />
              <Text>Projects</Text>
            </Flex>
          </NavLink>
          <NavLink to="tasks">
            <Flex
              _hover={{ borderRadius: "4px", bg: "#d8d8d8" }}
              className="gap-2 items-center p-1 duration-200 transition"
            >
              <FileCheck size={20} />
              <Text>Tasks</Text>
            </Flex>
          </NavLink>
        </GridItem>
        <GridItem className="bg-slate-50 px-4" colSpan={4}>
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
