import { baseCreateAPI } from "../../baseQuery";

// const {access_token} = getUser()
export const userAPI = baseCreateAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (access_token) => {
        return {
          url: "/user/",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
  }),
});

export const { useGetUserQuery } = userAPI;
