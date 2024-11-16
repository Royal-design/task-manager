import { Image, Text } from "@chakra-ui/react";
import googleImage from "../assets/google.webp";
import { Link } from "react-router-dom";
import { auth, db, googleProvider } from "../Config/Firebase";
import { FormEvent } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const Login = () => {
  const userSchema = z.object({
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
      password: ""
    }
  });
  const navigate = useNavigate();

  const handleSubmit = async (userData: z.infer<typeof userSchema>) => {
    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
      console.log(userData);
      toast.success("User login successfully!");
      form.reset();
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const handleGoogleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      const user = auth.currentUser;
      toast.success("User login successfully!");
      navigate("/");
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {
          firstname: user.displayName,
          lastname: "",
          email: user.email,
          photo: user.photoURL
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  return (
    <div className=" bg-[#152940] flex justify-center items-center h-screen">
      <Card className=" bg-[#152940] text-white w-[25rem] ">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent className="flex flex-col gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="require">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="focus:border-green-400 focus:border-1 border-white duration-150"
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
            <CardFooter className="flex flex-col items-center">
              <Button
                type="submit"
                className="w-full bg-[#0f2339] hover:outline-green-500 hover:outline-1 outline outline-1"
              >
                Sign In
              </Button>
              <Text className="text-center text-sm mt-2">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-500 transition"
                >
                  Sign Up
                </Link>
              </Text>
              <Text className="text-center text-sm mb-2">Or With</Text>
              <Button
                type="submit"
                onClick={handleGoogleLogin}
                className="w-full bg-[#0f2339] hover:outline-green-500 hover:outline-1 outline outline-1"
              >
                <div className="items-center flex text-white">
                  <Image boxSize={"2rem"} src={googleImage} />
                  <Text>Google</Text>
                </div>
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
