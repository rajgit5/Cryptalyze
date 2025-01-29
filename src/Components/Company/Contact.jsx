import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  Container,
} from "@chakra-ui/react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useSelector, useDispatch } from "react-redux";

const Contact = () => {
  const colorMode = useSelector((state) => state.theme.colorMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {};
  return (
    <>
      <Box bg={colorMode == "dark" ? "gray.800" : "white"}>
        <NavBar />
        <Container
          color={colorMode == "dark" ? "gray.100" : "gray.700"}
          maxW="container.md"
          pt={[20, 32]}
        >
          <Box textAlign="center">
            <Heading as="h1" mb={4}>
              Contact Cryptalyze Support
            </Heading>
            <Text fontSize="lg" mb={6}>
              We are here to assist you. If you have any questions or need
              support, please reach out using the form below, and our team will
              get back to you as soon as possible.
            </Text>
            <Box
              as="form"
              onSubmit={handleSubmit}
              textAlign="left"
              maxW="500px"
              mx="auto"
            >
              <Input
                placeholder="Your Name"
                mb={4}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                placeholder="Your Email"
                mb={4}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Textarea
                placeholder="Your Message"
                mb={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button colorScheme="blue" type="submit">
                Send Message
              </Button>
            </Box>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Contact;
