import { Dropdown, MenuProps } from "antd";
import { ArrowIcon, UserAvatarIcon } from "../CustomIcons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DropdownList from "./item";
import { logout } from "@/services/authentication";
import { useRouter } from "next/router";

const AvatarDropdown = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { account, isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (account.message === "User not found" && account.status === "ERROR") {
    router.push("/");
    logout(dispatch);
    console.log("vao");
  }
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
          {isAuthenticated ? <span className="fullname">{account?.user?.fullname}</span> : <span className="fullname">Tài khoản</span>}
          <ArrowIcon></ArrowIcon>
        </a>
      </Dropdown>
    </div>
  );
};

export default AvatarDropdown;
