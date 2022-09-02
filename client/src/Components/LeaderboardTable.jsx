import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Button,
} from "@chakra-ui/react";
import { FaSlack } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { postLeaderboard } from "../Redux/App/app.actions";

const LeaderboardTable = ({ leaderboard }) => {
  const dispatch = useDispatch();
  const postHandler = () => {
    dispatch(postLeaderboard(leaderboard));
  };
  return (
    <div>
      <Heading w={"95%"} m={"auto"} mt={10}>
        Top 10 Speakers of the week
      </Heading>
      <TableContainer w={"95%"} m={"auto"} mt={10}>
        <Table variant="striped" colorScheme="blue">
          {leaderboard.length > 0 ? (
            <TableCaption>
              <Button
                bgColor={"blue.400"}
                _hover={{ bgColor: "blue.500" }}
                color="white"
                rightIcon={<FaSlack />}
                onClick={postHandler}
              >
                Post on Slack
              </Button>
            </TableCaption>
          ) : (
            ""
          )}

          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Student Name</Th>
              <Th>Student Code</Th>
              <Th>Topic</Th>
              <Th>Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((ele, ind) => {
                let newTime = [];
                newTime = ele.time.split(" ");
                newTime[0] = newTime[0] + "h ";
                newTime[1] = newTime[1] + "m ";
                newTime[2] = newTime[2] + "s ";
                newTime[3] = newTime[3] + "ms ";
                return (
                  <Tr>
                    <Td>{ind + 1}</Td>
                    <Td>{ele.name}</Td>
                    <Td>{ele.student_code}</Td>
                    <Td>{ele.topic}</Td>
                    <Td>{newTime}</Td>
                  </Tr>
                );
              })
            ) : (
              <Tr>
                <Td colSpan={5}>You're not authenticated to see this data</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LeaderboardTable;
