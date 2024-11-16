import { TypeWriterText } from "@/components/TypeWriterText";
import { Image } from "@chakra-ui/react";
import bg from "../../src/assets/bg.jpg";

export const Home = () => {
  return (
    <div className="w-full relative h-screen bg-[#152940] text-white flex flex-col items-center">
      <Image src={bg} boxSize="100%" objectFit="cover" />
      <TypeWriterText />
    </div>
  );
};
