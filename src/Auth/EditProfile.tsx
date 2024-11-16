import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { auth, db, storage } from "../Config/Firebase";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { UserType } from "../Context/AuthContext/AuthProvider";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";

const EditProfile = () => {
  const { user, getUserData } = UseAuthContext();

  const [newData, setNewData] = useState({
    firstname: user?.firstname as string,
    lastname: user?.lastname as string,
    email: user?.email as string,
    photo: "" as unknown as File
  });
  const [preview, setPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    const user = auth.currentUser;
    e.preventDefault();
    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        const userDoc = (await getDoc(docRef)).data() as UserType;
        console.log(userDoc);

        // delete old photo if exist
        if (userDoc.photoPath) {
          const photoRef = ref(storage, userDoc.photoPath);
          await deleteObject(photoRef);
        }
        // upload new photo
        console.log(newData);
        const imageFile = newData.photo as File;
        const photoPath = `userphotos/${uuidv4()}.jpg`;
        const photoRef = ref(storage, photoPath);
        await uploadBytes(photoRef, imageFile);
        const photo = await getDownloadURL(photoRef);
        //update doc

        await updateDoc(docRef, {
          firstname: newData.firstname,
          lastname: newData.lastname,
          email: newData.email,
          photo: photo,
          photoPath: photoPath,
          updatedAt: serverTimestamp()
        });
        getUserData();
        toast.success("Profile updated successfully!");
        navigate("/");
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setNewData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };
  return (
    <Box className="edit flex w-full h-screen items-center justify-center ">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <Card className="w-[30rem]">
            <CardHeader>
              <Text className="text-lg text-center">Edit Profile</Text>
            </CardHeader>
            <CardBody>
              <Box className="grid gap-1">
                <FormLabel htmlFor="firstname">First Name</FormLabel>
                <Input
                  name="firstname"
                  onChange={handleChange}
                  id="firstname"
                  required
                  type="text"
                  value={newData.firstname}
                  placeholder="firstname..."
                />
              </Box>
              <Box className="grid gap-1 mt-4">
                <FormLabel htmlFor="lastname">Last Name</FormLabel>
                <Input
                  name="lastname"
                  onChange={handleChange}
                  id="lastname"
                  required
                  type="text"
                  value={newData.lastname}
                  placeholder="lastname..."
                />
              </Box>

              <Box className="grid gap-1 mt-4">
                <FormLabel htmlFor="photo">Upload Image</FormLabel>
                <Input
                  name="photo"
                  onChange={handleChange}
                  required
                  type="file"
                />
                {preview && <Image src={preview} boxSize="5rem" />}
              </Box>
            </CardBody>
            <CardFooter>
              <Button colorScheme="blue" type="submit">
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </FormControl>
      </form>
    </Box>
  );
};

export default EditProfile;
