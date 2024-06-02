import CustomButton from "@/components/CustomButton";
import ModalSuccessChangePassword from "@/components/Modal/ModalSuccessChangePassword";
import Page from "@/layout/Page";
import Setting from "@/layout/Setting";
import { changePassword, logout } from "@/services/authentication";
import { TextField } from "@mui/material";
import { Skeleton } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import cookie from "cookie";

const Account = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalSucces, setModalSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  const handleChangeConfirmPassword = (event: any) => {
    setConfirmPassword(event.target.value);
  };

  const handleChange = (event: any) => {
    setCurrentPassword(event.target.value);
  };

  const handleChangeNewPassword = (event: any) => {
    setNewPassword(event.target.value);
  };

  const updatePassword = async () => {
    const token = localStorage.getItem("access_token");
    try {
      if (token) {
        const updatePassword = {
          currentPassword: currentPassword,
          newPassword: newPassword,
        };
        const response = await changePassword(String(token), updatePassword);
        if (response.status === 200) {
          toast(response.data.message);
          if (response.data.success) {
            setModalSuccess(true);
          }
        }
      }
    } catch {
      console.log("error");
    }
  };

  const handleCancleModalPassowrd = () => {
    setModalSuccess(false);
  };

  const onFinishPassword = () => {
    setModalSuccess(false);
    router.push("/");
    logout(dispatch);
  };

  return (
    <Page
      style={{ backgroundColor: "#f4f4f4" }}
      title="Chợ Tốt Xe Official Mall - Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt"
    >
      <Setting title="Cài đặt tài khoản" active="3" removeAccount={true}>
        <div className="title">
          <span>Thay đổi mật khẩu</span>
        </div>
        <div className="currentPassword input-need-to-custom">
          {loading ? (
            <Skeleton.Input block={true} active size="large"></Skeleton.Input>
          ) : (
            <TextField
              required
              className="current"
              id="filled-multiline-flexible"
              label="Mật khẩu hiện tại"
              multiline
              onChange={handleChange}
              value={currentPassword}
              maxRows={4}
              variant="filled"
            />
          )}
        </div>
        <div className="newPassword input-need-to-custom">
          {loading ? (
            <Skeleton.Input block={true} active size="large"></Skeleton.Input>
          ) : (
            <TextField
              required
              className="new"
              id="filled-multiline-flexible"
              label="Mật khẩu mới"
              multiline
              onChange={handleChangeNewPassword}
              value={newPassword}
              maxRows={4}
              variant="filled"
            />
          )}
        </div>
        <div className="confirmPassword input-need-to-custom">
          {loading ? (
            <Skeleton.Input block={true} active size="large"></Skeleton.Input>
          ) : (
            <TextField
              required
              className="confirm"
              id="filled-multiline-flexible"
              label="Xác nhận mật khẩu mới"
              multiline
              onChange={handleChangeConfirmPassword}
              value={confirmPassword}
              maxRows={4}
              variant="filled"
            />
          )}
        </div>
        <CustomButton type="submit" className="save-change change-password" onClick={updatePassword}>
          Đổi mật khẩu
        </CustomButton>
      </Setting>
      <ModalSuccessChangePassword
        modalPassword={modalSucces}
        handleCancleModalPassword={handleCancleModalPassowrd}
        onFinishPassword={onFinishPassword}
      ></ModalSuccessChangePassword>
    </Page>
  );
};
export const getServerSideProps = async (context: any) => {
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookies ? cookie.parse(cookies) : {};
  const token = parsedCookies["access_token"];

  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default Account;
