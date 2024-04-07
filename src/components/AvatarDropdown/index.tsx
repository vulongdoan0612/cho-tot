import { Avatar, Dropdown, MenuProps, Rate, Skeleton, Space } from "antd";
import { ArrowIcon, StarIcon, UserAvatarIcon } from "../CustomIcons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { limitText } from "@/utils/limitText";
import DropdownList from "./item";

const AvatarDropdown = () => {
  const { account, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const items: MenuProps["items"] = [
    {
      key: "1",
      className: "avatar-dropdown-header-wrapper",
      label: <DropdownList></DropdownList>,
    },
  ];
  return (
    <div className="avatar-dropdown">
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <a onClick={(e) => e.preventDefault()}>
          <UserAvatarIcon></UserAvatarIcon>
          {isAuthenticated ? (
            <span className="fullname">{account?.user?.fullname}</span>
          ) : (
            <span className="fullname">Tài khoản</span>
          )}
          <ArrowIcon></ArrowIcon>
        </a>
      </Dropdown>
    </div>
  );
};

export default AvatarDropdown;
