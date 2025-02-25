import React, { useEffect, useState } from "react";
import {
  Activity,
  DollarSign,
  Info,
  BarChart3,
  Globe,
  Clock,
  Hash,
  Users,
  TrendingUp,
  CircleDollarSign,
} from "lucide-react";
import axios from "axios";
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  Spinner,
  Flex,
  HStack,
  Tag,
  Stack,
  Link,
  Image,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

function CoinInfo({ coinId }) {
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const colorMode = useSelector((state) => state.theme.colorMode);
  const currencySelected = useSelector((state) => state.currency.currency);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true`
        );
        setCoinData(response.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  if (loading) {
    return (
      <Flex
        align="center"
        justify="center"
        minHeight="100vh"
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (!coinData) {
    return (
      <Flex
        align="center"
        justify="center"
        minHeight="100vh"
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Text color="gray.500">Failed to load coin data.</Text>
      </Flex>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "market", label: "Market Data", icon: BarChart3 },
    { id: "info", label: "Information", icon: Info },
    { id: "social", label: "Social", icon: Users },
  ];

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={6}>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <HStack spacing={3} mb={4}>
                <DollarSign color="#3182ce" size={24} />
                <Heading size="md">Current Price</Heading>
              </HStack>
              <Text fontSize="3xl" fontWeight="bold">
                {currencySelected === "INR" ? (
                  <>
                    ₹{" "}
                    {coinData.market_data.current_price.inr.toLocaleString(
                      "en-IN"
                    )}
                  </>
                ) : (
                  <>
                    ${" "}
                    {coinData.market_data.current_price.usd.toLocaleString(
                      "en-US"
                    )}
                  </>
                )}
              </Text>
              <Text
                mt={2}
                color={
                  coinData.market_data.price_change_percentage_24h >= 0
                    ? "green.500"
                    : "red.500"
                }
              >
                {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
                (24h)
              </Text>
            </Box>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <HStack spacing={3} mb={4}>
                <TrendingUp color="#3182ce" size={24} />
                <Heading size="md">Market Cap</Heading>
              </HStack>
              <Text fontSize="3xl" fontWeight="bold">
                {currencySelected === "INR" ? (
                  <>
                    ₹{" "}
                    {coinData.market_data.market_cap.inr.toLocaleString(
                      "en-IN"
                    )}
                  </>
                ) : (
                  <>
                    ${" "}
                    {coinData.market_data.market_cap.usd.toLocaleString(
                      "en-US"
                    )}
                  </>
                )}
              </Text>
              <Text mt={2} color="gray.500">
                Rank #{coinData.market_cap_rank}
              </Text>
              <Text mt={2} color="gray.500">
                Market Cap Change:{" "}
                {coinData.market_data.market_cap_change_percentage_24h.toFixed(
                  2
                )}
                %
              </Text>
            </Box>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <HStack spacing={3} mb={4}>
                <CircleDollarSign color="#3182ce" size={24} />
                <Heading size="md">Trading Volume</Heading>
              </HStack>
              <Text fontSize="3xl" fontWeight="bold">
                {currencySelected === "INR" ? (
                  <>
                    ₹{" "}
                    {coinData.market_data.total_volume.inr.toLocaleString(
                      "en-IN"
                    )}
                  </>
                ) : (
                  <>
                    ${" "}
                    {coinData.market_data.total_volume.usd.toLocaleString(
                      "en-US"
                    )}
                  </>
                )}
              </Text>
              <Text mt={2} color="gray.500">
                24h Volume
              </Text>
            </Box>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <HStack spacing={3} mb={4}>
                <Clock color="#3182ce" size={24} />
                <Heading size="md">Last Updated</Heading>
              </HStack>
              <Text fontSize="lg" fontWeight="medium">
                {formatDate(coinData.last_updated)}
              </Text>
            </Box>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <HStack spacing={3} mb={4}>
                <Heading size="md">Total Supply</Heading>
              </HStack>
              <Text fontSize="lg" fontWeight="medium">
                {coinData.market_data.total_supply
                  ? formatNumber(coinData.market_data.total_supply)
                  : "N/A"}
              </Text>
            </Box>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <HStack spacing={3} mb={4}>
                <Heading size="md">7d Change</Heading>
              </HStack>
              <Text
                fontSize="lg"
                fontWeight="medium"
                color={
                  coinData.market_data.price_change_percentage_7d >= 0
                    ? "green.500"
                    : "red.500"
                }
              >
                {coinData.market_data.price_change_percentage_7d.toFixed(2)}%
              </Text>
            </Box>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <HStack spacing={3} mb={4}>
                <Heading size="md">30d Change</Heading>
              </HStack>
              <Text
                fontSize="lg"
                fontWeight="medium"
                color={
                  coinData.market_data.price_change_percentage_30d >= 0
                    ? "green.500"
                    : "red.500"
                }
              >
                {coinData.market_data.price_change_percentage_30d.toFixed(2)}%
              </Text>
            </Box>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <HStack spacing={3} mb={4}>
                <Heading size="md">1y Change</Heading>
              </HStack>
              <Text
                fontSize="lg"
                fontWeight="medium"
                color={
                  coinData.market_data.price_change_percentage_1y >= 0
                    ? "green.500"
                    : "red.500"
                }
              >
                {coinData.market_data.price_change_percentage_1y.toFixed(2)}%
              </Text>
            </Box>
          </Grid>
        );
      case "market":
        return (
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <Heading size="md" mb={4}>
                Price Statistics
              </Heading>
              <Stack spacing={4}>
                <HStack justify="space-between">
                  <Text color="gray.600">All Time High</Text>
                  <Text fontWeight="medium">
                    {currencySelected === "INR" ? (
                      <>
                        ₹ {coinData.market_data.ath.inr.toLocaleString("en-IN")}
                      </>
                    ) : (
                      <>
                        $ {coinData.market_data.ath.usd.toLocaleString("en-US")}
                      </>
                    )}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.600">All Time High Date</Text>
                  <Text fontWeight="medium">
                    {formatDate(coinData.market_data.ath_date.usd)}
                  </Text>
                </HStack>
                {/* <HStack justify="space-between">
                  <Text color="gray.600">All Time Low</Text>
                  <Text fontWeight="medium">
                    ${formatNumber(coinData.market_data.atl.usd)}
                  </Text>
                </HStack> */}
                <HStack justify="space-between">
                  <Text color="gray.600">Circulating Supply</Text>
                  <Text fontWeight="medium">
                    {formatNumber(coinData.market_data.circulating_supply)}{" "}
                    {coinData.symbol.toUpperCase()}
                  </Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.600">Max Supply</Text>
                  <Text fontWeight="medium">
                    {coinData.market_data.max_supply
                      ? formatNumber(coinData.market_data.max_supply)
                      : "Unlimited"}
                  </Text>
                </HStack>
              </Stack>
            </Box>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <Heading size="md" mb={4}>
                Price Changes
              </Heading>
              <Stack spacing={4}>
                {["1h", "24h", "7d", "30d", "1y"].map((period) => {
                  const key = `price_change_percentage_${period}`;
                  const change = coinData.market_data[key];
                  return (
                    <HStack key={period} justify="space-between">
                      <Text color="gray.600">
                        {period.toUpperCase()} Change
                      </Text>
                      <Text color={change >= 0 ? "green.500" : "red.500"}>
                        {change ? `${change.toFixed(2)}%` : "N/A"}
                      </Text>
                    </HStack>
                  );
                })}
              </Stack>
            </Box>
          </Grid>
        );
      case "info":
        return (
          <Box
            p={6}
            borderRadius="lg"
            boxShadow="md"
            bg={useColorModeValue("white", "gray.700")}
          >
            <Flex align="center" mb={6}>
              <Image
                src={coinData.image.large}
                alt={coinData.name}
                boxSize="50px"
                mr={4}
              />
              <Heading size="lg">About {coinData.name}</Heading>
            </Flex>
            <Text color="gray.700" mb={6}>
              {coinData.description.en}
            </Text>
            <Grid
              templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              gap={6}
            >
              <Box>
                <Heading size="md" mb={4}>
                  Technical Information
                </Heading>
                <Stack spacing={3}>
                  <HStack>
                    <Hash color="gray.500" size={16} />
                    <Text color="gray.600">Hash Algorithm:</Text>
                    <Text fontWeight="medium">
                      {coinData.hashing_algorithm || "N/A"}
                    </Text>
                  </HStack>
                  <HStack>
                    <Clock color="gray.500" size={16} />
                    <Text color="gray.600">Genesis Date:</Text>
                    <Text fontWeight="medium">
                      {coinData.genesis_date
                        ? formatDate(coinData.genesis_date)
                        : "N/A"}
                    </Text>
                  </HStack>
                  <HStack>
                    <Globe color="gray.500" size={16} />
                    <Text color="gray.600">Contract Address:</Text>
                    <Text fontWeight="medium">
                      {coinData.contract_address || "N/A"}
                    </Text>
                  </HStack>
                </Stack>
              </Box>
              <Box>
                <Heading size="md" mb={4}>
                  Categories
                </Heading>
                <HStack wrap="wrap" spacing={2}>
                  {coinData.categories.map((category) => (
                    <Tag key={category} colorScheme="blue" size="sm">
                      {category}
                    </Tag>
                  ))}
                </HStack>
              </Box>
            </Grid>
          </Box>
        );
      case "social":
        return (
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
            <Box
              p={6}
              borderRadius="lg"
              boxShadow="md"
              bg={useColorModeValue("white", "gray.700")}
            >
              <Heading size="md" mb={4}>
                Community
              </Heading>
              <Stack spacing={4}>
                {coinData.links.twitter_screen_name && (
                  <Link
                    href={`https://twitter.com/${coinData.links.twitter_screen_name}`}
                    isExternal
                  >
                    <HStack>
                      <Text fontWeight="medium">Twitter Followers:</Text>
                      <Text>
                        {formatNumber(
                          coinData.community_data.twitter_followers
                        )}
                      </Text>
                    </HStack>
                  </Link>
                )}
                {coinData.links.subreddit && (
                  <Link
                    href={`https://www.reddit.com/r/${coinData.links.subreddit}`}
                    isExternal
                  >
                    <HStack>
                      <Text fontWeight="medium">Reddit Subscribers:</Text>
                      <Text>
                        {formatNumber(
                          coinData.community_data.reddit_subscribers
                        )}
                      </Text>
                    </HStack>
                  </Link>
                )}
                {coinData.links.announcement_url && (
                  <Link href={coinData.links.announcement_url} isExternal>
                    <HStack>
                      <Text fontWeight="medium">Announcements:</Text>
                      <Text>See More</Text>
                    </HStack>
                  </Link>
                )}
              </Stack>
            </Box>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Box minHeight="100vh" p={6} bg={useColorModeValue("gray.50", "gray.800")}>
      <Flex justify="space-between" align="center" mb={6}>
        <Flex align="center">
          <Image
            src={coinData.image.large}
            alt={coinData.name}
            boxSize="50px"
            mr={4}
          />
          <Heading size="2xl" color={useColorModeValue("gray.800", "white")}>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </Heading>
        </Flex>
        <HStack spacing={4}>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "solid" : "outline"}
              colorScheme="blue"
              onClick={() => setActiveTab(tab.id)}
              leftIcon={<tab.icon size={16} />}
            >
              {tab.label}
            </Button>
          ))}
        </HStack>
      </Flex>

      {renderContent()}
    </Box>
  );
}

export default CoinInfo;
