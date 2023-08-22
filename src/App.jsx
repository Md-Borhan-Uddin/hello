import UserList from './pages/user-list'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
import { checkIfTokenExpired, getUser } from '../utility/authentication'
import AddState from './pages/add-real-estate'
import CategoryBrand from './pages/category-brand'
import CountryCity from './pages/country-city'
import Package from './pages/package'
import Asset from './pages/asset'
import Membership from './pages/membership'
import ScheduleMaintenance from './pages/schedule-maintenance'
import Profile from './pages/profile'
import Property from './pages/property-list/property'
import SingleProperty from './pages/property-list/single-property'
import { Flex, Spinner } from '@chakra-ui/react'
import ForgetPassword from './pages/account/forget-password'
import PasswordConfirm from './pages/account/forget-password/password-confirm'
import RealestateType from './pages/realestate-type'
import EffectivReport from './pages/effectiveness-report'
import Assets from './pages/assets'
import { useGetNotificationQuery } from '../data/notification/notificationService'
import { setNotification } from '../data/notification/notificationSlice'
import { setActiveUser } from '../data/auth/slice/activeUserSlice'

import RequestSearch from './pages/requestSearch'
import About from './pages/about'
import Team from './pages/team'
import TramsCondition from './pages/tramsCondition'
import Privacy from './pages/privice'
import MishonAndVishon from './pages/mishon'
import Contact from './pages/contact'




function App() {
  let access_token;
  const {token} = useSelector((state)=>state.activeUser)
  const isTokenExpired = checkIfTokenExpired(token);
  // console.log(isTokenExpired)
  if(token && !isTokenExpired){
    access_token = token
  }
  else{
    const isTokenExpired = checkIfTokenExpired(getUser().access_token);
    if(isTokenExpired){
      access_token = getUser().refresh_token
    }
    else{

      access_token = getUser().access_token
    }
  }
  

  

  const {data:activeUser, isSuccess:userSuccess, isLoading:loading} = useGetUserQuery(access_token);
  const {data:notification, isSuccess:notifiSuccess, isLoading} = useGetNotificationQuery()
 
  const router = useNavigate();
  

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNotification({notification}))
      if(activeUser){
        dispatch(setLoginUser({user:activeUser}))
        dispatch(setActiveUser({user:activeUser}))
      }

  },[notifiSuccess, userSuccess])
  
  
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
        <Route path='/login' element={<Login />}/>
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/registration' element={<Registration />}/>
        <Route path='/activate/:uid/:token' element={<Activate />} />
        <Route path='/property-list/:userType' element={<Property />} />
        <Route path='/property' element={<SingleProperty />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/password-reset/:uid/:token' element={<PasswordConfirm />} />
        <Route path='/about' element={<About />} />
        <Route path='/team' element={<Team />} />
        <Route path='/mission-and-vision' element={<MishonAndVishon />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/terms-and-conditions' element={<TramsCondition />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path='/request-search' element={<RequestSearch />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/category-brand' element={<CategoryBrand />} />
        <Route path='/country-city' element={<CountryCity />} />
        <Route path='/package' element={<Package />} />
        <Route path='/asset' element={<Asset />} />
        <Route path='/membership' element={<Membership />} />
        <Route path='/user-list' element={<UserList />}/>
        <Route path='/realestate-type' element={<RealestateType />} />
        <Route path='/add-assets' element={<Assets />} />
        <Route path='/add-real-estate' element={<AddState />} />
        <Route path='/effectiveness-report' element={<EffectivReport />} />
        <Route path='/schedule-maintenance' element={<ScheduleMaintenance />} />
      </Route>
    </Routes>
  )

  return pageContent
}

export default App
