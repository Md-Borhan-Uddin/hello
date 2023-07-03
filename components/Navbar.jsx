import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { deletetUser, getUser } from "../utility/authentication";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { deleteActiveUser } from "../data/auth/slice/activeUserSlice";

export default function WithSubnavigation() {
  const [user, setUser] = useState("");
  const router = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { isOpen:isOpenMobile, onClose:onCloseMobile, onOpen:onOpenMobile } = useDisclosure();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const { userType, access_token } = getUser();
    setUser(userType);
    if (access_token) {
      setIsAuthenticated(true);
    }
  }, []);

  const dispatch = useDispatch()
  const activeUser = useSelector((state)=> state.userData.user)
  
  const handleLogout = () => {
    deletetUser()
    dispatch(deleteActiveUser())
    router('/login')
    
  };

  const NAV_ITEMS = [
    {
      label: "Listing",
      // children: [
      //   {
      //     label: 'Job Board',
      //     subLabel: 'Find your dream design job',
      //     to: '#',
      //   },
      //   {
      //     label: 'Freelance Projects',
      //     subLabel: 'An exclusive list for contract work',
      //     to: '#',
      //   },
      // ],
      to: `/property-list/${user}`,
    },
    {
      label: "Home",
      to: "/",
    },
    // {
    //   label: "Dashboard",
    //   to: "/dashboard",
    // },
  ];
  return (
    <nav className="bg-white border-b-2 border-[rgb(38,220,118)]  dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-2 px-4">
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            className="h-8 mr-3"
            alt="daimn Logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="flex items-center md:order-2">
          {isAuthenticated?<button
            type="button"
            className="flex relative mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            onClick={isOpen ? onClose : onOpen}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={activeUser?.image}
              alt="user photo"
              width={100}
              height={100}
            />

            {isOpen ? (
              <div
                className="z-50 absolute top-5 left-[-300%] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {`${activeUser.first_name} ${activeUser.last_name}`}
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-left text-base text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-left text-base text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}
          </button>:
          <Flex gap={'0.5rem'}>
            <Link to="/login" className="w-full text-white cursor-pointer bg-[rgb(38,220,118)] hover:bg-[rgb(38,220,118)] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</Link>
            <Link to="/registration" className="w-full text-white font-semibold cursor-pointer bg-[rgb(1,22,39)] hover:bg-[rgb(11,38,61)] rounded-lg text-sm px-5 py-2.5 text-center">Register</Link>
          </Flex>
        }

          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            onClick={isOpenMobile ? onCloseMobile : onOpenMobile}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div
          className={isOpenMobile?"items-center justify-between w-full md:flex md:w-auto md:order-1":"items-center justify-between hidden w-full md:flex md:w-auto md:order-1"}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {NAV_ITEMS.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.to ? item.to : "#"}
                  className="block px-4 py-2 text-base text-gray-700 transition-colors active:text-[rgb(38,220,118)] hover:text-[rgb(38,220,118)] dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
