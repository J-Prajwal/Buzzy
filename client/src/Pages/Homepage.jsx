import { Box, ChakraProvider, Heading, chakra } from "@chakra-ui/react";
import React from "react";
import Hero from "../Components/Hero";
import Initiative from "../Components/Initiative";
import Motivation from "../Components/Motivation";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <Motivation />
      <Initiative />
    </div>
  );
};

export default Homepage;
