import { axios } from "@/utils/axios";

export const PostFormSellCheck = async (accessToken: string, data: any) => {
  const config = {
    method: "post",
    url: `/post-form-sell-check`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
export const getPostCheck = async (accessToken: string, data: any) => {
  console.log(data);
  const config = {
    method: "POST",
    url: `/get-post-check`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
