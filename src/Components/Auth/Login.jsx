import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import NavBar from "../NavBar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const colorMode = useSelector((state) => state.theme.colorMode);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={colorMode === "dark" ? "gray.800" : "white"} minHeight="100vh">
        <NavBar />
        <Container maxW="container.md" pt={[20, 32]}>
          <Box
            color={colorMode === "dark" ? "gray.100" : "gray.700"}
            p={8}
            borderRadius="md"
            boxShadow="xl"
            bg={colorMode === "dark" ? "gray.700" : "white"}
          >
            <Heading as="h1" size="xl" mb={6} textAlign="center">
              Welcome! Back
            </Heading>
            <FormControl mb={4}>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                bg={colorMode === "dark" ? "gray.600" : "gray.100"}
                color={colorMode === "dark" ? "white" : "black"}
              />
            </FormControl>
            <FormControl mb={6}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                bg={colorMode === "dark" ? "gray.600" : "gray.100"}
                color={colorMode === "dark" ? "white" : "black"}
              />
            </FormControl>
            <Button colorScheme="teal" width="full" mb={4}>
              Log In
            </Button>
            <Button colorScheme="gray" width="full" leftIcon={<FcGoogle />}>
              Login with Google
            </Button>
            <Text  mt={4} textAlign="center" mb={4}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "teal" }}>
                Sign up
              </Link>
            </Text>
            <Text
              textAlign="center"
              onClick={onOpen}
              style={{ cursor: "pointer", color: "teal" }}
            >
              <Link to="/forgot">Forgot your password?</Link>
            </Text>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Login;
