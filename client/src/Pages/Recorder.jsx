import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  Icon,
  FormControl,
  Textarea,
  useToast,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsFillMicMuteFill, BsMicFill } from "react-icons/bs";
import ButtonStopwatch from "../Components/ButtonStopwatch";
import DisplayStopwatch from "../Components/DisplayStopwatch";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect } from "react";
import { postRecord } from "../Redux/App/app.actions";
import { useDispatch } from "react-redux";
import { getItem } from "../Utils/localStorage";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

export default function Recorder() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  let [recordedText, setRecordedText] = useState("");
  const {
    // error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    crossBrowser: true,
    googleApiKey: "AIzaSyAdcVWVfzB8YS9XDJFW2BIOR5WWef9wfaA",
    speechRecognitionProperties: { interimResults: true },
    useLegacyResults: false,
  });
  const [record, setRecord] = useState({
    userId: getItem("userId"),
    name: "",
    student_code: "",
    topic: "",
    content: results.join(" "),
    time: "",
  });

  const start = () => {
    run();
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    startSpeechToText();
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }

    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }

    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    stopSpeechToText();
    clearInterval(interv);
    setStatus(0);
    setRecordedText(interimResult);
    let newTime = [];
    for (const key in time) {
      newTime.push(time[key]);
    }
    console.log(newTime.join(" "));
    setRecord({ ...record, time: newTime.reverse().join(" ") });
  };

  const reset = () => {
    window.location.reload();
    stopSpeechToText();
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setRecordedText("");
    console.log(results);
  };

  let res = [];
  results.forEach((r) => {
    res.push(r.transcript);
  });
  console.log(res.join(" "));

  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRecord((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecord({ ...record, content: res.join(" ") });
    console.log(record);
    dispatch(postRecord(record));
  };

  const confirmHandler = () => {
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
    setRecord({ ...record, content: res.join(" ") });
  };

  const toast = useToast();
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            zIndex={999}
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            All The Instructors{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{" "}
            The Students Of Masai
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              width={useBreakpointValue({ base: "44px", md: "60px" })}
              height={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              It's time to speak & compete now
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              We’re looking for amazing speakers just like you! Become a part of
              our rockstar speaker troop!
            </Text>
          </Stack>
          <Box as={"form"} mt={10} onSubmit={handleSubmit}>
            <FormControl>
              <Stack spacing={4}>
                <Input
                  name="name"
                  placeholder="Student's Name"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  isRequired
                  value={record.name}
                  onChange={handleOnChange}
                />
                <Input
                  name="student_code"
                  placeholder="Student Code"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  value={record.student_code}
                  onChange={handleOnChange}
                />
                <Input
                  name="topic"
                  placeholder="Topic"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  value={record.topic}
                  onChange={handleOnChange}
                />
                {results.length === 0 ? (
                  <Heading
                    fontWeight={400}
                    size={"md"}
                    textAlign={"center"}
                    color={"gray"}
                    py={5}
                  >
                    Start speaking to see your context...
                  </Heading>
                ) : (
                  <Heading
                    maxH={"10rem"}
                    overflowY={"scroll"}
                    fontWeight={400}
                    size={"md"}
                    textAlign={"center"}
                    color={"gray"}
                    py={5}
                  >
                    {results.map((result) => {
                      res.push(result.transcript);
                      return result.transcript;
                    })}
                  </Heading>
                )}
                {interimResult && (
                  <Text maxH={"7rem"} overflowY={"scroll"}>
                    {interimResult}
                  </Text>
                )}
                <Flex gap={10} justifyContent={"space-between"}>
                  {isRecording ? (
                    <Button
                      fontFamily={"heading"}
                      bgGradient="linear(to-r, red.400,pink.400)"
                      color={"white"}
                      _hover={{
                        bgGradient: "linear(to-r, red.400,pink.400)",
                        boxShadow: "xl",
                      }}
                      onClick={stop}
                    >
                      <BsFillMicMuteFill />{" "}
                    </Button>
                  ) : (
                    <Button
                      fontFamily={"heading"}
                      bgGradient="linear(to-r, red.400,pink.400)"
                      color={"white"}
                      _hover={{
                        bgGradient: "linear(to-r, red.400,pink.400)",
                        boxShadow: "xl",
                      }}
                      onClick={start}
                    >
                      <BsMicFill />
                    </Button>
                  )}
                  <Heading>
                    <DisplayStopwatch time={time} />{" "}
                  </Heading>
                  <Button
                    onClick={confirmHandler}
                    fontFamily={"heading"}
                    bgGradient="linear(to-r, green.400,teal.400)"
                    color={"white"}
                    _hover={{
                      bgGradient: "linear(to-r, green.400,teal.400)",
                      boxShadow: "xl",
                    }}
                  >
                    Confirm
                  </Button>
                  <Button
                    onClick={reset}
                    fontFamily={"heading"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    color={"white"}
                    _hover={{
                      bgGradient: "linear(to-r, red.400,pink.400)",
                      boxShadow: "xl",
                    }}
                  >
                    Reset
                  </Button>
                </Flex>
              </Stack>
            </FormControl>
            <Button
              mt={7}
              width={"100%"}
              fontFamily={"heading"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
