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

export const getDetailProfileUser = async (data: any) => {
  const config = {
    method: "POST",
    url: `/get-detail-profile-user`,
    data: data,
  };
  return axios(config);
};
export const getAnnounceChat = async (accessToken: string) => {
  const config = {
    method: "POST",
    url: `/get-announce-chat`,
    headers: {
      Authorization: accessToken,
    },
  };
  return axios(config);
};
