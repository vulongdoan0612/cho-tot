import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  MenuProps,
  Skeleton,
  Space,
} from "antd";
import Image from "next/image";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import {
  BarIcon,
  BellIcon,
  CartIcon,
  ChatIcon,
  ArrowIcon,
  MangeShopIcon,
  UploadNewIcon,
} from "../CustomIcons";
import AvatarDropdown from "../AvatarDropdown";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenticate } from "@/redux/reducers/auth";
import { getProfile } from "@/services/getProfile";
import useDidMountEffect from "@/utils/customUseEffect";
import { RootState } from "@/redux/store";
import {
  countDownLoading,
  countdownComplete,
} from "@/redux/reducers/countDownLoading";

const Header = () => {
  const dispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.auth);
  const { countdownDuration, loading } = useSelector(
    (state: RootState) => state.countDownLoading
  );
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
        try {
          dispatch(setAuthenticate({ loading: true, isAuthenticated: false }));
        } finally {
          const response = await getProfile(String(token));
          if (response.status === 200) {
            dispatch(
              setAuthenticate({
                loading: false,
                isAuthenticated: true,
                account: response.data,
              })
            );
          }
        }
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
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result: any) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item: any) => {
    // the item selected
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };
  const formatResult = (item: any) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
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
            <Image
              src="/images/chotot-logo.png"
              alt=""
              width={100}
              height={35}
            ></Image>
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
            <Badge count={5}>
              <ChatIcon />
            </Badge>
            <div className="dropdown-cart">
              <Dropdown
                menu={{ items }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <CartIcon />
                </a>
              </Dropdown>
            </div>
            <div className="mangeShop">
              <MangeShopIcon />
              <span className="text">Quản lý tin</span>
            </div>
          </>
        )}

        <div className="avatar">
          {loading ? (
            <Skeleton.Button
              active
              block={true}
              size="large"
              style={{ minWidth: "72px" }}
            ></Skeleton.Button>
          ) : (
            <AvatarDropdown></AvatarDropdown>
          )}
        </div>
        <div>
          {loading ? (
            <Skeleton.Button
              block={true}
              active
              size="large"
              style={{ minWidth: "123px" }}
            ></Skeleton.Button>
          ) : (
            <Button>
              <UploadNewIcon></UploadNewIcon>
              <span className="text">ĐĂNG TIN</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
