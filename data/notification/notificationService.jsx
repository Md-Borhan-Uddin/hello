
import { baseCreateAPI } from '../baseQuery';



// Define a service using a base URL and expected endpoint
export const notificationAPI = baseCreateAPI.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => {
        return {
          url:'/notification/',
        }
      },
    }),
   

  }),
})

export const { useGetNotificationQuery } = notificationAPI