import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Flex
      w={"full"}
      h={["50vh", "80vh"]}
      backgroundImage={
        "url(https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)"
      }
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack maxW={"4xl"} align={"flex-start"} spacing={6}>
          <Text
            color={"white"}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "2xl", md: "4xl" })}
          >
            “There are three things to aim at in public speaking: first, to get
            into your subject, then to get your subject into yourself, and
            lastly, to get your subject into the heart of your audience.”
            Alexander Gregg
          </Text>
          <Stack direction={"row"}>
            <Button
              bg={"blue.400"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "blue.500" }}
            >
              <Link to="/recorder">Start Recording</Link>
            </Button>
            <Button
              bg={"whiteAlpha.300"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500" }}
            >
              <a
                href="https://www.youtube.com/watch?v=Ss1XWRfdM-0&ab_channel=SandeepMaheshwari"
                target="_blank"
                rel="noopener noreferrer"
              >
                Need Motivation
              </a>
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
