import { Breadcrumb, Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMemo, useState } from "react";
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
  const { children, title, active, removeAccount } = props;
  const router = useRouter();
  const [spin, setSpin] = useState<any>(false);
  const { account } = useSelector((state: RootState) => state.auth);

  const page = useMemo(() => {
    return <>{children}</>;
  }, [children]);
  const handleRouterChat = (pathname: string) => {
    if (router?.pathname !== pathname) {
      setSpin(true);
    }
    router.push(pathname);
  };
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
            title: `Trang cá nhân của ${account?.user?.fullname !== undefined ? account?.user?.fullname : "..."}`,
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
              <div onClick={() => handleRouterChat("/user/settings/profile")} style={{ cursor: "pointer" }}>
                <li className={`${active === "1" ? "bold" : ""}`}>Thông tin cá nhân</li>
              </div>
              <div onClick={() => handleRouterChat("/user/settings/account")} style={{ cursor: "pointer" }}>
                <li className={`${active === "3" ? "bold" : ""}`}>Cài đặt tài khoản</li>
              </div>
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="right-content">{page}</div>
          {/* {removeAccount ? <span>Yêu cầu chấm dứt tài khoản</span> : <></>} */}
        </div>
      </div>
      <Spin spinning={spin} fullscreen></Spin>
    </div>
  );
};
export default Setting;
