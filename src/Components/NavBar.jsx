import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Menu,
  Select,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Divider,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import LogoDark from "../assets/logo-dark.png";
import LogoLight from "../assets/logo-light.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/ThemeSlice";
import { setCurrency } from "../Redux/CurrencySlice";
function NavBar() {
  // const { colorMode, toggleColorMode } = useColorMode();
  const colorMode = useSelector((state) => state.theme.colorMode);
  const dispatch = useDispatch();
  return (
    <>
      <Box
        px={3}
        py={2}
        shadow="sm"
        bg={colorMode === "light" ? "white" : "gray.900"}
        position={"fixed"}
        zIndex={100}
        width={"full"}
      >
        <Flex alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <Box>
            <Link to="/">
              <Image
                src={colorMode === "light" ? LogoLight : LogoDark}
                alt="Logo"
                width={["200px", "250px", "250px"]} // Responsive size for small, medium, and large screens
                objectFit="contain" // Ensures the image fits well within the box
              />
            </Link>
          </Box>

          {/* Box to group Select and Dark Mode Toggle */}
          <Box display="flex" alignItems="center" gap={3}>
            {/* Currency Selector */}
            <Select
              onChange={(e) => dispatch(setCurrency(e.target.value))}
              bg={colorMode === "light" ? "gray.200" : "gray.600"}
              color={colorMode === "light" ? "black" : "white"}
              width={24}
              padding="4px"
              border="none"
              _icon={{ display: "none" }}
            >
              <option style={{ color: "black" }} value="INR">
                INR
              </option>
              <option style={{ color: "black" }} value="USD">
                USD
              </option>
            </Select>

            {/* Dark Mode Toggle */}
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              icon={
                colorMode === "light" ? (
                  <MoonIcon color={"black"} />
                ) : (
                  <SunIcon color={"white"} />
                )
              }
              aria-label="Toggle Dark Mode"
              bg={colorMode === "light" ? "gray.200" : "gray.600"}
              _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.600" }}
            />
          </Box>
        </Flex>
        <Divider bg={"gray.200"} mt={1} borderWidth={0.2} />
      </Box>
    </>
  );
}

export default NavBar;
