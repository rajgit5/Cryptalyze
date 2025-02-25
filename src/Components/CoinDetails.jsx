import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
import {
  Box,
  Button,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
import NavBar from "./NavBar";
import CoinInfo from "./CoinInfo";

// Register chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const HistoricalChart = (id, days, currency) => {
//   return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
// };

// export const chartDays = [
//   { label: "24 Hours", value: 1 },
//   { label: "30 Days", value: 30 },
//   { label: "3 Months", value: 90 },
//   { label: "1 Year", value: 365 },
// ];

// const SelectButton = ({ children, selected, onClick }) => {
//   return (
//     <Button
//       onClick={onClick}
//       variant="outline"
//       borderColor={selected ? "gold" : "gray.400"}
//       bg={selected ? "gold" : "transparent"}
//       color={selected ? "black" : useColorModeValue("gray.600", "white")}
//       fontWeight={selected ? "bold" : "normal"}
//       _hover={{
//         bg: "gold",
//         color: "black",
//       }}
//       borderRadius="md"
//       p={4}
//       w="22%"
//     >
//       {children}
//     </Button>
//   );
// };

function CoinDetails() {
  const { id } = useParams();
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currencySelected, setCurrencySelected] = useState("usd");

  // const fetchHistoricData = async () => {
  //   setLoading(true);
  //   const { data } = await axios.get(
  //     HistoricalChart(id, days, currencySelected)
  //   );
  //   setHistoricData(data.prices);
  //   localStorage.setItem("setHistoricData", JSON.stringify(data.prices));

  //   setLoading(false);
  // };

  // const fetchHistoricData = async () => {
  //   setLoading(true);

  //   try {
  //     const { data } = await axios.get(HistoricalChart(id, days, currencySelected));

  //     // Save prices to state and localStorage
  //     setHistoricData(data.prices);
  //     localStorage.setItem("setHistoricData", JSON.stringify(data.prices));
  //   } catch (error) {
  //     console.error("Error fetching historic data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchHistoricData();
  //   // setHistoricData(JSON.parse(localStorage.getItem("setHistoricData")).data);
  //   console.log(JSON.parse(localStorage.getItem("setHistoricData")).data)

  // }, [currencySelected, days]);

  useEffect(() => {
    const savedData = localStorage.getItem("setHistoricData");

    if (savedData) {
      setHistoricData(JSON.parse(savedData)); // Set data from localStorage
    } else {
      // fetchHistoricData(); // Fetch data if not in localStorage
    }
  }, [currencySelected, days]);

  const chartBg = useColorModeValue("white", "gray.800");
  const chartTextColor = useColorModeValue("black", "white");

  return (
    <>
      <NavBar />

      <Box pt={32}></Box>
      <CoinInfo coinId={id} />

      {/* <Box w="75%" mx="auto" pt={300} textAlign="center">
        {!historicData || loading ? (
          <Spinner size="xl" thickness="4px" color="gold" />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currencySelected.toUpperCase()}`,
                    borderColor: "#EEBC1D",
                    borderWidth: 3,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: chartTextColor,
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: chartTextColor,
                    },
                  },
                  y: {
                    ticks: {
                      color: chartTextColor,
                    },
                  },
                },
                elements: {
                  point: {
                    radius: 0,
                  },
                },
              }}
            />
            <Box display="flex" justifyContent="space-around" mt={5}>
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </Box>
          </>
        )}
      </Box> */}
    </>
  );
}

export default CoinDetails;
