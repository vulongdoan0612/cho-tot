import { Breadcrumb } from "antd";
import Page from "./Page";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMemo } from "react";
interface PropsPage {
  loadingData?: boolean;
  children: React.ReactNode;
  style?: any;
}
const Setting = (props: PropsPage) => {
  const { loadingData, children, style } = props;
  const page = useMemo(() => {
    return <>{children}</>;
  }, [loadingData, children]);
  const { account } = useSelector((state: RootState) => state.auth);

  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      <div className="user-wrapper">
        {" "}
        <Breadcrumb
          className="breadcrumb-user-page"
          separator=">"
          items={[
            {
              title: "Chợ tốt",
            },
            {
              title: `Trang cá nhân của ${account?.user?.fullname}`,
            },
            {
              title: "Thông tin cá nhân",
            },
          ]}
        />
        <span className="title">Thông tin cá nhân</span>
        <div className="container">
          <div className="left">
            <div className="left-content">
              <ul>
                <li>Thông tin cá nhân</li>
                <li>Liên kết mạng xã hội</li>
                <li>Cài đặt tài khoản</li>
                <li>Quản lý lịch sử đăng nhập</li>
              </ul>
            </div>
          </div>
          <div className="right">
            <div className="right-content">{page}</div>
          </div>
        </div>
      </div>
      ;
    </Page>
  );
};
export default Setting;
