"use client";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { UseAuthContext } from "@/Context/AuthContext/UseAuthContext";
import logo from "../../src/assets/LOGO.png";

import { motion } from "framer-motion";

export const TypeWriterText = () => {
  const { user } = UseAuthContext();
  const introWords = `Your ultimate companion for staying organized, prioritizing tasks, and
        meeting deadlines with ease. Taskify is here to simplify your workflow
        and keep all your projects in one place. `;
  const words = [
    {
      text: "Organize"
    },
    {
      text: "your"
    },
    {
      text: "projects"
    },
    {
      text: "with"
    },
    {
      text: "Taskify.",
      className: "text-green-500 dark:text-blue-500"
    }
  ];
  return (
    <div className="flex flex-col items-center justify-center h-full w-full absolute  bg-[#060d17d6]">
      <motion.img
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        src={logo}
        className="rounded-full  border-green-500 border  border-solid w-[4rem] h-[4rem] bg-[#909597b3] object-contain"
      />
      <div className="w-[40rem] max-md:w-full max-md:p-2  mb-4 text-center">
        <TextGenerateEffect className="text-white " words={introWords} />
      </div>
      <div className="">
        <TypewriterEffect words={words} />
      </div>
      {/* <FormPractice /> */}
      {user ? (
        <div className="mt-6">
          <Link to="dashboard/activity">
            <Button className="w-40 h-10 rounded-xl bg-[#1f3752] hover:bg-[#223e60] border border-green-400  text-sm">
              Get Started
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          <Link to="login">
            <Button className="w-40 h-10 rounded-xl bg-[#1f3752] hover:bg-[#223e60] border border-green-400  text-sm">
              Sign In
            </Button>
          </Link>
          <Link to="register">
            <Button className="w-40 h-10 rounded-xl bg-[#1f3752] hover:bg-[#223e60] border border-green-400  text-sm">
              Join Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
