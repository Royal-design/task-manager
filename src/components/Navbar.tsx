import { Box, Flex, Image } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { UseAuthContext } from "../Context/AuthContext/UseAuthContext";
import SearchBar from "./SearchBar";
import logo from "../../src/assets/LOGO.png";
import { Button } from "./ui/button";
import Switch from "./Switch";

const Navbar = () => {
  const { user } = UseAuthContext();
  return (
    <Box className="w-full fixed  top-0 left-0 bottom-0 border-slate-500 border-b z-10 nav bg-background dark:bg-background h-[3rem] gap-2 flex justify-between items-center px-2">
      <Box display={{ lg: "block" }}>
        <Link to="/">
          <Image src={logo} width="5rem" />
        </Link>
      </Box>
      <SearchBar />

      {user ? (
        <div className=" justify-center lg:flex items-center gap-2">
          <p className="dark:text-primary hidden lg:block text-primary text-sm">
            Welcome back {user.firstname}
          </p>
          <div>
            <Switch />
          </div>
        </div>
      ) : (
        <Flex className="gap-4 items-center">
          <NavLink to="/login" className="rounded">
            <Button className="bg-[#152940] hover:bg-[#223e60] rounded ">
              Login
            </Button>
          </NavLink>
          <NavLink to="/register" className="rounded">
            <Button className="bg-[#152940] hover:bg-[#223e60] rounded">
              Register
            </Button>
          </NavLink>
        </Flex>
      )}
    </Box>
  );
};

export default Navbar;
