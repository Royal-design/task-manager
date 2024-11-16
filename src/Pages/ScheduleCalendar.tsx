import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  CalendarEvent,
  viewDay,
  viewMonthAgenda,
  viewMonthGrid,
  viewWeek
} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/Config/Firebase";
import { toast } from "react-toastify";

export const ScheduleCalendar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  // const [calendar, setCalendar] = useState<any>(null);
  const dragAndDropPlugin = createDragAndDropPlugin();
  const eventModalPlugin = createEventModalPlugin();
  const eventsServicePlugin = createEventsServicePlugin();

  // const getEvents = ()=>{
  //   try {
  //     const eventRef = collection(db, "events")
  //      const unsubscribe = onSnapshot(eventRef, (snapshot) => {
  //       const events = snapshot.docs.map((event) => ({
  //         id: event.id,
  //         ...event.data()
  //       }))
  //       setEvents(events as CalendarEvent[]);
  //     });
  //     return () => unsubscribe();
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       console.error(error.message);
  //     }
  //   }
  // };
  // }

  const getEventData = () => {
    try {
      const eventRef = collection(db, "events");
      const unsubscribe = onSnapshot(eventRef, (snapshot) => {
        const events = snapshot.docs.map((event) => {
          const data = event.data() as EventSchemaType;
          return {
            id: event.id,
            title: data.title,
            description: data.description,
            start: data.startdate,
            end: data.enddate
          };
        });
        setEvents(events);
      });
      return () => unsubscribe();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    getEventData();
  }, []);

  const calendar = useCalendarApp({
    views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
    selectedDate: "2024-11-10",
    defaultView: viewMonthGrid.name,

    events: events.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      description: event.description
    })),

    calendars: {
      leisure: {
        colorName: "leisure",
        lightColors: {
          main: "#FF0000",
          container: "#d2e7ff",
          onContainer: "#002859"
        },
        darkColors: {
          main: "#c0dfff",
          onContainer: "#dee6ff",
          container: "#426aa2"
        }
      }
    },
    plugins: [dragAndDropPlugin, eventModalPlugin, eventsServicePlugin]
  });

  // const calendar = useCalendarApp({
  //   views: [viewMonthGrid, viewMonthAgenda, viewWeek, viewDay],
  //   selectedDate: "2024-11-10",
  //   defaultView: viewMonthGrid.name,

  //   events: events.map((event) => ({
  //     id: event.id,
  //     title: event.title,
  //     start: event.start,
  //     end: event.end,
  //     description: event.description
  //   })),

  //   calendars: {
  //     leisure: {
  //       colorName: "leisure",
  //       lightColors: {
  //         main: "#FF0000", // Corrected color code format
  //         container: "#d2e7ff",
  //         onContainer: "#002859"
  //       },
  //       darkColors: {
  //         main: "#c0dfff",
  //         onContainer: "#dee6ff",
  //         container: "#426aa2"
  //       }
  //     }
  //   },
  //   plugins: [dragAndDropPlugin, eventModalPlugin, eventsServicePlugin]
  // });

  // const addEvent = (newEvent: CalendarEvent) => {
  //   // Ensure each event has a unique ID
  //   const eventWithId = { ...newEvent, id: Math.random() };
  //   eventsServicePlugin.add(eventWithId);
  // };
  const eventSchema = z.object({
    title: z
      .string()
      .min(3, { message: "It must be a minimum of 3 charcters" }),
    description: z
      .string()
      .min(3, { message: "It must be a minimum of 3 charcters" }),
    startdate: z
      .string({
        required_error: "It is required",
        invalid_type_error: "It must be a date"
      })
      .date(),
    enddate: z
      .string({
        required_error: "It is required",
        invalid_type_error: "It must be a date"
      })
      .date()
  });
  type EventSchemaType = z.infer<typeof eventSchema>;
  const form = useForm<EventSchemaType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      description: "",
      enddate: "",
      startdate: "",
      title: ""
    }
  });
  const handleSubmit = async (data: EventSchemaType) => {
    try {
      const EventDoc = collection(db, "events");
      await addDoc(EventDoc, data);
      toast.success("New event added successfully");
      console.log(data);
      form.reset();
      setOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
    console.log(data);
    navigate("/dashboard/schedule");
  };
  return (
    <div className=" w-[100%]  max-w-[100vw] h-[800px] max-h-[90vh] ">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-background-button hover:bg-background-button-hover dark:text-primary text-white mb-3"
          >
            Add Event
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-primary">
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
            <DialogDescription>Schedule your new event</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="require">Event Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="focus:border-green-400  border-solid  border-primary  duration-150"
                          placeholder="Enter your event title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="require">
                        Event Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="focus:border-green-400  border-solid  border-primary  duration-150"
                          placeholder="Enter your event description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startdate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="require">Event date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="focus:border-green-400  border-solid  border-primary  duration-150"
                          placeholder="Enter your event date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="enddate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="require">Event Due Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="focus:border-green-400  border-solid  border-primary  duration-150"
                          placeholder="Enter your event due date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="bg-background-button hover:bg-background-button-hover dark:text-primary text-white"
                  >
                    {form.formState.isSubmitting ? "Creating" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
};
