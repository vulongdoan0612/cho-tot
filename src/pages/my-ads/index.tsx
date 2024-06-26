import CustomButton from "@/components/CustomButton";
import CustomButtonGreen from "@/components/CustomButton/green";
import { ChangePostIcon, FasterSellIcon, HiddenEyeIcon, LetterIIcon } from "@/components/CustomIcons";
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
import addDay from "@/utils/addDay";
import formatISOToCustomDate from "@/utils/convertDate";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import getWardDistrict from "@/utils/getWardDistrict";
import { Breadcrumb, Image, InputNumberProps, Skeleton, Slider, Spin, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import cookie from "cookie";
import Link from "next/link";
import { useRouter } from "next/router";

const MyAds = () => {
  const { account } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { lastJsonMessage: lastMessage8082 }: any = useWebSocket("wss://cho-tot-be.onrender.com:443");
  const { lastJsonMessage: lastMessage8083 }: any = useWebSocket("wss://cho-tot-be.onrender.com:443");
  const [data, setData] = useState<any>([]);
  const [totalPage, setTotalPage] = useState<any>(0);
  const [dataHidden, setDataHidden] = useState<any>([]);
  const [dataRefuse, setDataRefuse] = useState<any>([]);
  const [dataCensorship, setDataCensorship] = useState<any>([]);
  const [skeleton, setSkeleton] = useState(true);
  const [skeletonId, setSkeletonId] = useState("");
  const [ske, setSke] = useState(true);
  const [ske2, setSke2] = useState(true);
  const [ske3, setSke3] = useState(true);
  const [ske4, setSke4] = useState(true);

  useEffect(() => {
    getDataListPost();
    getDataListHidden();
    getDataListRefuse();
    getDataListCensorship();
  }, []);

  useEffect(() => {
    if (lastMessage8082 && account?.user?._id === lastMessage8082?.userId) {
      if (lastMessage8082?.action === "refuse" && account?.user?._id === lastMessage8082?.userId) {
        getDataListRefuse();
        getDataListPost();
      }
      if (lastMessage8082?.action === "delete" && account?.user?._id === lastMessage8082?.userId) {
        getDataListRefuse();
        getDataListPost();
      }
      if (lastMessage8082?.action === "accept" && account?.user?._id === lastMessage8082?.userId) {
        getDataListRefuse();
        getDataListPost();
        getDataListCensorship();
      }
    }
  }, [lastMessage8082]);

  useEffect(() => {
    if (lastMessage8083?.action === "update-view-post" && account?.user?._id === lastMessage8083.userId) {
      setSkeletonId(lastMessage8083?.postId);
      getDataListPost();
    }
  }, [lastMessage8083]);

  const onChange: InputNumberProps["onChange"] = (newValue) => {
    // setInputValue(15);
  };

  const getDataListPost = async () => {
    setSke(true);
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await getPostCheckList(String(token));

      if (response.status === 200 && response.data.status === "SUCCESS") {
        setData(response?.data?.data);
        setTotalPage(response?.data?.totalPage);
        setSkeleton(false);
        setSke(false);
      }
    }
  };

  const getDataListHidden = async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await getPostHiddenList(String(token));

      if (response.status === 200 && response.data.status === "SUCCESS") {
        setDataHidden(response?.data?.data);
        setSke2(false);
      }
    }
  };

  const getDataListRefuse = async () => {
    setSke3(true);
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await getPostRefuseList(String(token));

      if (response.status === 200 && response.data.status === "SUCCESS") {
        setDataRefuse(response?.data?.data);
        setSke3(false);
      }
    }
  };
  const getDataListCensorship = async () => {
    setSke4(true);
    const token = localStorage.getItem("access_token");
    if (token) {
      const response = await getPostCensorshipList(String(token));

      if (response.status === 200 && response.data.status === "SUCCESS") {
        setDataCensorship(response?.data?.data);
        setSke4(false);
      }
    }
  };

  const handleHidden = async (postId: string) => {
    const token = localStorage.getItem("access_token");
    setSke(true);
    if (token) {
      const updateField = {
        postId: postId,
      };
      const response = await hiddenPost(String(token), updateField);
      if (response?.data?.status === "SUCCESS") {
        getDataListPost();
        getDataListHidden();
      }
    }
  };

  const updatePostHidden = async (postId: string) => {
    setSke2(true);
    const token = localStorage.getItem("access_token");
    if (token) {
      const updateField = {
        postId: postId,
      };
      const response = await unhiddenPost(String(token), updateField);
      if (response?.data?.status === "SUCCESS") {
        getDataListPost();
        getDataListHidden();
      }
    }
  };

  const handleFastSell = (id: string) => {
    router.push(`/services/${id}`);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Đang hiển thị",
      children: (
        <>
          {ske ? (
            <Spin spinning={ske}></Spin>
          ) : (
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
                              <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                                <span className="title" style={{ cursor: "pointer" }}>
                                  {item?.post?.title}
                                </span>
                              </Link>
                              <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                              <span className="address">{getWardDistrict(item?.post?.fullAddress)}</span>
                              <span className="date-post">
                                Ngày đăng tin: &nbsp;<p> {formatISOToCustomDate(item?.date)}</p>
                              </span>
                              <span className="date-expired">
                                Ngày hết hạn: &nbsp;<p> {addDay(item?.date)}</p>
                              </span>
                            </div>
                          </div>
                          <div className="buttons-left">
                            <div> {/* <Checkbox onChange={onChangeCheckBox}>Chọn tin</Checkbox> */}</div>
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
                                    TRANG {item?.currentPage}: &nbsp;<p> {item?.post?.cityValueName}</p>
                                  </span>
                                  <LetterIIcon></LetterIIcon>
                                </div>
                                <Slider
                                  min={1}
                                  max={totalPage}
                                  onChange={onChange}
                                  value={typeof item?.currentPage === "number" ? item?.currentPage : 0}
                                />
                              </div>
                            </div>
                            <div className="service">
                              <div className="top">
                                <span className="current">Dịch vụ đang sử dụng</span>
                              </div>
                              <div className="bottom">
                                {item?.prioritize === "26.51" ? (
                                  <span style={{ fontWeight: "600" }}>Tin nổi bật + Đẩy tin</span>
                                ) : item?.prioritize === "14.73" ? (
                                  <span style={{ fontWeight: "600" }}>Đẩy tin thường</span>
                                ) : item?.prioritize === "15.71" ? (
                                  <span style={{ fontWeight: "600" }}>Tin nổi bật - Nhiều hình ảnh</span>
                                ) : (
                                  <>
                                    {" "}
                                    <LetterIIcon></LetterIIcon>
                                    <span>Chưa sử dụng dịch vụ nào</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="bottom">
                            <CustomButtonGreen
                              onClick={() => handleFastSell(item?.postId)}
                              className={item?.prioritize !== null ? "isPrioritize" : ""}
                            >
                              <FasterSellIcon></FasterSellIcon>
                              {item?.prioritize !== null ? "Thay đổi dịch vụ" : "Bán nhanh hơn"}
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
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Đang đợi duyệt",
      children: (
        <>
          {ske4 ? (
            <Spin spinning={ske}></Spin>
          ) : (
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
                                Ngày đăng tin: &nbsp;<p> {formatISOToCustomDate(item?.date)}</p>
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
                                <div className="number-view">
                                  {" "}
                                  {skeleton && skeletonId === item?.postId ? (
                                    <Skeleton.Button style={{ height: "12px" }} active></Skeleton.Button>
                                  ) : (
                                    <>{item?.view}</>
                                  )}
                                </div>
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
          )}
        </>
      ),
    },
    {
      key: "3",
      label: "Bị từ chối",
      children: (
        <>
          {ske3 ? (
            <Spin spinning={ske3}></Spin>
          ) : (
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
                                Ngày đăng tin: &nbsp;<p> {formatISOToCustomDate(item?.date)}</p>
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
                                <div className="number-view">
                                  {" "}
                                  {skeleton && skeletonId === item?.postId ? (
                                    <Skeleton.Button style={{ height: "12px" }} active></Skeleton.Button>
                                  ) : (
                                    <>{item?.view}</>
                                  )}
                                </div>
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
                                <span className="current">Dịch vụ đang sử dụng</span>
                              </div>
                              <div className="bottom">
                                {item?.prioritize === "26.51" ? (
                                  <span style={{ fontWeight: "600" }}>Tin nổi bật + Đẩy tin</span>
                                ) : item?.prioritize === "14.73" ? (
                                  <span style={{ fontWeight: "600" }}>Đẩy tin thường</span>
                                ) : item?.prioritize === "15.71" ? (
                                  <span style={{ fontWeight: "600" }}>Tin nổi bật - Nhiều hình ảnh</span>
                                ) : (
                                  <>
                                    {" "}
                                    <LetterIIcon></LetterIIcon>
                                    <span>Chưa sử dụng dịch vụ nào</span>
                                  </>
                                )}
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
          )}
        </>
      ),
    },
    {
      key: "4",
      label: "Đã ẩn",
      children: (
        <>
          {ske2 ? (
            <Spin spinning={ske2}></Spin>
          ) : (
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
                                <div className="number-view">
                                  {" "}
                                  {skeleton && skeletonId === item?.postId ? (
                                    <Skeleton.Button style={{ height: "12px" }} active></Skeleton.Button>
                                  ) : (
                                    <>{item?.view}</>
                                  )}
                                </div>
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
                                <span className="current">Dịch vụ đang sử dụng</span>
                              </div>
                              <div className="bottom">
                                {item?.prioritize === "26.51" ? (
                                  <span style={{ fontWeight: "600" }}>Tin nổi bật + Đẩy tin</span>
                                ) : item?.prioritize === "14.73" ? (
                                  <span style={{ fontWeight: "600" }}>Đẩy tin thường</span>
                                ) : item?.prioritize === "15.71" ? (
                                  <span style={{ fontWeight: "600" }}>Tin nổi bật - Nhiều hình ảnh</span>
                                ) : (
                                  <>
                                    {" "}
                                    <LetterIIcon></LetterIIcon>
                                    <span>Chưa sử dụng dịch vụ nào</span>
                                  </>
                                )}
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
          )}
        </>
      ),
    },
  ];

  return (
    <Page style={{ backgroundColor: "#f4f4f4" }} title="Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt">
      <div className="my-ads">
        <Breadcrumb
          className="breadcrumb-my-ads-page"
          separator=">"
          items={[
            {
              title: "Chợ tốt",
              onClick: () => {
                router.push(`/`);
              },
            },
            {
              title: "Quản lý tin",
              onClick: () => {
                router.push(`/my-ads`);
              },
            },
          ]}
        />
        <div className="user-manage">
          <div className="left">
            {account?.user === undefined ? (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Skeleton.Avatar style={{ width: "48px", height: "48px" }} shape="circle" active></Skeleton.Avatar>
                <Skeleton.Input style={{ height: "20px", width: "100px" }} active></Skeleton.Input>
              </div>
            ) : (
              <>
                <Image
                  src={account?.user?.avatar === null ? "/images/empty-avatar.jpg" : account?.user?.avatar}
                  alt=""
                  preview={false}
                  width={48}
                  height={48}
                ></Image>
                <div className="name">
                  <span>{account?.user?.fullname}</span>
                </div>
              </>
            )}
          </div>
          <div className="right-wrapper"></div>
        </div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="tab-ads" />
      </div>
    </Page>
  );
};

export const getServerSideProps = async (context: any) => {
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookies ? cookie.parse(cookies) : {};
  const token = parsedCookies["access_token"];

  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default MyAds;
