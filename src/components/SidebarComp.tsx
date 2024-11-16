import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger
} from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader
} from "@/components/ui/sidebar";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import {
  Calendar,
  EllipsisVertical,
  Files,
  Folders,
  Layers,
  LogOut,
  User,
  UserPen
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../src/assets/LOGO.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import { UseAuthContext } from "@/Context/AuthContext/UseAuthContext";
import { DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import Navbar from "./Navbar";

const SidebarComp = () => {
  const { user, signOut } = UseAuthContext();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <SidebarProvider className="fixed top-[0rem] left-0 bottom-0  z-5 ">
        <Sidebar
          collapsible="icon"
          className="pt-[3rem] border-r border-slate-500 "
        >
          <SidebarHeader className="bg-background duration-75 transition md:hidden">
            <Image src={logo} width="5rem" />
          </SidebarHeader>
          <SidebarSeparator className=" max-sm:border-t h-0 max-sm:border-slate-500" />
          <SidebarContent className="bg-background duration-75 transition text-primary">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="flex flex-col gap-2">
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-background-hover transition"
                    >
                      <NavLink to="activity">
                        <Layers />
                        <span>Activity</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-background-hover transition"
                    >
                      <NavLink to="schedule">
                        <Calendar />
                        <span>Calendar</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-background-hover transition"
                    >
                      <NavLink to="projects">
                        <Folders />
                        <span>Projects</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-background-hover transition"
                    >
                      <NavLink to="tasks">
                        <Files />
                        <span>Tasks</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="bg-background duration-75 transition animation text-primary">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="h-[2] flex items-center p-0 bg-background">
                      <Box className="flex items-center">
                        <Box className="flex items-center  gap-2">
                          <Image
                            objectFit={"fill"}
                            src={user?.photo}
                            className="rounded-full h-8 w-8"
                          />
                          <Flex className="flex-col gap-0">
                            <Text className="font-bold">{user?.firstname}</Text>
                            <Text className="text-sm">{user?.email}</Text>
                          </Flex>
                        </Box>
                        <EllipsisVertical />
                      </Box>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    className="bg-background w-[10rem]"
                  >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-background-hover duration-75 transition p-1">
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-2"
                      >
                        <User size={20} />
                        <span>Profile</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-background-hover duration-75 transition p-1">
                      <NavLink
                        to="/editprofile"
                        className="flex items-center gap-2"
                      >
                        <UserPen size={20} />
                        <span>Edit Profile</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="flex items-center gap-2  hover:bg-background-hover duration-75 transition p-1">
                      <Box
                        onClick={() => {
                          signOut();
                          navigate("/");
                        }}
                        className="flex gap-2 items-center w-full"
                      >
                        <LogOut size={20} />
                        <span>Logout</span>
                      </Box>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className=" w-full overflow-y-scroll h-screen bg-background">
          <SidebarTrigger className="text-primary mt-[4rem]" />
          <div className="p-2">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};

export default SidebarComp;
