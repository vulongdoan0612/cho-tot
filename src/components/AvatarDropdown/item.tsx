import { Avatar, Image, Spin } from "antd";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/services/authentication";
import { useRouter } from "next/router";
const DropdownList = ({ setSpin, spin }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.auth);

  const handleLogOut = () => {
    router.push("/");
    logout(dispatch);
  };
  const handleRouterChat = (pathname: string) => {
    if (router?.pathname !== pathname) {
      setSpin(true);
    }
    router.push(pathname);
  };
  return (
    <div className="avatar-dropdown-header">
      {account?.user ? (
        <Link href={`/user/${account?.user?._id}`}>
          <div className="user-info">
            <div className="avatar">
              <Avatar
                src={
                  account?.user && account?.user?.avatar !== null ? (
                    <Image src={account?.user?.avatar} width={50} height={50} preview={false} alt=""></Image>
                  ) : (
                    <Image src="/images/empty-avatar.jpg" width={50} height={50} preview={false} alt=""></Image>
                  )
                }
              />
            </div>
            <div className="right">
              <div className="name">{account?.user?.fullname}</div>
              {/* <div className="rate">
                <span className="rate-number">2</span>
                <Rate disabled defaultValue={2} character={<StarIcon></StarIcon>} />
                <span className="text">Chưa có người đánh giá</span>
              </div>
              <hr></hr>
              <div className="follower">
                <span>0 Người theo dõi</span>
                <span className="line"></span>
                <span>0 Đang theo dõi</span>
              </div> */}
            </div>
          </div>
        </Link>
      ) : (
        <div className="sign-in">
          <span className="avatar"></span>
          <span className="text">
            <Link href="/login">Đăng nhập</Link> / <Link href="/register">Đăng ký</Link>
          </span>
        </div>
      )}
      {account?.user ? (
        <>
          <div className="extension">
            <div className="header">
              <span>Tiện ích</span>
            </div>
            <div className="container">
              <div onClick={() => handleRouterChat("/bookmark/tin-dang-da-luu")} style={{ cursor: "pointer", padding: "8px 12px" }}>
                <span className="post-save">
                  <Image preview={false} src="/icons/menu-saved-ad.svg" alt="" width={24} height={24}></Image>
                  <span>Tin đăng đã lưu</span>{" "}
                </span>
              </div>
              {/* <span className="search-save">
              <Image preview={false} src="/icons/menu-saved-search.svg" alt="" width={24} height={24}></Image>
              <span>Tìm kiếm đã lưu</span>{" "}
            </span> */}
            </div>
          </div>
          <div className="service-fee">
            <div className="header">
              <span>Dịch vụ trả phí</span>
            </div>
            <div className="container">
              <div onClick={() => handleRouterChat("/history")} style={{ cursor: "pointer", paddingTop: "8px", paddingBottom: "8px" }}>
                <span className="history">
                  {" "}
                  <Image
                    preview={false}
                    src="https://st.chotot.com/storage/chotot-icons/svg/circle-list.svg"
                    alt=""
                    width={24}
                    height={24}
                  ></Image>
                  <span>Lịch sử giao dịch</span>{" "}
                </span>
              </div>
            </div>
          </div>

          <div className="service-fee">
            <div className="header">
              <span>Khác</span>
            </div>
            <div className="container">
              <div
                onClick={() => handleRouterChat("/user/settings/profile")}
                style={{ cursor: "pointer", paddingTop: "8px", paddingBottom: "8px" }}
              >
                <span className="dongtot">
                  {" "}
                  <Image
                    preview={false}
                    src="https://static.chotot.com/storage/icons/svg/setting.svg"
                    alt=""
                    width={24}
                    height={24}
                  ></Image>
                  <span>Cài đặt tài khoản</span>{" "}
                </span>
              </div>
              <span className="history" onClick={handleLogOut}>
                {" "}
                <Image preview={false} src="https://static.chotot.com/storage/icons/svg/logout.svg" alt="" width={24} height={24}></Image>
                <span>Đăng xuất</span>{" "}
              </span>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default DropdownList;
