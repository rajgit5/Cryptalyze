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
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP & New Password

  const colorMode = useSelector((state) => state.theme.colorMode);

  const handleSendOtp = () => {
    // Add logic to send OTP to email
    console.log("OTP sent to:", email);
    setStep(2);
  };

  const handleResetPassword = () => {
    // Add logic to verify OTP and reset password
    console.log("Password reset with OTP:", otp, "New Password:", newPassword);
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
              {step === 1 ? "Forgot Password" : "Reset Password"}
            </Heading>

            {step === 1 ? (
              <>
                <FormControl mb={6}>
                  <FormLabel>Enter Your Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    bg={colorMode === "dark" ? "gray.600" : "gray.100"}
                    color={colorMode === "dark" ? "white" : "black"}
                  />
                </FormControl>
                <Button
                  colorScheme="teal"
                  width="full"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <FormControl mb={4}>
                  <FormLabel>Enter OTP</FormLabel>
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP sent to your email"
                    bg={colorMode === "dark" ? "gray.600" : "gray.100"}
                    color={colorMode === "dark" ? "white" : "black"}
                  />
                </FormControl>
                <FormControl mb={6}>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    bg={colorMode === "dark" ? "gray.600" : "gray.100"}
                    color={colorMode === "dark" ? "white" : "black"}
                  />
                </FormControl>
                <Button
                  colorScheme="teal"
                  width="full"
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
              </>
            )}

            <Text mt={4} textAlign="center">
              Remembered your password? {" "}
              <Link to='/login' style={{ color: "teal" }}>Login</Link>
            </Text>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Forgot;
