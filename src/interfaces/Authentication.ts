export interface ILogin {
  phone: string;
  password: string;
}
export interface ISignUp {
  fullname: string;
  phone: string;
  password: string;
}
export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}
