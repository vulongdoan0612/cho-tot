import { Button, Checkbox, Form, Input } from "antd";
import Image from "next/image";
import { FacebookIcon, GoogleIcon } from "@/components/CustomIcons";
import { useRouter } from "next/router";
import { requestLogin, requestSignUp } from "@/services/authentication";
import { ToastContainer, toast } from "react-toastify";
import CustomButton from "@/components/CustomButton";

const Register = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const dataSignUp = {
        fullname: values.fullname,
        phone: values.phone,
        password: values.password,
      };
      const response = await requestSignUp(dataSignUp);
      if (response.status === 201) {
        try {
          toast(response.data.message);
        } finally {
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        }
      } else if (response.status === 404) {
        console.log("Vui lòng đăng ký lại sau.");
      }
    } catch (error: any) {
      console.log("Vui lòng đăng ký lại sau.", error);
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return (
    <div className="login-wrapper">
      <ToastContainer></ToastContainer>

      <div className="modal-login">
        <div className="logo">
          <Image
            src="/images/logo-login.png"
            alt=""
            width={121}
            height={44}
          ></Image>
        </div>
        <h3>Đăng ký tài khoản</h3>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="fullname"
            className="fullname"
            rules={[{ required: true, message: "Vui lòng nhập Họ và Tên!" }]}
          >
            <Input placeholder="Họ và Tên" />
          </Form.Item>
          <Form.Item
            name="phone"
            className="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
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

          <Form.Item
            name="agreement"
            valuePropName="checked"
            className="check-agreement"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        new Error(
                          "Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật của Chợ Tốt."
                        )
                      ),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              <span>
                Bằng việc Đăng ký, bạn đã đọc và đồng ý với{" "}
                <a
                  href="https://trogiup.chotot.com/nguoi-ban/hoat-dong"
                  target="_blank"
                >
                  Điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a
                  href="https://trogiup.chotot.com/nguoi-ban/chinh-sach-bao-mat-cua-cho-tot"
                  target="_blank"
                >
                  Chính sách bảo mật
                </a>{" "}
                của Chợ Tốt
              </span>
            </Checkbox>
          </Form.Item>

          <Form.Item className="submit">
            <CustomButton type="submit">ĐĂNG KÝ</CustomButton>
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
          Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
        </p>
      </div>
      <div className="produce-by">
        <p>Được phát triển bởi</p>
        <div className="logo">
          <a href="https://www.chotot.com" target="_blank">
            <Image
              src="/images/chotot-logo-login.png"
              alt="Chotot Logo"
              width={55}
              height={20}
            />
          </a>
          <a href="https://www.nhatot.com" target="_blank">
            <Image
              src="/images/nhatot-logo-login.png"
              alt="Nhatot Logo"
              width={90}
              height={20}
            />
          </a>
          <a href="https://www.vieclamtot.com" target="_blank">
            <Image
              src="/images/vieclamtot-logo-login.png"
              alt="Vieclamtot Logo"
              width={68}
              height={20}
            />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Register;
