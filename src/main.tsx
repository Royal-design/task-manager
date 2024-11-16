import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./Context/AuthContext/AuthProvider.tsx";
import ProjectProvider from "./Context/ProjectContext/ProjectProvider.tsx";
import TaskProvider from "./Context/TaskProvider.tsx";
import { ThemeProvider } from "./Context/ThemeContext/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <ThemeProvider>
        <AuthProvider>
          <ProjectProvider>
            <TaskProvider>
              <App />
            </TaskProvider>
          </ProjectProvider>
        </AuthProvider>
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>
);
