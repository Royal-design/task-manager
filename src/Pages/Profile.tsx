import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text
} from "@chakra-ui/react";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, signOut } = UseAuthContext();
  const navigate = useNavigate();
  return (
    <Box className="flex w-full h-screen items-center justify-center">
      <Card width={"30rem"}>
        <CardHeader>
          <Text>User Profile</Text>
        </CardHeader>
        <CardBody>
          <Text>First Name: {user?.firstname} </Text>
          <Text>First Name: {user?.lastname} </Text>
          <Text>First Name: {user?.email} </Text>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              signOut();
              navigate("/");
            }}
          >
            SIgn Out
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default Profile;
