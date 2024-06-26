import { Alert, Form, Input, Spin } from "antd";
import Image from "next/image";
import { FacebookIcon, GoogleIcon } from "@/components/CustomIcons";
import { useRouter } from "next/router";
import { requestLogin } from "@/services/authentication";
import CustomButton from "@/components/CustomButton";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import cookie from "cookie";
import Head from "next/head";

const Login = () => {
  const router = useRouter();
  const [spin, setSpin] = useState(false);
  const [alertAvatar, setAlertAvatar] = useState("");

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
          setSpin(false);
          toast(response?.data?.message, { autoClose: 500 });

          if (response?.data?.status === "SUCCESS") {
            localStorage.setItem("access_token", response?.data?.token);
            Cookies.set("access_token", response?.data?.token, { expires: 3650, secure: true, sameSite: "strict" });
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
  const handleUpgrade = () => {
    setAlertAvatar("Chức năng đang phát triển !");
    setTimeout(() => {
      setAlertAvatar("");
    }, 3000);
  };
  return (
    <div className={`login-wrapper ${spin ? "spinning" : ""}`}>
      <Head>
        <title>Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt - Chợ Tốt</title>
        <meta name="description" content="Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt - Chợ Tốt" />
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
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
            <span className="login-form-forgot" style={{ cursor: "pointer" }} onClick={handleUpgrade}>
              Quên mật khẩu
            </span>
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
          <button className="facebook" onClick={handleUpgrade} style={{ cursor: "pointer" }}>
            {" "}
            <FacebookIcon></FacebookIcon> <span>Facebook</span>
          </button>
          <button className="google" onClick={handleUpgrade} style={{ cursor: "pointer" }}>
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
      <Spin spinning={spin} fullscreen />
      <Alert message={alertAvatar} type="success" className={alertAvatar !== "" ? "show-alert" : ""} />
    </div>
  );
};
export const getServerSideProps = async (context: any) => {
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookies ? cookie.parse(cookies) : {};
  const token = parsedCookies["access_token"];

  if (token) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default Login;
