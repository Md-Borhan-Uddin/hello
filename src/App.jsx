import { useGetNotificationQuery } from '../data/notification/notificationService'
import { setNotification } from '../data/notification/notificationSlice'
import { setActiveUser } from '../data/auth/slice/activeUserSlice'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useGetUserQuery } from '../data/auth/service/userServide'
import { useEffect } from 'react'
import { getUser } from '../utility/authentication'
import { Flex, Spinner } from '@chakra-ui/react'
import React, {Suspense} from 'react'

const UserList = React.lazy(()=>import('./pages/user-list'))
const Home = React.lazy(()=>import('./pages/home'))
const Login = React.lazy(()=>import('./pages/account/login'))

const Registration = React.lazy(()=>import('./pages/account/registration'))
const DefaultLayout = React.lazy(()=>import('./pages/DefaultLayout'))
const Activate = React.lazy(()=>import('./pages/activate'))
const DashboardLayout = React.lazy(()=>import('./pages/DashboardLayout'))
const Dashboard = React.lazy(()=>import('./pages/dashboard'))
const AddState = React.lazy(()=>import('./pages/add-real-estate'))
const CategoryBrand = React.lazy(()=>import('./pages/category-brand'))
const CountryCity = React.lazy(()=>import('./pages/country-city'))
const Package = React.lazy(()=>import('./pages/package'))
const Asset = React.lazy(()=>import('./pages/asset'))
const Membership = React.lazy(()=>import('./pages/membership'))
const ScheduleMaintenance = React.lazy(()=>import('./pages/schedule-maintenance'))
const Profile = React.lazy(()=>import('./pages/profile'))
const Property = React.lazy(()=>import('./pages/property-list/property'))
const SingleProperty = React.lazy(()=>import('./pages/property-list/single-property'))
const ForgetPassword = React.lazy(()=>import('./pages/account/forget-password'))
const PasswordConfirm = React.lazy(()=>import('./pages/account/forget-password/password-confirm'))
const RealestateType = React.lazy(()=>import('./pages/realestate-type'))
const EffectivReport = React.lazy(()=>import('./pages/effectiveness-report'))
const Assets = React.lazy(()=>import('./pages/assets'))

const RequestSearch = React.lazy(()=>import('./pages/requestSearch'))
const About = React.lazy(()=>import('./pages/about'))
const Team = React.lazy(()=>import('./pages/team'))
const TramsCondition = React.lazy(()=>import('./pages/tramsCondition'))
const Privacy = React.lazy(()=>import('./pages/privice'))
const MishonAndVishon = React.lazy(()=>import('./pages/mishon'))
const Contact = React.lazy(()=>import('./pages/contact'))




function App() {

  const {access_token} = getUser()
  const dispatch = useDispatch();
  const {data:activeUser, isSuccess:userSuccess, isLoading} = useGetUserQuery(access_token);
  const {data:notification, isSuccess:notifiSuccess} = useGetNotificationQuery()

  useEffect(()=>{
      dispatch(setNotification({notification}))
      dispatch(setActiveUser({token:access_token,user:activeUser}))
   
  },[notifiSuccess, userSuccess])
  
  return (
    <Suspense fallback={<LoadingSpiner />}>
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
    </Suspense>
  )

  // return pageContent
}

export default App



const LoadingSpiner = ()=>{
  return (
    <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="secondary.200"
        color="primary.500"
        size="xl"
      />
    </Flex>
  )
}
