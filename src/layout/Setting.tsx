import { Breadcrumb } from "antd";
import Page from "./Page";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
interface PropsPage {
  loadingData?: boolean;
  children: React.ReactNode;
  style?: any;
  title?: string;
  active?: string;
  removeAccount?: boolean;
}
const Setting = (props: PropsPage) => {
  const { loadingData, children, style, title, active, removeAccount } = props;
  const router = useRouter();

  const page = useMemo(() => {
    return <>{children}</>;
  }, [loadingData, children]);
  const { account } = useSelector((state: RootState) => state.auth);

  return (
    <div className="user-wrapper">
      {" "}
      <Breadcrumb
        className="breadcrumb-user-page"
        separator=">"
        items={[
          {
            title: "Chợ tốt",
            onClick: () => {
              router.push(`/`);
            },
          },
          {
            title: `Trang cá nhân của ${account?.user?.fullname}`,
          },
          {
            title: "Thông tin cá nhân",
          },
        ]}
      />
      <span className="title">{title}</span>
      <div className="container">
        <div className="left">
          <div className="left-content">
            <ul>
              <Link href="/user/settings/profile">
                <li className={`${active === "1" ? "bold" : ""}`}>Thông tin cá nhân</li>
              </Link>
              <li>Liên kết mạng xã hội</li>
              <Link href="/user/settings/account">
                <li className={`${active === "3" ? "bold" : ""}`}>Cài đặt tài khoản</li>
              </Link>
              <li>Quản lý lịch sử đăng nhập</li>
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="right-content">{page}</div>
          {removeAccount ? <span>Yêu cầu chấm dứt tài khoản</span> : <></>}
        </div>
      </div>
    </div>
  );
};
export default Setting;
