import DashboardLayout from "../DashboardLayout";
import CustomChart from "../../../components/DashboardChart";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import {
  Box,
  Flex,
  HStack,
  Input,
  Select,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Pie, Bar } from "react-chartjs-2";
import { getUser } from "../../../utility/authentication";
import { useEffect, useState } from "react";
import { baseURL } from "../../../utility/baseURL";
// import RequireAuth from "../../../components/auth/TokenExpaireCheck";
import { useGetUserQuery } from "../../../data/auth/service/userServide";
import { useDispatch } from "react-redux";
import { setLoginUser } from "../../../data/auth/slice/userSlice";
import {useGetRealestateQuery} from "../../../data/auth/service/realestateService"
import RequireAuth from "../../../components/auth/TokenExpaireCheck";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export const membershipData = {
  labels: [
    "Totol Number of Regular user",
    "Total Number of Active Paid MemberShip",
  ],
  datasets: [
    {
      label: "Number of User",
      data: [12, 19],
      backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};
const labels = [
  "Bangladesh",
  "India",
  "USA",
  "UK",
  "Bangladesh",
  "India",
  "USA",
  "UK",
];

export const realeasteddata = {
  labels,
  datasets: [
    {
      label: "",
      data: [12, 34, 12, 334, 45, 323, 45, 667],
      backgroundColor: "rgba(54, 162, 235, 1)",
    },
  ],
};

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [usertype, setUsertype] = useState("");
  const [changeUser, setChangeUser] = useState("");
  const { userType, access_token } = getUser();
  const [inactiveMembership, setInactiveMembership] = useState([]);
  const [activeMembership, setActiveMembership] = useState([]);
  const headers = {
    Authorization: "Bearer " + String(access_token), //the token is a variable which holds the token
  };
  // console.log('changeUser',changeUser)
  const {data:realestateCount, isSuccess:realestateIsSuccess} = useGetRealestateQuery()
  
  
  const countryName = []
  const countryNumber = []
  const cityName = []
  const cityNumber = []
  const typeName = []
  const typeNumber = []
  
  
  const {data:activeUser, isSuccess, isLoading} = useGetUserQuery(access_token);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if(realestateIsSuccess){
      
      const country = realestateCount.country
      const city = realestateCount.city
      const type = realestateCount.type
      const name = []
      const total = []
      
      country.map((item)=> {
        countryName.push(item.country)
        countryNumber.push(item.totalnumber)
      })
      type.map((item)=>{
        typeName.push(item.type)
        typeNumber.push(item.totalnumber)
      })

      city.map((item)=>{
        cityName.push(item.city)
        cityNumber.push(item.totalnumber)
      })
    }
    setUsertype(userType);
    dispatch(setLoginUser({user:activeUser}))

    fetch(baseURL + "/membership/", { headers: headers })
      .then((res) => res.json())
      .then((data) => {
        const activeObject = data.filter((item)=>new Date(item.expire_date)>new Date())
        const inactiveObject = data.filter((item)=>new Date(item.expire_date)>new Date())
        
        setActiveMembership(activeObject)
        setInactiveMembership(inactiveObject)
      })
      .catch((error) => {
        console.log(error);
      });

    if (userType === "Admin") {
      fetch(baseURL + "/all-user/", { headers: headers })
        .then((res) => res.json())
        .then((data) => {
          let u = [];
          data.results.map((item) =>
            u.push({ key: item.username, value: item.id.toString() })
          );
          setUsers(u);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [changeUser, realestateCount, activeUser]);
  const handleChange = (e) => {
    const { value } = e.target;
    

    setChangeUser(value);
  };

  const numberOfUser = {
    labels: [
      "Totol Number of Regular user",
      "Total Number of Active Paid MemberShip",
    ],
    datasets: [
      {
        label: "Number of User",
        data: [users.length, activeMembership.length],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const countryOffRealestate = {
    labels : countryName,
    datasets: [
      {
        label: "Number Of Registered Realestate Base On Country",
        data: countryNumber,
        backgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  }

  const cityOffRealestate = {
    labels : cityName,
    datasets: [
      {
        label: "Number Of Registered Realestate Base On City",
        data: cityNumber,
        backgroundColor: "rgba(54, 162, 235, 1)",
      },
    ],
  }

  const numberOfMembership = {
    labels: [
      "Total Number of Active Paid MemberShip",
      "Total Number of Inactive Paid MemberShip",
    ],
    datasets: [
      {
        label: "Number of User",
        data: [activeMembership.length, inactiveMembership.length],
        backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pageContent = isLoading ?(
    <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="secondary.200"
        color="primary.500"
        size="xl"
      />
    </Flex>
  ) :(
    <div className="">
      <div className="">
        {usertype === "Admin" && (
          <div className="pb-4 bg-white dark:bg-gray-900">
            <Box padding={4} bg={"inherit"}>
              <Text margin={2}>Select User For See Dashboard</Text>
              <Select
                placeholder="Select User"
                w={"50%"}
                mb={"2rem"}
                onChange={handleChange}
              >
                {users.map((name, i) => (
                  <option value={name.value} key={i}>
                    {name.key}
                  </option>
                ))}
              </Select>
            </Box>
          </div>
        )}
        {usertype === "Admin" ? (
          <div>
            <Flex justifyContent={"space-between"}>
              <Box w={"40%"}>
                <CustomChart ChartType={<Pie data={numberOfUser} />} />
              </Box>
              <Box w={"40%"}>
                <CustomChart ChartType={<Pie data={numberOfMembership} />} />
              </Box>
            </Flex>
            <HStack gap={"1rem"} mt={"2rem"}>
              <CustomChart ChartType={<Bar data={countryOffRealestate} />} />
              <CustomChart ChartType={<Bar data={cityOffRealestate} />} />
            </HStack>
            <HStack gap={"1rem"} mt={"2rem"}>
              <CustomChart ChartType={<Bar data={realeasteddata} />} />
              
            </HStack>
          </div>
        ) : (
          <div>
            <Flex justifyContent={"space-between"}>
              <Box w={"40%"}>
                <CustomChart ChartType={<Pie data={numberOfMembership} />} />
              </Box>
            </Flex>
            <HStack gap={"1rem"} mt={"2rem"}>
              <CustomChart ChartType={<Bar data={countryOffRealestate} />} />
              <CustomChart ChartType={<Bar data={cityOffRealestate} />} />
            </HStack>
          </div>
        )}
      </div>
    </div>
  );

  return pageContent
}

export default RequireAuth(Dashboard);
