import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from "@/components/ui/menubar";
import { ProjectItemType } from "@/Context/ProjectContext/ProjectProvider";
import { Flex, Text } from "@chakra-ui/react";
import { EllipsisVertical, Eye, PencilLine } from "lucide-react";
import { NavLink } from "react-router-dom";
import AlertDelete from "./AlertDelete";
import { TaskItemType } from "@/Context/TaskProvider";

type PropsType = {
  document: ProjectItemType | TaskItemType;
  name?: string;
  docName: string;
  check: boolean;
  description: string;
};
const Menu = ({ document, name, docName, check, description }: PropsType) => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <EllipsisVertical
            size={20}
            className="hover:ring-1 rounded-full hover:ring-green-400 text-white duration-300"
          />
        </MenubarTrigger>
        <MenubarContent className="bg-background-content text-white ">
          <NavLink to={`edit/${document.id}`}>
            <MenubarItem className="w-full hover:bg-background-hover hover:text-white  duration-150 ">
              <Flex className="justify-between w-full">
                <Text>Edit</Text>
                <PencilLine size={20} color="green" />
              </Flex>
            </MenubarItem>
          </NavLink>
          {check && (
            <NavLink to={`show/${document.id}`}>
              <MenubarItem className="w-full hover:bg-background-hover hover:text-white">
                <Flex className="justify-between w-full">
                  <Text>Show</Text>
                  <Eye size={20} color="green" />
                </Flex>
              </MenubarItem>
            </NavLink>
          )}
          <MenubarSeparator className="border-gray-300 border-solid border " />
          <Flex className="justify-between w-full p-2 cursor-pointer hover:bg-background-hover hover:text-white">
            <AlertDelete
              description={description}
              document={document}
              name={name}
              docName={docName}
            />
          </Flex>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Menu;
