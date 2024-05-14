import { Dropdown, MenuProps } from "antd";
import { ArrowIcon, UserAvatarIcon } from "../CustomIcons";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DropdownList from "./item";

const AvatarDropdown = () => {
  const { account, isAuthenticated } = useSelector((state: RootState) => state.auth);

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
          {isAuthenticated ? <span className="fullname">{account?.fullname}</span> : <span className="fullname">Tài khoản</span>}
          <ArrowIcon></ArrowIcon>
        </a>
      </Dropdown>
    </div>
  );
};

export default AvatarDropdown;
