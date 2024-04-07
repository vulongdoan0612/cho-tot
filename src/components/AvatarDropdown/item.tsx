import { Avatar, MenuProps, Rate, Skeleton, Space } from "antd";
import { ArrowIcon, StarIcon } from "../CustomIcons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { limitText } from "@/utils/limitText";
import { logout } from "@/services/authentication";
import { useRouter } from "next/router";
import { isObjectLike, isUndefined } from "lodash";
const DropdownList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isAuthenticated, account } = useSelector(
    (state: RootState) => state.auth
  );
  const handleLogOut = () => {
    router.push("/");
    logout(dispatch);
  };
  console.log(isAuthenticated);
  return (
    <div className="avatar-dropdown-header">
      {isAuthenticated ? (
        <div className="user-info">
          <div className="avatar">
            <Avatar
              src={
                <Image
                  src="/images/vu01.png"
                  alt="avatar"
                  width={100}
                  height={100}
                />
              }
            />
          </div>
          <div className="right">
            <div className="name">{account?.user?.fullname}</div>
            <div className="rate">
              <span className="rate-number">2</span>
              <Rate
                disabled
                defaultValue={2}
                character={<StarIcon></StarIcon>}
              />
              <span className="text">Chưa có người đánh giá</span>
            </div>
            <hr></hr>
            <div className="follower">
              <span>0 Người theo dõi</span>
              <span className="line"></span>
              <span>0 Đang theo dõi</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="sign-in">
          <Link href="/login">
            <span className="avatar"></span>
            <span className="text">Đăng nhập / Đăng ký</span>
          </Link>
        </div>
      )}

      <div className="manage-bill">
        <div className="header">
          <span>Quản lý đơn hàng</span>
        </div>
        <div className="container">
          <span className="buy">
            <Image
              src="https://static.chotot.com/storage/chotot-icons/svg/escrow_buy_orders.svg"
              width={24}
              height={24}
              alt=""
            ></Image>
            <span>Đơn mua</span>
          </span>
          <span className="sell">
            {" "}
            <Image
              src="https://static.chotot.com/storage/chotot-icons/svg/escrow-orders.svg"
              width={24}
              height={24}
              alt=""
            ></Image>
            <span>Đơn bán</span>
          </span>
        </div>
      </div>
      <div className="extension">
        <div className="header">
          <span>Tiện ích</span>
        </div>
        <div className="container">
          <span className="post-save">
            <Image
              src="https://static.chotot.com/storage/chotot-icons/svg/menu-saved-ad.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Tin đăng đã lưu</span>{" "}
          </span>
          <span className="search-save">
            <Image
              src="https://static.chotot.com/storage/chotot-icons/svg/menu-saved-search.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Tìm kiếm đã lưu</span>{" "}
          </span>
        </div>
      </div>
      <div className="service-fee">
        <div className="header">
          <span>Dịch vụ trả phí</span>
        </div>
        <div className="container">
          <span className="dongtot">
            {" "}
            <Image
              src="https://static.chotot.com/storage/chotot-icons/svg/ct-coin.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Đồng tốt</span>{" "}
          </span>
          <span className="history">
            {" "}
            <Image
              src="https://st.chotot.com/storage/chotot-icons/svg/circle-list.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Lịch sử giao dịch</span>{" "}
          </span>
        </div>
      </div>
      <div className="service-fee">
        <div className="header">
          <span>Dịch vụ trả phí</span>
        </div>
        <div className="container">
          <span className="dongtot">
            {" "}
            <Image
              src="https://static.chotot.com/storage/chotot-icons/svg/ct-coin.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Đồng tốt</span>{" "}
          </span>
          <span className="history">
            {" "}
            <Image
              src="https://st.chotot.com/storage/chotot-icons/svg/circle-list.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Lịch sử giao dịch</span>{" "}
          </span>
        </div>
      </div>
      <div className="service-fee">
        <div className="header">
          <span>Dịch vụ trả phí</span>
        </div>
        <div className="container">
          <span className="dongtot">
            {" "}
            <Image
              src="https://static.chotot.com/storage/chotot-icons/svg/ct-coin.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Đồng tốt</span>{" "}
          </span>
          <span className="history">
            {" "}
            <Image
              src="https://st.chotot.com/storage/chotot-icons/svg/circle-list.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Lịch sử giao dịch</span>{" "}
          </span>
        </div>
      </div>
      <div className="service-fee">
        <div className="header">
          <span>Dịch vụ trả phí</span>
        </div>
        <div className="container">
          <span className="dongtot">
            {" "}
            <Image
              src="https://static.chotot.com/storage/chotot-icons/svg/ct-coin.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Đồng tốt</span>{" "}
          </span>
          <span className="history">
            {" "}
            <Image
              src="https://st.chotot.com/storage/chotot-icons/svg/circle-list.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Lịch sử giao dịch</span>{" "}
          </span>
        </div>
      </div>
      <div className="service-fee">
        <div className="header">
          <span>Khác</span>
        </div>
        <div className="container">
          <span className="dongtot">
            {" "}
            <a href="/user">
              <Image
                src="https://static.chotot.com/storage/icons/svg/setting.svg"
                alt=""
                width={24}
                height={24}
              ></Image>
              <span>Cài đặt tài khoản</span>{" "}
            </a>
          </span>
          <span className="history" onClick={handleLogOut}>
            {" "}
            <Image
              src="https://static.chotot.com/storage/icons/svg/logout.svg"
              alt=""
              width={24}
              height={24}
            ></Image>
            <span>Đăng xuất</span>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
export default DropdownList;
