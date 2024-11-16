"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import UseProjectContext from "@/Context/ProjectContext/UseProjectContext";
import UseTaskContext from "@/Context/UseTaskContext";

export function PlaceholdersAndVanishInputDemo() {}
const SearchBar = () => {
  const { setProjectSearchQuery } = UseProjectContext();
  const { setTaskSearchQuery } = UseTaskContext();

  const placeholders = [
    "What's the title of your project?",
    "What is the decription of the project?",
    "What's the title of your task?",
    "What is the decription of the task?"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectSearchQuery(e.target.value);
    setTaskSearchQuery(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className=" ">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default SearchBar;
