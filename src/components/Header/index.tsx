import { Badge, Button, Dropdown, Input, MenuProps, Skeleton, Space } from "antd";
import Image from "next/image";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { BarIcon, BellIcon, CartIcon, ChatIcon, ArrowIcon, MangeShopIcon, UploadNewIcon, SearchIcon } from "../CustomIcons";
import AvatarDropdown from "../AvatarDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataUser } from "@/redux/reducers/auth";
import useDidMountEffect from "@/utils/customUseEffect";
import { AppDispatch, RootState } from "@/redux/store";
import { countDownLoading, countdownComplete } from "@/redux/reducers/countDownLoading";
import Link from "next/link";
import useWebSocket from "react-use-websocket";
import { useEffect, useRef, useState } from "react";
import { getAnnounceChat } from "@/services/user";
import { getKeySearch } from "@/services/formPost";
import { useRouter } from "next/router";
import limitInputCharacters from "@/utils/limitInput";

const Header = () => {
  const { account } = useSelector((state: RootState) => state.auth);
  const { lastJsonMessage }: any = useWebSocket("ws://localhost:8085");
  const dispatch = useDispatch<AppDispatch>();
  const { countdownDuration, loading } = useSelector((state: RootState) => state.countDownLoading);
  const [badge, setBadge] = useState(false);
  const [listSearch, setListSearch] = useState([]);
  const [openListSearch, setOpenListSearch] = useState(false);
  const [value, setValue] = useState<any>("");

  const fetchAnnounce = async () => {
    const token = localStorage.getItem("access_token");
    const res = await getAnnounceChat(String(token));
    setBadge(res.data.announceChat);
  };
  useDidMountEffect(() => {
    if (lastJsonMessage?.userId === account?.user?._id && lastJsonMessage?.action === "annouce") {
      if (lastJsonMessage?.action === "annouce") {
        fetchAnnounce();
      }
    }
  }, [lastJsonMessage]);
  useEffect(() => {
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
        <Link href="/" target="_blank" rel="noopener noreferrer">
          1st menu item
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/" target="_blank" rel="noopener noreferrer">
          2nd menu item (disabled)
        </Link>
      ),
      disabled: true,
    },
    {
      key: "3",
      label: (
        <Link href="/" target="_blank" rel="noopener noreferrer">
          3rd menu item (disabled)
        </Link>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  const router = useRouter();
  const updateURL = (queryParams: any) => {
    router.push({
      pathname: "/mua-ban-oto",
      query: { ...router.query, ...queryParams },
    });
  };
  const updateURL2 = (queryParams: any) => {
    const newQuery = { ...router.query, ...queryParams };

    // Remove keySearch if it's an empty string
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
  const brandRef: any = useRef(null);

  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      updateURL({ keySearch: e.target.value });
      setOpenListSearch(false);
    }
  };
  useDidMountEffect(() => {
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
          {loading ? (
            <Skeleton.Button block={true} active size="large"></Skeleton.Button>
          ) : (
            <Link href="/">
              <Image src="/images/chotot-logo.png" alt="" width={100} height={35}></Image>
            </Link>
          )}
        </div>
        <div className="dropdown-category">
          {loading ? (
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
        {loading ? (
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
        {loading ? (
          <Skeleton.Input active block={true} size="large"></Skeleton.Input>
        ) : (
          <>
            {/* <Badge count={5}>
                <BellIcon />
              </Badge> */}
            <Link href="/chat">
              <Badge dot={badge}>
                <ChatIcon />
              </Badge>
            </Link>
            {/* <div className="dropdown-cart">
              <Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                <a onClick={(e) => e.preventDefault()}>
                  <CartIcon />
                </a>
              </Dropdown>
            </div> */}
            <div className="mangeShop">
              <MangeShopIcon />
              <Link href="/my-ads">
                <span className="text">Quản lý tin</span>
              </Link>
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
            <Link href="/dang-tin">
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
