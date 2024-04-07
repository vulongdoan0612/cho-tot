import { ILogin, ISignUp } from "@/interfaces/Authentication";
import { setAuthenticate } from "@/redux/reducers/auth";
import { axios } from "@/utils/axios";

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
export const logout = (dispatch: any) => {
  localStorage.removeItem("access_token");

  dispatch(
    setAuthenticate({ isAuthenticated: false, account: {}, loading: false })
  );
};
