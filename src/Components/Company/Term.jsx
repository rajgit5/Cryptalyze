import React from "react";
import { Box, Heading, Text, Container } from "@chakra-ui/react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useSelector } from "react-redux";

const Term = () => {
  const colorMode = useSelector((state) => state.theme.colorMode);
  return (
    <>
      <Box bg={colorMode == 'dark' ? 'gray.800' : 'white'}>
        <NavBar />
        <Container pt={20} maxW="container.md">
          <Box color={colorMode == 'dark' ? 'gray.100' : 'gray.700'} textAlign="center" py={[0,12]}>
            <Heading as="h1" mb={4}>
              Terms and Conditions
            </Heading>
            <Text fontSize="lg" mb={6}>
              Welcome to Cryptalyze! By using our platform, you agree to the following
              terms and conditions. If you do not agree with any part of these terms,
              please refrain from using our services.
            </Text>

            <Text fontSize="lg" mb={6}>
              Cryptalyze provides cryptocurrency analysis tools, historical data, and
              real-time market insights. You acknowledge that the information provided
              on the platform is for informational purposes only and should not be
              construed as financial advice.
            </Text>

            <Text fontSize="lg" mb={6}>
              We reserve the right to update these terms and conditions at any time. By
              continuing to use Cryptalyze after such changes, you accept the revised
              terms. Please review this page periodically for updates.
            </Text>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Term;
