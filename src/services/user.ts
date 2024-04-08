import { axios } from "@/utils/axios";

export const changeProfile = async (accessToken: string, data: any) => {
  const config = {
    method: "put",
    url: `/change-profile`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};

