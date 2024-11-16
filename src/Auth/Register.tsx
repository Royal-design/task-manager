import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Config/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Register = () => {
  const userSchema = z.object({
    firstname: z
      .string()
      .min(3, { message: "Firstname must be at least 3 characters" }),
    lastname: z
      .string()
      .min(3, { message: "Lastname must be at least 3 characters" }),
    email: z
      .string({ invalid_type_error: "Must be a valid email" })
      .email({ message: "It must be a valid email" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
  });
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: ""
    }
  });
  const navigate = useNavigate();
  const handleSubmit = async (userData: z.infer<typeof userSchema>) => {
    await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email: userData.email,
        photo: null,
        photoPath: null
      });
    }
    toast.success("Account created successfully!");
    navigate("/login");
    form.reset();
    try {
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className="bg-[#152940] flex justify-center items-center h-screen">
      <Card className="bg-[#152940] overflow-hidden text-white w-[25rem]">
        <CardHeader>
          <CardTitle className="text-center">Create your account</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:border-green-400 border-white focus:border-1 duration-150"
                        placeholder="Enter your firstname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:border-green-400 border-white focus:border-1 duration-150"
                        placeholder="Enter your lastname"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="focus:border-green-400 border-white focus:border-1 duration-150"
                        placeholder="Enter a valid email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className=" focus:border-green-400 border-white focus:border-1 duration-150"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col bg-[#152940] justify-center items-center">
              <Button
                type="submit"
                className="w-full hover:bg-[#2f4f74] transition bg-[#264870]"
              >
                Register
              </Button>
              <p className="text-white mt-2">
                {" "}
                You have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 transition"
                >
                  Sign-In
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
