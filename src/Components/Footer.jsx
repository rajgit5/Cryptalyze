import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Stack,
  Menu,
  Select,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Divider,
  Icon,  // <-- Add this import
  Text,  // <-- Add this import
} from "@chakra-ui/react";
import LogoDark from "../assets/logo-dark.png";
import LogoLight from "../assets/logo-light.png";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Footer() {
  const colorMode = useSelector((state) => state.theme.colorMode);

  return (
    <Box color="white" py={10} px={5}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
      >
        {/* Logo Section */}
        <Box mb={{ base: 4, md: 0 }}>
          <Link to="/">
            <Image
              src={colorMode === "light" ? LogoLight : LogoDark}
              alt="Logo"
              width={["200px", "250px", "250px"]} // Responsive size for small, medium, and large screens
              objectFit="contain" // Ensures the image fits well within the box
            />
          </Link>
        </Box>

        {/* Links Section */}
        <Stack
          textAlign={"center"}
          color={colorMode === "light" ? "black" : "white"}
          direction={{ base: "column", md: "row" }}
          spacing={6}
        >
          <Link to='/contact' _hover={{ textDecoration: "underline" }}>
            Contact Us
          </Link>
          <Link to='/about' _hover={{ textDecoration: "underline" }}>
            About Us
          </Link>
          <Link to='/privacy' _hover={{ textDecoration: "underline" }}>
            Privacy
          </Link>
          <Link to='/term' _hover={{ textDecoration: "underline" }}>
            Terms
          </Link>
        </Stack>

        {/* Social Media Icons */}
        <Flex
          color={colorMode === "light" ? "black" : "white"}
          gap={4}
          mt={{ base: 4, md: 0 }}
        >
          <a
            href="https://www.linkedin.com/in/rajesh-rks"
            target="_blank"
            rel="noopener noreferrer"
            mx={2}
          >
            <Icon
              as={FaLinkedin}
              w={6}
              h={6}
              _hover={{ color: "blue.400" }}
              transition="color 0.3s ease" // Smooth transition for color change
            />
          </a>
          <a
            href="https://x.com/rajeshsahu_rks"
            target="_blank"
            rel="noopener noreferrer"
            mx={2}
          >
            <Icon
              as={FaTwitter}
              w={6}
              h={6}
              _hover={{ color: "blue.300" }}
              transition="color 0.3s ease"
            />
          </a>
          <a
            href="https://www.instagram.com/rk.sahu__"
            target="_blank"
            rel="noopener noreferrer"
            mx={2}
          >
            <Icon
              as={FaInstagram}
              w={6}
              h={6}
              _hover={{ color: "pink.400" }}
              transition="color 0.3s ease"
            />
          </a>
        </Flex>
      </Flex>

      {/* Copyright Section */}
      <Text
        color={colorMode === "light" ? "black" : "white"}
        textAlign="center"
        mt={10}
        fontSize="sm"
      >
        © {new Date().getFullYear()} Cryptalyze. All rights reserved.
      </Text>
    </Box>
  );
}

export default Footer;
