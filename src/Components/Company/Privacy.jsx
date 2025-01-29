import React from "react";
import { Box, Heading, Text, Container } from "@chakra-ui/react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const Privacy = () => {
  const colorMode = useSelector((state) => state.theme.colorMode);
  return (
    <>
      <Box bg={colorMode == 'dark' ? 'gray.800' : 'white'}>
        <NavBar />
        <Container pt={20} maxW="container.md">
          <Box color={colorMode == 'dark' ? 'gray.100' : 'gray.700'} textAlign="center" py={[0,12]}>
            <Heading as="h1" mb={4}>
              Privacy Policy
            </Heading>
            <Text fontSize="lg" mb={6}>
              At Cryptalyze, we prioritize your privacy and are committed to protecting
              your personal data. This privacy policy outlines the types of information
              we collect, how it is used, and the steps we take to keep your data secure.
            </Text>

            <Text fontSize="lg" mb={6}>
              We collect information such as your device type, IP address, and user
              behavior while using our platform to improve your experience. We do not
              share your personal information with third parties without your consent.
            </Text>

            <Text fontSize="lg" mb={6}>
              By using Cryptalyze, you agree to the collection and use of your
              information as described in this policy. For more details on how we handle
              your data, please read the full privacy policy.
            </Text>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Privacy;
