import { Badge, Button, Dropdown, MenuProps, Skeleton, Space } from "antd";
import Image from "next/image";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { BarIcon, BellIcon, CartIcon, ChatIcon, ArrowIcon, MangeShopIcon, UploadNewIcon } from "../CustomIcons";
import AvatarDropdown from "../AvatarDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataUser } from "@/redux/reducers/auth";
import useDidMountEffect from "@/utils/customUseEffect";
import { AppDispatch, RootState } from "@/redux/store";
import { countDownLoading, countdownComplete } from "@/redux/reducers/countDownLoading";
import Link from "next/link";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
import { getAnnounceChat } from "@/services/user";

const Header = () => {
  const { account } = useSelector((state: RootState) => state.auth);
  const { lastJsonMessage }: any = useWebSocket("ws://localhost:8085");
  const dispatch = useDispatch<AppDispatch>();
  const { countdownDuration, loading } = useSelector((state: RootState) => state.countDownLoading);
  const [badge, setBadge] = useState(false);

  const fetchAnnounce = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getAnnounceChat(String(token));
    setBadge(res.data.announceChat);
  };
  useEffect(() => {
    if (lastJsonMessage?.userId === account?.user?._id && lastJsonMessage?.action === "annouce") {
      fetchAnnounce();
    }
  }, [lastJsonMessage]);
  useDidMountEffect(() => {
    fetchData();
    startCountdown();
  }, []);

  const startCountdown = () => {
    setTimeout(() => {
      dispatch(countDownLoading(0));
      dispatch(countdownComplete());
    }, countdownDuration);
  };

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    try {
      if (token) {
        fetchAnnounce();
        dispatch(fetchDataUser());
      }
    } catch {
      console.log("error");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          2nd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

  const itemsSearch = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];

  const handleOnSearch = ({ string, results }: any) => {
    console.log(string, results);
  };

  const handleOnHover = (result: any) => {
    console.log(result);
  };

  const handleOnSelect = (item: any) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };
  const formatResult = (item: any) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>id: {item.id}</span>
        <span style={{ display: "block", textAlign: "left" }}>name: {item.name}</span>
      </>
    );
  };

  return (
    <header className="header">
      <div className="left">
        <div>
          {loading ? (
            <Skeleton.Button block={true} active size="large"></Skeleton.Button>
          ) : (
            <Image src="/images/chotot-logo.png" alt="" width={100} height={35}></Image>
          )}
        </div>
        <div className="dropdown-category">
          {loading ? (
            <Skeleton.Input block={true} active size="large"></Skeleton.Input>
          ) : (
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <BarIcon></BarIcon>

                <Space>Danh mục</Space>
                <ArrowIcon></ArrowIcon>
              </a>
            </Dropdown>
          )}
        </div>
        <div></div>
      </div>
      <div className="mid">
        {" "}
        {loading ? (
          <Skeleton.Input active block={true} size="large"></Skeleton.Input>
        ) : (
          <ReactSearchAutocomplete
            items={itemsSearch}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        )}
      </div>
      <div className="right">
        {loading ? (
          <Skeleton.Input active block={true} size="large"></Skeleton.Input>
        ) : (
          <>
            <Badge count={5}>
              <BellIcon />
            </Badge>
            <Link href="/chat">
              <Badge dot={badge}>
                <ChatIcon />
              </Badge>
            </Link>
            <div className="dropdown-cart">
              <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                <a onClick={(e) => e.preventDefault()}>
                  <CartIcon />
                </a>
              </Dropdown>
            </div>
            <div className="mangeShop">
              <MangeShopIcon />
              <a href="/my-ads">
                <span className="text">Quản lý tin</span>
              </a>
            </div>
          </>
        )}

        <div className="avatar">
          {loading ? (
            <Skeleton.Button active block={true} size="large" style={{ minWidth: "72px" }}></Skeleton.Button>
          ) : (
            <AvatarDropdown></AvatarDropdown>
          )}
        </div>
        <div>
          {loading ? (
            <Skeleton.Button block={true} active size="large" style={{ minWidth: "123px" }}></Skeleton.Button>
          ) : (
            <Button>
              <UploadNewIcon></UploadNewIcon>
              <a href="/dang-tin">
                <span className="text">ĐĂNG TIN</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
