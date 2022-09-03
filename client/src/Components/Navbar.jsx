import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Text,
  Heading,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GrUserExpert } from "react-icons/gr";
import { logout } from "../Redux/Auth/auth.actions";

const Links = ["recorder", "leaderboard"];

const NavLink = ({ children }) => (
  <RouterLink
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={`/${children}`}
  >
    <Text textTransform={"uppercase"} fontSize={["md", "xl"]}>
      {children}
    </Text>
  </RouterLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Box py={[2, 3]} px={[null, 10]}>
        <Flex
          h={[10, 16]}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <RouterLink to={"/"}>
                <Image
                  src="https://i.postimg.cc/nczfkp7q/buzzy-removebg-preview.png"
                  w={["80%", "60%"]}
                ></Image>
              </RouterLink>
            </Box>
            <HStack
              as={"nav"}
              spacing={8}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          {state.token ? (
            <Flex alignItems={"center"}>
              <Button
                onClick={toggleColorMode}
                bgColor={"transparent"}
                _hover={{ bgColor: "transparent" }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <GrUserExpert />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Flex alignItems={"center"}>
              <Button
                onClick={toggleColorMode}
                bgColor={"transparent"}
                _hover={{ bgColor: "transparent" }}
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button
                variant={"ghosted"}
                colorScheme={"blue"}
                size={["xs", "sm"]}
                mr={4}
              >
                <RouterLink to={"/login"}>LOG IN</RouterLink>
              </Button>
              <Button
                variant={"outline"}
                color={"blue.400"}
                borderColor={"blue.400"}
                borderRadius={"sm"}
                _hover={{ color: "white", bg: "blue.400" }}
                size={["xs", "sm"]}
                mr={4}
                px={7}
                py={5}
              >
                <RouterLink to={"/signup"}>SIGN UP</RouterLink>
              </Button>
            </Flex>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
