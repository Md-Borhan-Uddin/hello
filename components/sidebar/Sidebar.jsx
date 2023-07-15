import React, { ReactNode, useEffect, useState } from "react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
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
  useColorMode,
  Stack,
  Collapse,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiPackage,
  FiChevronDown,
} from "react-icons/fi";
import { BiAnalyse } from 'react-icons/bi'
import { MdOutlineAssuredWorkload, MdOutlineCardMembership } from 'react-icons/md'
import { BiMessageAltAdd,BiUser, BiAddToQueue } from 'react-icons/bi';

import { Link, useNavigate } from "react-router-dom/";

import { deletetUser } from "../../utility/authentication";
import { useDispatch, useSelector } from "react-redux";
import { deleteLoginUser } from "../../data/auth/slice/userSlice";
import { deleteActiveUser } from "../../data/auth/slice/activeUserSlice";

const LinkItems = [
  {
    lable: "Dashboard",
    children: [
      { name: "Home", icon: FiHome, href:'/', accessType:"all" },
      { name: "Add Realestate", icon: BiMessageAltAdd, href:'/add-real-estate', accessType:"all" },
      { name: "Effectiveness Report", icon: FiSettings, href:'/effectiveness-report', accessType:"all" },
      { name: "User List", icon: BiUser, href:'/user-list', accessType:"admin" },
    ],
  },
  {
    lable: "Settings",
    children: [
      { name: "Country/City", icon: FiTrendingUp, href:'/country-city', accessType:"admin" },
      { name: "Realestate-Type", icon: BiAddToQueue, href:'/realestate-type', accessType:"admin" },
      { name: "Category/Brand", icon: BiAnalyse, href:'/category-brand', accessType:"admin" },
      { name: "Package", icon: FiPackage, href:'/package', accessType:"admin" },
      { name: "Asset", icon: MdOutlineAssuredWorkload, href:'/asset', accessType:"all" },
      { name: "MemberShip", icon: MdOutlineCardMembership, href:'/membership', accessType:"all" },
      { name: "Schedule Maintenance ", icon: MdOutlineCardMembership, href:'/schedule-maintenance', accessType:"all" },
    ],
  },
];

export default function Sidebar({ children }) {
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
  const user = useSelector((state)=> state.userData.user)
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
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
            item.children.map((link) =>{
              return (user?.user_type==='Admin'?<NavItem key={link.name} href={link.href} icon={link.icon}>
              {link.name}
            </NavItem>:link.accessType === 'all' && <NavItem key={link.name} href={link.href} icon={link.icon}>
                {link.name}
              </NavItem>)}
            )}
        </VStack>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Link
      to={href?href:'#'}
    >
      <Flex
        align="center"
        p="2"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  
  const router = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.userData.user)
  
  const handleLogout = () => {
    deletetUser()
    dispatch(deleteActiveUser())
    dispatch(deleteLoginUser())
    router('/login')
    
  };
  return (
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
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={user?.image}
                />
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
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>
                <Link to='/profile'>
                Profile
                </Link>
              </MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
