import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { db } from "@/Config/Firebase";
import { ProjectItemType } from "@/Context/ProjectContext/ProjectProvider";
import { TaskItemType } from "@/Context/TaskProvider";
import { Flex, Text } from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { Trash2 } from "lucide-react";
import { FormEvent } from "react";
type PropsType = {
  document: ProjectItemType | TaskItemType;
  name?: string;
  description: string;
  docName: string;
};
const AlertDelete = ({ document, name, docName, description }: PropsType) => {
  const handleDelete = async (e: FormEvent) => {
    e.preventDefault;
    try {
      const docRef = doc(db, docName, document.id);
      await deleteDoc(docRef);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Flex className="justify-between w-[11rem]">
          <Text>Delete</Text>
          <Trash2 size={20} color="red" />
        </Flex>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#223e60] text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete the {name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {` `}
            {`${description.toLowerCase()} ${name}`}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[#152940] hover:bg-[#223e60] hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600">
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDelete;
