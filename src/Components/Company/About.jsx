import React from "react";
import { Box, Heading, Text, Container, Image } from "@chakra-ui/react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useSelector, useDispatch } from "react-redux";

const About = () => {
  const colorMode = useSelector((state) => state.theme.colorMode);
  return (
    <>
    <Box bg={colorMode == 'dark' ? 'gray.800' : 'white'}>
    <NavBar/>
    <Container pt={32} maxW="container.md">
      <Box color={colorMode == 'dark' ? 'gray.100' : 'gray.700'} textAlign="center" py={[0,12]}>
        <Heading as="h1" mb={4}>
          About Cryptalyze
        </Heading>
        <Text fontSize="lg" mb={6}>
          Cryptalyze is a cryptocurrency analysis platform designed to help users
          track, analyze, and predict the value of digital currencies. With real-time
          charts, historical data, and in-depth insights, we aim to provide users with
          all the tools they need to make informed decisions in the crypto world.
        </Text>
        
        <Text fontSize="lg" mb={6}>
          Our platform provides comprehensive data, from historical trends to market
          analysis and news updates, enabling users to stay ahead in the volatile
          cryptocurrency market. Whether you're a novice or an experienced trader,
          Cryptalyze is your go-to source for crypto insights.
        </Text>
      </Box>
    </Container>
    <Footer/>
    </Box>
    </>
  );
};

export default About;
