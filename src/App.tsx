import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { ProtectedPages } from "./Layout/ProtectedPages";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Pages/Profile";
import PublicLayout from "./Layout/PublicLayout";
import EditProfile from "./Auth/EditProfile";
import ErrorPage from "./Pages/ErrorPage";
import ProjectPage from "./Pages/ProjectPage";
import CreateProject from "./Pages/CreateProject";
import EditProjectPage from "./Pages/EditProjectPage";
import Tasks from "./Pages/Tasks";
import CreateTask from "./Pages/CreateTask";
import ShowProject from "./Pages/ShowProject";
import EditTask from "./Pages/EditTask";
import SidebarComp from "./components/SidebarComp";
import Activity from "./Pages/Activity";
import { ScheduleCalendar } from "./Pages/ScheduleCalendar";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route index element={<Home />} />
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<ProtectedPages />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/dashboard" element={<SidebarComp />}>
            <Route path="activity" element={<Activity />} />
            <Route path="schedule" element={<ScheduleCalendar />} />

            <Route path="projects" element={<ProjectPage />} />
            <Route path="projects/create" element={<CreateProject />} />
            <Route path="projects/edit/:id" element={<EditProjectPage />} />
            <Route path="projects/show/:id" element={<ShowProject />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/create" element={<CreateTask />} />
            <Route path="tasks/edit/:id" element={<EditTask />} />
            <Route path="projects/show/:id/create" element={<CreateTask />} />
          </Route>
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
