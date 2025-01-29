import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  HStack,
  Image,
  Input,
  Divider,
} from "@chakra-ui/react";

import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TrendingCoins } from "../config/APIs";
import { CoinList } from "../config/APIs";
import axios from "axios";
import Footer from "./Footer";
function Home() {
  const [TrendingList, setTrendingList] = useState([]);
  const [AllListCoin, setAllListCoin] = useState([]);
  const colorMode = useSelector((state) => state.theme.colorMode);
  const currencySelected = useSelector((state) => state.currency.currency);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // pagination login
  const [curPage, setCurPage] = useState(1);
  const per_page = 10;

  // axios call for trending coins
  async function getTrendingCoin() {
    try {
      let gettingNow = await axios.get(TrendingCoins(currencySelected));
      setTrendingList(gettingNow.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllListCoin() {
    try {
      let gettingNow = await axios.get(CoinList(currencySelected));
      setAllListCoin(gettingNow.data);
    } catch (error) {
      console.log(error);
    }
  }
  // use effect
  useEffect(() => {
    getTrendingCoin();
    getAllListCoin();
  }, [currencySelected]);

  // Filter coins based on search term
  // Filtered and paginated coins
  const filteredCoins = AllListCoin.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCoins.length / per_page);
  const start_page = (curPage - 1) * per_page;
  const paginatedCoins = filteredCoins.slice(start_page, start_page + per_page);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += 150; // Scroll by 150px
        if (
          scrollContainerRef.current.scrollLeft +
            scrollContainerRef.current.offsetWidth >=
          scrollContainerRef.current.scrollWidth
        ) {
          scrollContainerRef.current.scrollLeft = 0; // Reset to the start
        }
      }
    }, 2000); // Auto-scroll every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Box bg={colorMode == "dark" ? "black" : "white"}>
      <NavBar />
      <Box
        p={6} // Padding around the box
        bg={colorMode == "dark" ? "black" : "white"}
      >
        {/* Heading */}
        <Heading
          p={4}
          mt={16}
          textAlign={"center"}
          color={colorMode == "dark" ? "gray.300" : "gray.700"}
          fontSize={["xl", "3xl", "4xl"]} // Responsive font size
          fontWeight="bold" // Bold font weight
        >
          Explore the Fascinating World of Cryptocurrency and Its Limitless
          Possibilities
        </Heading>
        <Box textAlign={"center"}>
          <Link to="/login">
            <Button
              color="gray.100"
              bg="blue.500"
              _hover={{
                bg: "blue.700", // Change background on hover
                transform: "translateY(-3px)", // Slightly move up on hover
                boxShadow: "lg", // Add shadow for effect
              }}
              _active={{
                transform: "translateY(1px)", // Slightly move down when clicked
                boxShadow: "sm", // Reduce shadow when active
              }}
            >
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>
      {/* Trending coin box */}
      <Box>
        <Text
          m={6}
          color={colorMode === "dark" ? "gray.300" : "gray.700"}
          textAlign="center"
          fontSize={24}
        >
          Trending coins in the past 24 hours
        </Text>
        <Box
          ref={scrollContainerRef}
          overflow="hidden" // Hide the scrollbars
          position="relative"
          width="100%"
          height="150px"
          whiteSpace="nowrap"
          css={{
            "::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Webkit browsers
            "-ms-overflow-style": "none", // Hide scrollbar for IE/Edge
            scrollbarWidth: "none", // Hide scrollbar for Firefox
          }}
        >
          <HStack spacing={4}>
            {TrendingList.map((coin) => (
              <Box
                key={coin.id}
                p={4}
                onClick={() => navigate(`/details/${coin.id}`)}
                minW="150px"
                textAlign="center"
                transition="transform 0.3s ease-in-out, background-color 0.3s"
                _hover={{
                  transform: "scale(1.1)", // Scale the box on hover
                  bg: colorMode === "dark" ? "gray.700" : "gray.200",
                  rounded: "full",
                }}
              >
                <Image
                  src={coin.image}
                  alt={coin.name}
                  boxSize="50px"
                  mx="auto"
                  transition="transform 0.3s ease-in-out"
                  _hover={{ transform: "rotate(10deg) scale(1.2)" }}
                />
                <Text
                  color={colorMode === "dark" ? "gray.100" : "gray.700"}
                  fontWeight="bold"
                  mt={2}
                >
                  {coin.symbol}{" "}
                  <Text
                    as="span"
                    color={colorMode === "dark" ? "gray.100" : "gray.700"}
                  >
                    {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                  </Text>
                </Text>
                <Text
                  color={colorMode === "dark" ? "gray.100" : "gray.700"}
                  fontWeight="bold"
                  mt={2}
                >
                  {currencySelected === "INR"
                    ? `₹ ${coin.current_price.toLocaleString("en-IN")}`
                    : `$ ${coin.current_price.toLocaleString("en-US")}`}
                </Text>
              </Box>
            ))}
          </HStack>
        </Box>
      </Box>
      {/* listing */}
      <Text
        color={colorMode === "dark" ? "gray.100" : "gray.700"}
        textAlign={"center"}
        fontSize="2xl"
        fontWeight="bold"
        m={6}
      >
        Explore Your Favorite Cryptocurrency
      </Text>
      <Box textAlign={"center"}>
        <Input
          placeholder="Search Any Cryptocurrency"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mb={4}
          bg={colorMode === "dark" ? "gray.200" : "gray.100"}
          maxW={250}
          color="black"
          textAlign="center"
          border="1px solid gray"
          borderRadius="md"
          _placeholder={{ color: "gray.500" }}
        />
      </Box>
      <Box
        overflowX="auto"
        p={4}
        m={4}
        bg={colorMode === "dark" ? "gray.700" : "gray.300"}
        borderRadius="lg"
        boxShadow="xl"
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderSpacing: "0",
          }}
        >
          <thead>
            <tr
              style={{
                textAlign: "left",
                background: colorMode === "dark" ? "#1091C8" : "#1091C8",
                color: colorMode === "dark" ? "white" : "white",
              }}
            >
              <th style={{ padding: "12px", borderBottom: "2px solid gray" }}>
                Coin
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid gray" }}>
                Price
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid gray" }}>
                24h Change
              </th>
              <th style={{ padding: "12px", borderBottom: "2px solid gray" }}>
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedCoins.length > 0 ? (
              paginatedCoins.map((coin) => (
                <tr
                  key={coin.id}
                  onClick={() => navigate(`/details/${coin.id}`)}
                  style={{
                    cursor: "pointer",
                    background: colorMode === "dark" ? "black" : "white",
                    transition:
                      "background-color 0.3s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colorMode === "dark" ? "#4A5568" : "#f0f4f8";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colorMode === "dark" ? "black" : "white";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid gray",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      color: colorMode == "dark" ? "white" : "black",
                    }}
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid gray",
                      fontWeight: "bold",
                      color: colorMode === "dark" ? "white" : "black",
                    }}
                  >
                    {currencySelected === "INR" ? (
                      <>₹ {coin.current_price.toLocaleString("en-IN")}</>
                    ) : (
                      <>$ {coin.current_price.toLocaleString("en-US")}</>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid gray",
                      fontWeight: "bold",
                      color:
                        coin.price_change_percentage_24h < 0 ? "red" : "green",
                    }}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid gray",
                      fontWeight: "bold",
                      color: colorMode === "dark" ? "white" : "black",
                    }}
                  >
                    {currencySelected === "INR" ? (
                      <>₹ {coin.market_cap.toLocaleString("en-IN")}</>
                    ) : (
                      <>$ {coin.market_cap.toLocaleString("en-US")}</>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    fontSize: "16px",
                    fontWeight: "medium",
                    background: colorMode === "dark" ? "#1A202C" : "#E2E8F0",
                    color: colorMode === "dark" ? "white" : "black",
                  }}
                >
                  No coins found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>

      {/* Pagination Controls */}
      <HStack spacing={2} m={4} justifyContent="center">
        <Button
          onClick={() => setCurPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={curPage === 1}
        >
          Previous
        </Button>

        <Box
          overflowX="auto"
          display="flex"
          gap={2}
          maxWidth="300px" // Adjust this value based on how many buttons you want to fit before scrolling
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => setCurPage(index + 1)}
              bg={curPage === index + 1 ? "blue.400" : "gray.200"}
              color={curPage === index + 1 ? "white" : "black"}
              minWidth="30px"
              maxWidth="50px"
            >
              {index + 1}
            </Button>
          ))}
        </Box>

        <Button
          onClick={() => setCurPage((prev) => Math.min(prev + 1, totalPages))}
          isDisabled={curPage === totalPages}
        >
          Next
        </Button>
      </HStack>

      <Divider />

      {/* footer */}
      <Footer />
    </Box>
  );
}

export default Home;
