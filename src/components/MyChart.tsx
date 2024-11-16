import {
  Chart as ChartJS,
  Title,
  Tooltip,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import { ProjectItemType } from "@/Context/ProjectContext/ProjectProvider";
import { TaskItemType } from "@/Context/TaskProvider";

type PropType = {
  projects: ProjectItemType[] | undefined;
  tasks: TaskItemType[] | undefined;
};
export const MyChart = ({ projects, tasks }: PropType) => {
  const todo = projects?.filter((project) => project.status === "to-do");
  const in_progress = projects?.filter(
    (project) => project.status === "in-progress"
  );
  const completed = projects?.filter(
    (project) => project.status === "completed"
  );
  const overdue = projects?.filter((project) => project.status === "overdue");

  const taskTodo = tasks?.filter((task) => task.status === "to-do");
  const task_in_progress = tasks?.filter(
    (task) => task.status === "in-progress"
  );
  const taskCompleted = tasks?.filter((task) => task.status === "completed");
  const taskOverdue = tasks?.filter((task) => task.status === "overdue");
  ChartJS.register(
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale
  );
  const barOptions: ChartOptions<"bar"> = {
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        position: "bottom",
        display: true,
        text: "Available tasks"
      }
    }
  };

  const barData: ChartData<"bar"> = {
    labels: ["Todo", "In-Progress", "Completed", "Overdue"],

    datasets: [
      {
        label: "Tasks",
        data: [
          taskTodo?.length as number,
          task_in_progress?.length as number,
          taskCompleted?.length as number,
          taskOverdue?.length as number
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)"
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)"
        ],
        borderWidth: 1
      }
    ]
  };

  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        position: "bottom",
        display: true,
        text: "Available projects"
      }
    }
  };

  const data: ChartData<"doughnut"> = {
    labels: ["Todo", "In-Progress", "Completed", "Overdue"],

    datasets: [
      {
        label: "project",
        data: [
          todo?.length as number,
          in_progress?.length as number,
          completed?.length as number,
          overdue?.length as number
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(25, 206, 86, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(25, 206, 86, 1)"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="  bg-background mt-3">
      <div className="w-[20rem] max-md:flex-col flex items-center">
        {(projects?.length as number) > 0 && (
          <Doughnut options={options} data={data} />
        )}
        {(tasks?.length as number) > 0 && (
          <Bar options={barOptions} data={barData} />
        )}
      </div>
    </div>
  );
};
