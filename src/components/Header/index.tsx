import { Badge, Button, Dropdown, Input, MenuProps, Skeleton, Space } from "antd";
import Image from "next/image";
import { BarIcon, ChatIcon, ArrowIcon, MangeShopIcon, UploadNewIcon, SearchIcon } from "../CustomIcons";
import AvatarDropdown from "../AvatarDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataUser } from "@/redux/reducers/auth";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import useWebSocket from "react-use-websocket";
import { useEffect, useRef, useState } from "react";
import { getAnnounceChat } from "@/services/user";
import { getKeySearch } from "@/services/formPost";
import { useRouter } from "next/router";
import limitInputCharacters from "@/utils/limitInput";

const Header = () => {
  const router = useRouter();
  const brandRef: any = useRef(null);
  const { account } = useSelector((state: RootState) => state.auth);
  const { lastJsonMessage }: any = useWebSocket("wss://cho-tot-be.onrender.com:443");
  const dispatch = useDispatch<AppDispatch>();
  const [ske, setSke] = useState(true);
  const [badge, setBadge] = useState(false);
  const [listSearch, setListSearch] = useState([]);
  const [openListSearch, setOpenListSearch] = useState(false);
  const [value, setValue] = useState<any>("");

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    try {
      if (token) {
        fetchAnnounce();
        dispatch(fetchDataUser({ setSke }));
      } else {
        setSke(false);
      }
    } catch {
      console.log("error");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div style={{ paddingTop: "8.5px" }}>Tính năng đang phát triển</div>,
    },
  ];

  const updateURL = (queryParams: any) => {
    router.push({
      pathname: "/mua-ban-oto",
      query: { ...router.query, ...queryParams },
    });
  };

  const updateURL2 = (queryParams: any) => {
    const newQuery = { ...router.query, ...queryParams };
    if (queryParams.keySearch === "") {
      delete newQuery.keySearch;
    }
    router.push({
      pathname: "/mua-ban-oto",
      query: newQuery,
    });
  };

  const handleSearchList = async (e: any) => {
    updateURL({ keySearch: e?.target?.value });
    if (e.target.value !== "") {
      const newValue = limitInputCharacters(e?.target?.value, 80);
      setValue(newValue);
      const data = {
        keySearch: router.query.keySearch,
        price: router.query.price,
        form: router.query.form,
        sit: router.query.sit,
        fuel: router.query.fuel,
        numberBox: router.query.numberBox,
        city: router.query.city,
        district: router.query.district === "" ? undefined : router.query.district,
        date: router.query.date,
        km: router.query.km,
        color: router.query.color,
        country: router.query.country,
        model: router.query.model,
        brand: router.query.brand,
        status: router.query.status,
        post: router.query.post,
      };
      const res = await getKeySearch(data);
      if (res.data.status === "SUCCESS") {
        if (res.data.titles.length > 0) {
          setListSearch(res.data.titles);
          setOpenListSearch(true);
        } else {
          setListSearch([]);
          setOpenListSearch(false);
        }
      }
    } else {
      setValue("");
      updateURL2({ keySearch: "" });
    }
  };

  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      updateURL({ keySearch: e.target.value });
      setOpenListSearch(false);
    }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    setValue(router?.query?.keySearch);
  }, [router?.query?.keySearch]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        brandRef?.current &&
        !brandRef?.current?.contains(event.target) &&
        event?.target?.id !== "search-list" &&
        event?.target?.id !== "search-item"
      ) {
        setOpenListSearch(false);
      }
      if (brandRef?.current && brandRef?.current?.contains(event.target) && event?.target?.id === "search-list") {
        setOpenListSearch(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openListSearch]);

  const handleRoute = (item: string) => {
    updateURL({ keySearch: item });
    setOpenListSearch(false);
  };

  return (
    <header className="header">
      <div className="left">
        <div>
          {ske ? (
            <Skeleton.Button block={true} active size="large"></Skeleton.Button>
          ) : (
            <Link href="/" prefetch={false}>
              <Image src="/images/chotot-logo.png" alt="" width={100} height={35}></Image>
            </Link>
          )}
        </div>
        <div className="dropdown-category">
          {ske ? (
            <Skeleton.Input block={true} active size="large"></Skeleton.Input>
          ) : (
            <Dropdown menu={{ items }}>
              <Link href="/" onClick={(e) => e.preventDefault()}>
                <BarIcon></BarIcon>

                <Space>Danh mục</Space>
                <ArrowIcon></ArrowIcon>
              </Link>
            </Dropdown>
          )}
        </div>
      </div>
      <div className="mid">
        {" "}
        {ske ? (
          <Skeleton.Input active block={true} size="large"></Skeleton.Input>
        ) : (
          <>
            <div className="search-input" ref={brandRef}>
              <Input
                autoComplete="off"
                placeholder="Tìm kiếm xe"
                onKeyDown={handleSearch}
                onChange={handleSearchList}
                id="search-list"
                value={value}
              />
              <SearchIcon></SearchIcon>
            </div>
            {openListSearch ? (
              <div className="search-list">
                {listSearch?.map((item, index) => {
                  return (
                    <span key={index} onClick={() => handleRoute(item)} id="search-item">
                      {item}
                    </span>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
      <div className="right">
        {ske ? (
          <Skeleton.Input active block={true} size="large"></Skeleton.Input>
        ) : (
          <>
            <div className="chat">
              <Link href="/chat" prefetch={false}>
                <Badge dot={badge}>
                  <ChatIcon />
                </Badge>
              </Link>
            </div>
            <div className="mangeShop">
              <Link href="/my-ads" prefetch={false}>
                <MangeShopIcon />
              </Link>
            </div>
          </>
        )}
        <div className="avatar">
          {ske ? (
            <Skeleton.Button active block={true} size="large" style={{ minWidth: "72px" }}></Skeleton.Button>
          ) : (
            <AvatarDropdown></AvatarDropdown>
          )}
        </div>
        <div>
          {ske ? (
            <Skeleton.Button block={true} active size="large" style={{ minWidth: "123px" }}></Skeleton.Button>
          ) : (
            <Link href="/dang-tin" prefetch={false}>
              <Button style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                <UploadNewIcon></UploadNewIcon>
                <span className="text">ĐĂNG TIN</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
