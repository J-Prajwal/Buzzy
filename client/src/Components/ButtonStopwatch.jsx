import { Button } from "@chakra-ui/react";
import React from "react";
import { BsMicFill, BsFillMicMuteFill } from "react-icons/bs";
import { BiReset } from "react-icons/bi";

const ButtonStopwatch = (props) => {

  return (
    <div>
      {props.status == 0 ? (
        <Button
          bg={"gray.200"}
          color={"gray.800"}
          onClick={props.start}
          bgGradient="linear(to-r, red.400,pink.400)"
          _hover={{
            bgGradient: "linear(to-r, red.400,pink.400)",
            boxShadow: "xl",
          }}
        >
          <BsMicFill />
        </Button>
      ) : (
        ""
      )}
      {props.status === 1 ? (
        <div>
          <Button colorScheme="red" variant="solid" onClick={props.stop}>
            <BsFillMicMuteFill />
          </Button>
        </div>
      ) : (
        ""
      )}

      {props.status === 2 ? (
        <div>
          <Button colorScheme="red" variant="solid" onClick={props.reset}>
            <BsFillMicMuteFill />
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ButtonStopwatch;
