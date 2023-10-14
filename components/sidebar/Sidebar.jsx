import { IoMdNotificationsOutline } from "react-icons/io";
import { CustomModal } from "../modal";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Button,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Center,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiSettings,
  FiMenu,
  FiPackage,
  FiChevronDown,
} from "react-icons/fi";
import { BiAnalyse } from "react-icons/bi";
import {
  MdOutlineAssuredWorkload,
  MdOutlineCardMembership,
} from "react-icons/md";
import { BiMessageAltAdd, BiUser, BiAddToQueue } from "react-icons/bi";
import { BsCassette } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom/";

import { deletetUser } from "../../utility/authentication";
import { useDispatch, useSelector } from "react-redux";
import { deleteLoginUser } from "../../data/auth/slice/userSlice";
import { deleteActiveUser } from "../../data/auth/slice/activeUserSlice";

import SearchForm from "../search/SearchForm";
import { memo } from "react";

const LinkItems = [
  {
    lable: "Dashboard",
    children: [
      { name: "Home", icon: FiHome, href: "/", accessType: "all" },
      {
        name: "Add Realestate",
        icon: BiMessageAltAdd,
        href: "/add-real-estate",
        accessType: "all",
      },
      {
        name: "Add Assets",
        icon: BsCassette,
        href: "/add-assets",
        accessType: "all",
      },
      {
        name: "Effectiveness Report",
        icon: FiSettings,
        href: "/effectiveness-report",
        accessType: "all",
      },
      {
        name: "User List",
        icon: BiUser,
        href: "/user-list",
        accessType: "admin",
      },
    ],
  },
  {
    lable: "Settings",
    children: [
      {
        name: "Country/City",
        icon: FiTrendingUp,
        href: "/country-city",
        accessType: "admin",
      },
      {
        name: "Realestate-Type",
        icon: BiAddToQueue,
        href: "/realestate-type",
        accessType: "admin",
      },
      {
        name: "Category/Brand",
        icon: BiAnalyse,
        href: "/category-brand",
        accessType: "admin",
      },
      {
        name: "Package",
        icon: FiPackage,
        href: "/package",
        accessType: "admin",
      },
      {
        name: "Asset",
        icon: MdOutlineAssuredWorkload,
        href: "/asset",
        accessType: "admin",
      },
      {
        name: "MemberShip",
        icon: MdOutlineCardMembership,
        href: "/membership",
        accessType: "all",
      },
      {
        name: "Schedule Maintenance ",
        icon: MdOutlineCardMembership,
        href: "/schedule-maintenance",
        accessType: "all",
      },
    ],
  },
];

function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }}>{children}</Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const user = useSelector((state) => state.activeUser.user);
  // console.log('user', user)
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      overflowY={"auto"}
      py={"1rem"}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link to="/">
          <img src="/logo.png" width={120} height={50} alt="logo" />
        </Link>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((item, i) => (
        <VStack key={i} alignItems={"start"} ml={"2rem"}>
          <Text
            color={"rgb(34,220,118)"}
            as={"h3"}
            fontWeight={"bold"}
            letterSpacing={"1px"}
            textTransform={"uppercase"}
          >
            {item.lable}
          </Text>
          {item.children &&
            item.children.map((link) => {
              console.log('user',user)
              return user?.user_type === "Admin" ? (
                <NavItem key={link.name} href={link.href} icon={link.icon}>
                  {link.name}
                </NavItem>
              ) : (
                link.accessType === "all" && (
                  <NavItem key={link.name} href={link.href} icon={link.icon}>
                    {link.name}
                  </NavItem>
                )
              );
            })}
        </VStack>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Link to={href ? href : "#"}>
      <Flex
        align="center"
        p="2"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const router = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.activeUser.user);
  const { isOpen, onOpen: onModal, onClose } = useDisclosure();

  const notifications = useSelector((state)=>state.notifications.notification) 
 
  const handleLogout = () => {
    deletetUser();
    dispatch(deleteActiveUser());
    dispatch(deleteLoginUser());
    router("/login");
  };
  return (
    <>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Box display={{ base: "flex", md: "none" }}>
          <Link to="/">
            <img src="/logo.png" width={120} height={50} alt="logo" />
          </Link>
        </Box>

        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"} gap={4}>
            {user?.user_type === "Admin" && (
              <Button onClick={onModal}>Search</Button>
            )}
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <Center>
                  <Box position={"relative"}>
                    <Icon as={IoMdNotificationsOutline} w={8} h={8} />
                    {notifications&&<Box
                      as={"span"}
                      width="1.5rem"
                      height="1.5rem"
                      bg="red"
                      borderRadius="50%"
                      position="absolute"
                      left="10px"
                      top="-5px"
                      zIndex={4}
                    >
                      {
                        notifications?.length
                      }
                    </Box>}
                  </Box>
                </Center>
              </MenuButton>
              <MenuList
                bg={"white"}
                borderColor={"gray.200"}
                overflowY={"auto"}
                maxW={"17rem"}
                maxH={"20rem"}
              >
                {notifications?notifications?.map((item,i)=>{
                  return (
                    <MenuItem key={i} _hover={{ bg: "inherit" }} p={0}>
                      <Text fontSize="xs" color="gray.600" bg={"gray.200"} p={3}>
                        {item.body}
                      </Text>
                    </MenuItem>
                  )
                }):<Text align={'center'}>No Notification</Text>}
                
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} src={user?.image} />

                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg={"white"} borderColor={"gray.200"}>
                <MenuItem>
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{`${user?.first_name} ${user?.last_name}`}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {user?.user_type}
                    </Text>
                  </VStack>
                </MenuItem>
                <MenuDivider />
                <MenuItem>
                  <Link to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
      <CustomModal isOpen={isOpen} onClose={onClose} title={"Search"}>
        <SearchForm onClose={onClose} />
      </CustomModal>
    </>
  );
};



export default Sidebar