import { axios } from "@/utils/axios";

export const getProfile = async (accessToken: string) => {
  const config = {
    method: "GET",
    url: `/get-profile`,
    headers: {
      Authorization: accessToken,
    },
  };
  return axios(config);
};
