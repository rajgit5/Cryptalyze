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
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { FcGoogle } from "react-icons/fc";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const colorMode = useSelector((state) => state.theme.colorMode);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
              Create New Account
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  bg={colorMode === "dark" ? "gray.600" : "gray.100"}
                  color={colorMode === "dark" ? "white" : "black"}
                />
              </FormControl>
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
              <FormControl mb={4}>
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
              <Button type="submit" colorScheme="teal" width="full" mb={4}>
                Sign Up
              </Button>
            </form>
            <Button colorScheme="gray" width="full" leftIcon={<FcGoogle />}>
              Sign Up with Google
            </Button>
            <Text mt={4}  textAlign="center" mb={4}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "teal" }}>
                Log in
              </Link>
            </Text>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Signup;
