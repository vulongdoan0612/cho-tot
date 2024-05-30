import { Form, Input, Spin } from "antd";
import Image from "next/image";
import { FacebookIcon, GoogleIcon } from "@/components/CustomIcons";
import { useRouter } from "next/router";
import { requestLogin } from "@/services/authentication";
import CustomButton from "@/components/CustomButton";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [spin, setSpin] = useState(false);

  const onFinish = async (values: any) => {
    setSpin(true);
    try {
      const dataLogin = {
        phone: values.phone,
        password: values.password,
      };
      const response = await requestLogin(dataLogin);
      if (response?.status === 200) {
        if (response?.data?.status) {
          setTimeout(() => {
            setSpin(false);
          }, 1000);
          setTimeout(() => {
            toast(response?.data?.message, { autoClose: 500 });
          }, 1001);

          if (response?.data?.status === "SUCCESS") {
            localStorage.setItem("access_token", response?.data?.token);
            Cookies.set("access_token", response?.data?.token, { expires: 3650, secure: true, sameSite: "strict" }); // Set cookie with security options

            setTimeout(() => {
              router.push("/");
            }, 1000);
          }
        }
      }
    } catch (error: any) {
      console.log("Sai mật khẩu hoặc tài khoản không tồn tại.", error);
    }
  };

  return (
    <div className={`login-wrapper ${spin ? "spinning" : ""}`}>
      <ToastContainer></ToastContainer>

      <div className="modal-login">
        <div className="logo">
          <Image src="/images/logo-login.png" alt="" width={121} height={44}></Image>
        </div>
        <h3>Đăng nhập</h3>
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item name="phone" className="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            name="password"
            hasFeedback
            className="password"
            dependencies={["password"]}
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password type="password" placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item className="forgot-password">
            <a className="login-form-forgot" href="">
              Quên mật khẩu
            </a>
          </Form.Item>

          <Form.Item className="submit">
            <CustomButton type="submit">ĐĂNG NHẬP</CustomButton>
          </Form.Item>
        </Form>
        <div className="line">
          <hr></hr>
          <span>Hoặc đăng nhập bằng</span>
          <hr></hr>
        </div>
        <div className="login-method">
          <button className="facebook">
            <FacebookIcon></FacebookIcon> <span>Facebook</span>
          </button>
          <button className="google">
            <GoogleIcon></GoogleIcon> <span>Google</span>
          </button>
        </div>
        <p className="register-account">
          Chưa có tài khoản? <Link href="/register">Đăng ký tài khoản mới</Link>
        </p>
      </div>
      <div className="produce-by">
        <p>Được phát triển bởi</p>
        <div className="logo">
          <a href="https://www.chotot.com" target="_blank">
            <Image src="/images/chotot-logo-login.png" alt="Chotot Logo" width={55} height={20} />
          </a>
          <a href="https://www.nhatot.com" target="_blank">
            <Image src="/images/nhatot-logo-login.png" alt="Nhatot Logo" width={90} height={20} />
          </a>
          <a href="https://www.vieclamtot.com" target="_blank">
            <Image src="/images/vieclamtot-logo-login.png" alt="Vieclamtot Logo" width={68} height={20} />
          </a>
        </div>
      </div>
      <Spin spinning={spin} fullscreen/>
    </div>
  );
};
export default Login;
