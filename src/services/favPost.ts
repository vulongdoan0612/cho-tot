import { axios } from "@/utils/axios";

export const addFavPost = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/add-fav-post`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
export const checkFavPost = async (accessToken: string, postId: any) => {
  console.log(postId);
  const config = {
    method: "POST",
    url: "/check-fav-post",
    headers: {
      Authorization: accessToken,
    },
    data: postId,
  };
  return axios(config);
};
export const removeFavPost = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/remove-fav-post`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
export const getFavPost = async (accessToken: string) => {
  const config = {
    method: "POST",
    url: `/get-fav-post`,
    headers: {
      Authorization: accessToken,
    },
  };
  return axios(config);
};
export const getFavPostMain = async (accessToken: string) => {
  const config = {
    method: "POST",
    url: `/get-fav-post-main`,
    headers: {
      Authorization: accessToken,
    },
  };
  return axios(config);
};
