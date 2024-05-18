import CustomButton from "@/components/CustomButton";
import CustomButtonGreen from "@/components/CustomButton/green";
import { ChangePostIcon, FasterSellIcon, HiddenEyeIcon, LetterIIcon, PlusManageIcon } from "@/components/CustomIcons";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import {
  getPostCensorshipList,
  getPostCheckList,
  getPostHiddenList,
  getPostRefuseList,
  hiddenPost,
  unhiddenPost,
} from "@/services/formPost";
import { getProfile } from "@/services/getProfile";
import addDay from "@/utils/addDay";
import useDidMountEffect from "@/utils/customUseEffect";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import getWardDistrict from "@/utils/getWardDistrict";
import { Breadcrumb, Checkbox, CheckboxProps, Image, InputNumberProps, Skeleton, Slider, Spin, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";

const MyAds = () => {
  const { account } = useSelector((state: RootState) => state.auth);
  const { lastJsonMessage: lastMessage8082 }: any = useWebSocket("ws://localhost:8082");
  const { lastJsonMessage: lastMessage8083 }: any = useWebSocket("ws://localhost:8083");
  const [inputValue, setInputValue] = useState(1);
  const [spin, setSpin] = useState(false);
  const [data, setData] = useState<any>([]);
  const [dataHidden, setDataHidden] = useState<any>([]);
  const [dataRefuse, setDataRefuse] = useState<any>([]);
  const [dataCensorship, setDataCensorship] = useState<any>([]);
  const [skeleton, setSkeleton] = useState(false);
  const [skeletonId, setSkeletonId] = useState("");

  useDidMountEffect(() => {
    getDataListPost();
    getDataListHidden();
    getDataListRefuse();
    getDataListCensorship();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (lastMessage8082 && account?.user?._id === lastMessage8082?.userId) {
      setSpin(true);
      setTimeout(() => {
        setSpin(false);
      }, 500);
      if (lastMessage8082?.action === "refuse" && account?.user?._id === lastMessage8082?.userId) {
        getProfile(String(token));
        getDataListRefuse();
        getDataListPost();
      }
      if (lastMessage8082?.action === "delete" && account?.user?._id === lastMessage8082?.userId) {
        getProfile(String(token));
        getDataListRefuse();
        getDataListPost();
      }
      if (lastMessage8082?.action === "accept" && account?.user?._id === lastMessage8082?.userId) {
        getProfile(String(token));
        getDataListRefuse();
        getDataListPost();
        getDataListCensorship();
      }
    }
  }, [lastMessage8082]);
  useEffect(() => {
    if (lastMessage8083?.action === "update-view-post" && account?.user?._id === lastMessage8083.userId) {
      setSkeleton(true);
      setTimeout(() => {
        setSkeleton(false);
      }, 500);
      setSkeletonId(lastMessage8083?.postId);
      getDataListPost();
    }
  }, [lastMessage8083]);
  const onChange: InputNumberProps["onChange"] = (newValue) => {
    setInputValue(15);
  };

  const onChangeCheckBox: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const getDataListPost = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await getPostCheckList(String(token));

      if (response.status === 200 && response.data.status === "SUCCESS") {
        setData(response?.data?.data);
      }
    }
  };

  const getDataListHidden = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await getPostHiddenList(String(token));

      if (response.status === 200 && response.data.status === "SUCCESS") {
        setDataHidden(response?.data?.data);
      }
    }
  };

  const getDataListRefuse = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await getPostRefuseList(String(token));

      if (response.status === 200 && response.data.status === "SUCCESS") {
        setDataRefuse(response?.data?.data);
      }
    }
  };

  const getDataListCensorship = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await getPostCensorshipList(String(token));

      if (response.status === 200 && response.data.status === "SUCCESS") {
        setDataCensorship(response?.data?.data);
      }
    }
  };

  const handleHidden = async (postId: string) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const updateField = {
        postId: postId,
      };
      const response = await hiddenPost(String(token), updateField);
      if (response?.data?.status === "SUCCESS") {
        setSpin(true);
        setTimeout(() => {
          setSpin(false);
          getDataListPost();
          getDataListHidden();
        }, 1000);
      }
    }
  };

  const updatePostHidden = async (postId: string) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const updateField = {
        postId: postId,
      };
      const response = await unhiddenPost(String(token), updateField);
      if (response?.data?.status === "SUCCESS") {
        setSpin(true);
        setTimeout(() => {
          setSpin(false);
          getDataListPost();
          getDataListHidden();
        }, 1000);
      }
    }
  };
  console.log(data);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Đang hiển thị",
      children: (
        <>
          {data.length > 0 ? (
            <div className="tab-on-view">
              {data.map((item: any, key: number) => {
                return (
                  <div className="on-view" key={key}>
                    <div className="wrapper-left">
                      <div className="left">
                        <Image src={item?.post?.image[0]?.img} alt="" className="image-car" width={144} height={144}></Image>
                        <div className="information">
                          <span className="title">{item?.post?.title}</span>
                          <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                          <span className="address">{getWardDistrict(item?.post?.fullAddress)}</span>
                          <span className="date-post">
                            Ngày đăng tin: &nbsp;<p> {item?.date}</p>
                          </span>
                          <span className="date-expired">
                            Ngày hết hạn: &nbsp;<p> {addDay(item?.date)}</p>
                          </span>
                        </div>
                      </div>
                      <div className="buttons-left">
                        <div>
                          {" "}
                          <Checkbox onChange={onChangeCheckBox}>Chọn tin</Checkbox>
                        </div>
                        <div className="buttons">
                          <a href={`dang-tin?category=0&id=${item.postId}`}>
                            <button>
                              <ChangePostIcon></ChangePostIcon>Sửa tin
                            </button>
                          </a>
                          <button onClick={() => handleHidden(item.postId)}>
                            <HiddenEyeIcon></HiddenEyeIcon>Đã bán / Ẩn tin
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="right">
                      <div className="top">
                        <div className="flex">
                          <div className="view">
                            <div className="flex-view">
                              <span className="text">Lượt xem</span>
                              <LetterIIcon></LetterIIcon>
                            </div>
                            <div className="number-view">
                              {skeleton && skeletonId === item?.postId ? (
                                <Skeleton.Button style={{ height: "12px" }} active></Skeleton.Button>
                              ) : (
                                <>{item?.view}</>
                              )}
                            </div>
                          </div>
                          <div className="slider">
                            <div className="page">
                              <span className="top">
                                TRANG 40: &nbsp;<p> Mục Xe máy, Tp Hồ Chí Minh</p>
                              </span>
                              <LetterIIcon></LetterIIcon>
                            </div>
                            <Slider min={1} max={20} onChange={onChange} value={typeof inputValue === "number" ? inputValue : 0} />
                          </div>
                        </div>
                        <div className="service">
                          <div className="top">
                            <span className="current">Dịch vụ gần đây</span>
                            <span className="detail">Xem chi tiết</span>
                          </div>
                          <div className="bottom">
                            <LetterIIcon></LetterIIcon>
                            <span>Chưa sử dụng dịch vụ nào</span>
                          </div>
                        </div>
                      </div>
                      <div className="bottom">
                        <CustomButtonGreen>
                          <FasterSellIcon></FasterSellIcon>Bán nhanh hơn
                        </CustomButtonGreen>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="null-post">
              <Image
                src="https://static.chotot.com/storage/ads-dashboard/svg/empty-frame.svg"
                alt=""
                width={308}
                height={200}
                preview={false}
              ></Image>
              <span className="title">Không tìm thấy tin đăng</span>
              <span className="desc">Bạn hiện tại không có tin đăng nào cho trạng thái này</span>
              <CustomButton>Đăng tin</CustomButton>
            </div>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Đang đợi duyệt",
      children: (
        <>
          {dataCensorship.length > 0 ? (
            <div className="tab-on-view">
              {dataCensorship.map((item: any, key: number) => {
                return (
                  <div className="on-view" key={key}>
                    <div className="wrapper-left">
                      <div className="left">
                        <Image src={item?.post?.image[0]?.img} alt="" className="image-car" width={144} height={144}></Image>
                        <div className="information">
                          <span className="title">{item?.post?.title}</span>
                          <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                          <span className="address">{getWardDistrict(item?.post?.fullAddress)}</span>
                          <span className="date-post">
                            Ngày đăng tin: &nbsp;<p> {item?.date}</p>
                          </span>
                          <span className="date-expired">
                            Ngày hết hạn: &nbsp;<p> {addDay(item?.date)}</p>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="right">
                      <div className="top">
                        <div className="flex">
                          <div className="view">
                            <div className="flex-view">
                              <span className="text">Lượt xem</span>
                              <LetterIIcon></LetterIIcon>
                            </div>
                            <div className="number-view">141</div>
                          </div>
                          <div className="slider">
                            <div className="page">
                              <span className="top" style={{ justifyContent: "center" }}>
                                Tin chưa được hiển thị
                              </span>
                              <LetterIIcon></LetterIIcon>
                            </div>
                          </div>
                        </div>
                        <div className="service">
                          <div className="top">
                            <span className="current">Dịch vụ gần đây</span>
                            <span className="detail">Xem chi tiết</span>
                          </div>
                          <div className="bottom">
                            <LetterIIcon></LetterIIcon>
                            <span>Chưa sử dụng dịch vụ nào</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="null-post">
              <Image
                src="https://static.chotot.com/storage/ads-dashboard/svg/empty-frame.svg"
                alt=""
                width={308}
                height={200}
                preview={false}
              ></Image>
              <span className="title">Không tìm thấy tin đăng</span>
              <span className="desc">Bạn hiện tại không có tin đăng nào cho trạng thái này</span>
              <CustomButton>Đăng tin</CustomButton>
            </div>
          )}
        </>
      ),
    },
    {
      key: "3",
      label: "Bị từ chối",
      children: (
        <>
          {dataRefuse.length > 0 ? (
            <div className="tab-on-view">
              {dataRefuse.map((item: any, key: number) => {
                return (
                  <div className="on-view" key={key}>
                    <div className="wrapper-left">
                      <div className="left">
                        <Image src={item?.post?.image[0]?.img} alt="" className="image-car" width={144} height={144}></Image>
                        <div className="information">
                          <span className="title">{item?.post?.title}</span>
                          <span className="price"> {formatNumberWithCommas(item?.post?.price)} đ</span>
                          <span className="address">{getWardDistrict(item?.post?.fullAddress)}</span>
                          <span className="date-post">
                            Ngày đăng tin: &nbsp;<p> {item?.date}</p>
                          </span>
                          <span className="date-expired">
                            Ngày hết hạn: &nbsp;<p> {addDay(item?.date)}</p>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="right">
                      <div className="top">
                        <div className="flex">
                          <div className="view">
                            <div className="flex-view">
                              <span className="text">Lượt xem</span>
                              <LetterIIcon></LetterIIcon>
                            </div>
                            <div className="number-view">141</div>
                          </div>
                          <div className="slider">
                            <div className="page">
                              <span className="top" style={{ justifyContent: "center" }}>
                                Tin chưa được hiển thị
                              </span>
                              <LetterIIcon></LetterIIcon>
                            </div>
                          </div>
                        </div>
                        <div className="service">
                          <div className="top">
                            <span className="current">Dịch vụ gần đây</span>
                            <span className="detail">Xem chi tiết</span>
                          </div>
                          <div className="bottom">
                            <LetterIIcon></LetterIIcon>
                            <span>Chưa sử dụng dịch vụ nào</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="null-post">
              <Image
                src="https://static.chotot.com/storage/ads-dashboard/svg/empty-frame.svg"
                alt=""
                width={308}
                height={200}
                preview={false}
              ></Image>
              <span className="title">Không tìm thấy tin đăng</span>
              <span className="desc">Bạn hiện tại không có tin đăng nào cho trạng thái này</span>
              <CustomButton>Đăng tin</CustomButton>
            </div>
          )}
        </>
      ),
    },
    {
      key: "4",
      label: "Đã ẩn",
      children: (
        <>
          {dataHidden.length > 0 ? (
            <div className="tab-on-view">
              {dataHidden.map((item: any, key: number) => {
                return (
                  <div className="on-view" key={key}>
                    <div className="wrapper-left">
                      <div className="left">
                        <Image src={item?.post?.image[0]?.img} alt="" className="image-car" width={144} height={144}></Image>
                        <div className="information">
                          <span className="title">{item?.post?.title}</span>
                          <span className="price"> {formatNumberWithCommas(item?.post?.price)} đ</span>
                          <span className="address">{getWardDistrict(item?.post?.fullAddress)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="right">
                      <div className="top">
                        <div className="flex">
                          <div className="view">
                            <div className="flex-view">
                              <span className="text">Lượt xem</span>
                              <LetterIIcon></LetterIIcon>
                            </div>
                            <div className="number-view">141</div>
                          </div>
                          <div className="slider">
                            <div className="page">
                              <span className="top" style={{ justifyContent: "center" }}>
                                Tin chưa được hiển thị
                              </span>
                              <LetterIIcon></LetterIIcon>
                            </div>
                          </div>
                        </div>
                        <div className="service">
                          <div className="top">
                            <span className="current">Dịch vụ gần đây</span>
                            <span className="detail">Xem chi tiết</span>
                          </div>
                          <div className="bottom">
                            <LetterIIcon></LetterIIcon>
                            <span>Chưa sử dụng dịch vụ nào</span>
                          </div>
                        </div>
                      </div>
                      <div className="bottom">
                        <CustomButtonGreen onClick={() => updatePostHidden(item?.postId)}>
                          <HiddenEyeIcon></HiddenEyeIcon>Hiện tin lại
                        </CustomButtonGreen>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="null-post">
              <Image
                src="https://static.chotot.com/storage/ads-dashboard/svg/empty-frame.svg"
                alt=""
                width={308}
                height={200}
                preview={false}
              ></Image>
              <span className="title">Không tìm thấy tin đăng</span>
              <span className="desc">Bạn hiện tại không có tin đăng nào cho trạng thái này</span>
              <CustomButton>Đăng tin</CustomButton>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      <div className="my-ads">
        <Breadcrumb
          className="breadcrumb-my-ads-page"
          separator=">"
          items={[
            {
              title: "Chợ tốt",
            },
            {
              title: "Quản lý tin",
            },
          ]}
        />
        <div className="user-manage">
          <div className="left">
            <Image src="https://cdn.chotot.com/uac2/26802657" alt="" width={48} height={48}></Image>
            <div className="name">
              <span>{account?.user?.fullname}</span>
            </div>
          </div>
          <div className="right-wrapper">
            <div className="right">
              <Image src="https://static.chotot.com/storage/react-common/dongTot.svg" alt="alt" width={16} height={16}></Image>
              <span className="balance">Số dư: 0</span>
              <button>
                <PlusManageIcon></PlusManageIcon>
              </button>
            </div>
          </div>
        </div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="tab-ads" />
      </div>
      <Spin spinning={spin} fullscreen />
    </Page>
  );
};
export default MyAds;
