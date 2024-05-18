import { axios } from "@/utils/axios";

export const getConversation = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/get-conversation`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
export const getConversationSummary = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/get-all-conversation-summary`,
    headers: {
      Authorization: accessToken,
    },
    data,
  };
  return axios(config);
};
export const postMessage = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/post-message`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
export const hiddenMessage = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/set-hidden`,
    headers: {
      Authorization: accessToken,
    },
    data,
  };
  return axios(config);
};
export const hiddenFalseMessage = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/set-hidden-false`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
export const createConversation = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/create-room`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
export const getAllConversation = async (accessToken: string, data: any) => {
  const config = {
    method: "POST",
    url: `/get-all-conversation`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };
  return axios(config);
};
