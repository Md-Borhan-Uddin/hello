import UserList from './pages/user-list'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/account/login'
import Registration from './pages/account/registration'
import DefaultLayout from './pages/DefaultLayout'
import Activate from './pages/activate'
import DashboardLayout from './pages/DashboardLayout'
import Dashboard from './pages/dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserQuery } from '../data/auth/service/userServide'
import { setLoginUser } from '../data/auth/slice/userSlice'
import { useEffect } from 'react'
import { getUser } from '../utility/authentication'
import AddState from './pages/add-real-estate'
import CategoryBrand from './pages/category-brand'
import CountryCity from './pages/country-city'
import Package from './pages/package'
import Assert from './pages/asset'
import Membership from './pages/membership'
import ScheduleMaintenance from './pages/schedule-maintenance'
import Profile from './pages/profile'
import Property from './pages/property-list/property'
import SingleProperty from './pages/property-list/single-property'
import { Flex, Spinner } from '@chakra-ui/react'



function App() {
  let access_token;
  const {token} = useSelector((state)=>state.activeUser)
  const user = useSelector((state)=>state.userData.user)
  if(token){
    access_token = token
  }
  else{
    access_token = getUser().access_token
  }
  


    const {data:activeUser, isSuccess, isLoading} = useGetUserQuery(access_token);
  
  // console.log("active", activeUser);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if(activeUser){
      dispatch(setLoginUser({user:activeUser}))
    }

  },[activeUser, isSuccess, isLoading])
  
  
  const pageContent = isLoading ? (
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
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />}/>
        <Route path='registration' element={<Registration />}/>
        <Route path='activate/:uid/:token' element={<Activate />} />
        <Route path='/add-real-estate' element={<AddState />} />
        <Route path='/property-list/:userType' element={<Property />} />
        <Route path='/property/:id/:title' element={<SingleProperty />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/category-brand' element={<CategoryBrand />} />
        <Route path='/country-city' element={<CountryCity />} />
        <Route path='/package' element={<Package />} />
        <Route path='/asset' element={<Assert />} />
        <Route path='/membership' element={<Membership />} />
        <Route path='/user-list' element={<UserList />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/schedule-maintenance' element={<ScheduleMaintenance />} />
      </Route>
    </Routes>
  )

  return pageContent
}

export default App
