import { axios } from "@/utils/axios";

export const getConfig = async (accessToken: string) => {
  const config = {
    method: "GET",
    url: `/config`,
    headers: {
      Authorization: accessToken,
    },
  };
  return axios(config);
};
export const postPayment = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `payment-info`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
