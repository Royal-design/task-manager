import UseProjectContext from "@/Context/ProjectContext/UseProjectContext";
import UseTaskContext from "@/Context/UseTaskContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper/modules";
import { UseAuthContext } from "@/Context/AuthContext/UseAuthContext";
import { Button } from "@/components/ui/button";
import { MyChart } from "@/components/MyChart";

const Activity = () => {
  const { user } = UseAuthContext();
  const { projects } = UseProjectContext();
  const { tasks } = UseTaskContext();
  const filterProjects = projects?.filter(
    (projects) => projects.userId === user?.id
  );
  const filterTasks = tasks?.filter((task) => task.userId === user?.id);

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
        <Card className="flex  flex-col hover:border-green-400 transition hover:scale-[1.01] bg-background-content text-white justify-center items-center">
          <CardHeader>
            <CardTitle className="text-3xl">{filterProjects?.length}</CardTitle>
          </CardHeader>
          <CardContent>Total Projects</CardContent>
        </Card>
        <Card className="flex bg-[#00a87a]  dark:bg-background-content hover:border-green-400 transition hover:scale-[1.01] text-white flex-col justify-center items-center">
          <CardHeader>
            <CardTitle className="text-4xl">
              {
                filterProjects?.filter((project) => project.status === "to-do")
                  .length
              }
            </CardTitle>
          </CardHeader>
          <CardContent>Upcoming Projects</CardContent>
        </Card>
        <Card className="flex  bg-[#62a800] dark:bg-background-content hover:border-green-400 transition hover:scale-[1.01] text-white flex-col justify-center items-center">
          <CardHeader>
            <CardTitle className="text-4xl">
              {
                filterProjects?.filter(
                  (project) => project.status === "in-progress"
                ).length
              }
            </CardTitle>
          </CardHeader>
          <CardContent>Ongoing Projects</CardContent>
        </Card>
        <Card className="flex  bg-[#d9800e] dark:bg-background-content hover:border-green-400 transition hover:scale-[1.01] text-white flex-col justify-center items-center">
          <CardHeader>
            <CardTitle className="text-4xl">
              {
                filterProjects?.filter(
                  (project) => project.status === "completed"
                ).length
              }
            </CardTitle>
          </CardHeader>
          <CardContent>Completed Projects</CardContent>
        </Card>
        <Card className="flex bg-[#25b1bb] dark:bg-background-content hover:border-green-400 transition hover:scale-[1.01] text-white flex-col justify-center items-center">
          <CardHeader>
            <CardTitle className="text-4xl">
              {
                filterProjects?.filter(
                  (project) => project.status === "overdue"
                ).length
              }
            </CardTitle>
          </CardHeader>
          <CardContent>Overdue Projects</CardContent>
        </Card>
      </div>
      <div className="bg-background-content hidden sm:block text-primary  px-2 mt-4 projects">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper  mt-1 h-[20rem] "
        >
          <p className="absolute top-[1rem]">Project Overview</p>
          {filterProjects?.map((project, i) => (
            <SwiperSlide key={i}>
              <Card className=" h-[15rem] bg-background-content hover:border-green-400 transition hover:scale-[1.01] text-primary ">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {project.projectTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.projectDescription}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex  w-full  gap-2 flex-wrap">
                    {project.tags.map((tag, i) => (
                      <Button
                        key={i}
                        className="text-xs text-primary  bg-background-content shadow-custom-heavy h-[1.5rem]"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="max-sm:bg-background-content hidden max-sm:block max-sm:text-primary  px-2 mt-4 projects">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper  mt-1 h-[20rem] "
        >
          <p className="absolute top-[1rem]">Project Overview</p>
          {filterProjects?.map((project, i) => (
            <SwiperSlide key={i}>
              <Card className=" h-[15rem]  bg-background-content hover:border-green-400 transition hover:scale-[1.01] text-primary ">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {project.projectTitle}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.projectDescription}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex  w-full  gap-2 flex-wrap">
                    {project.tags.map((tag, i) => (
                      <Button
                        key={i}
                        className="text-xs text-primary  bg-background-content shadow-custom-heavy h-[1.5rem]"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <MyChart projects={filterProjects} tasks={filterTasks} />
    </div>
  );
};

export default Activity;
