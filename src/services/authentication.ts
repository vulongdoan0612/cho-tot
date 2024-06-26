import { IChangePassword, ILogin, ISignUp } from "@/interfaces/Authentication";
import { setAuthenticate } from "@/redux/reducers/auth";
import { axios } from "@/utils/axios";
import Cookies from "js-cookie";

export const requestLogin = async (data: ILogin) => {
  const config = {
    method: "POST",
    url: `/login`,
    data: data,
  };

  return axios(config);
};
export const requestSignUp = async (data: ISignUp) => {
  const config = {
    method: "POST",
    url: `/register`,
    data: data,
  };

  return axios(config);
};
export const changePassword = async (accessToken: string, data: IChangePassword) => {
  const config = {
    method: "PUT",
    url: `/change-password`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  };

  return axios(config);
};
export const logout = (dispatch: any) => {
  localStorage.removeItem("access_token");
  Cookies.remove("access_token");
  dispatch(setAuthenticate({ isAuthenticated: false, account: {}, loading: false }));
};
