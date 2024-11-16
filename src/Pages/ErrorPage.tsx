import { Box, Text } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Box className="flex justify-center items-center absolute w-full top-0 bg-black h-screen">
      <Box className="text-center shadow-md ">
        <Text className="text-4xl text-white mb-4">Error 404!</Text>
        <Text className="text-2xl text-red-700 ">
          This page cannot be found
        </Text>
      </Box>
    </Box>
  );
};

export default ErrorPage;
