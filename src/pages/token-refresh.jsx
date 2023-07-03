
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'
import { getUser, updateToken } from '@/utility/authentication'
import { baseUrl } from '@/utility/baseURL'
import { parseJwt } from '@/utility/utlity';

const TokenRefreshPage = () => {
  const router = useRouter();
  console.log('token refresh page')

  useEffect(() => {
    // Perform the token refresh logic here
    const {refresh_token} = getUser()
    const decoded = parseJwt(refresh_token)
    const refresh_token_expaire = new Date(decoded.exp*1000)
    const isExpaire = refresh_token_expaire < new Date()
    if(isExpaire){
        router.push('/account/login')
        console.log('refresh token expaire')
        return
    }
    axios.post(
      baseUrl.defaults.baseURL+"/refresh-token/",{"refresh":refresh_token}
      )
      .then(res=>{
        updateToken(res.data)
      })
      .catch(error=>console.log("fresh_token error",error))
    
    router.push('/dashboard');
    // router
  }, []);

  return null;
};

export default TokenRefreshPage;
