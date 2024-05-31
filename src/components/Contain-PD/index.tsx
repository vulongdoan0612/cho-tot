import { Alert, Breadcrumb, Image, Skeleton, Spin } from "antd";
import {
  AddressIcon,
  ArrowSlideNextIcon,
  ArrowSlidePrevIcon,
  CarlendarIcon,
  ChatIcon,
  GiftIcon,
  HiddenEyeIcon,
  PercentIcon,
  PhoneIcon,
  StarIcon,
  TimeIcon,
} from "../CustomIcons";
import CustomButtonGreen from "../CustomButton/green";
import ProductSlide from "./productSlide";
import { useEffect, useState } from "react";
import { useFetchPost } from "@/hooks/useFetchPost";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import Slider from "react-slick";
import { limitTextDescription, limitTextTitle } from "@/utils/limitText";
import { useFetchCheckFavPost } from "@/hooks/useFetchCheckFavPost";
import NotFound from "../404";
import { createConversation } from "@/services/chat";
import { formatDistanceToNow, parseISO, parse } from "date-fns";
import { vi } from "date-fns/locale";
import timeAgo from "@/utils/timeAgo";
import Link from "next/link";

const ContainPD = () => {
  const { account } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { post, checkFavPost } = useSelector((state: RootState) => state.postsData);
  const [hiddenPhone, setHiddenPhone] = useState(true);
  const [lessDetail, setLessDetail] = useState(false);
  const [spin, setSpin] = useState(false);
  const [skeleton, setSkeleton] = useState(false);
  const [author, setAuthor] = useState(false);

  useFetchPost({ setSpin, body: router });

  useEffect(() => {
    setSkeleton(true);
    setTimeout(() => {
      setSkeleton(false);
    }, 500);
  }, [router]);

  useFetchCheckFavPost({
    body: router,
  });

  const handleSwitchPhone = () => {
    setHiddenPhone(false);
  };

  const handleLessDetail = () => {
    setLessDetail((prev) => !prev);
  };

  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowSlidePrevIcon></ArrowSlidePrevIcon>
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <ArrowSlideNextIcon></ArrowSlideNextIcon>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    variableWidth: true,
    className: "slider variable-width",
  };

  const handleRouterRec = (rec: string, postId: string) => {
    router.push(`/${rec}/${postId}`);
  };
  const handleUser = () => {
    router.push(`/user/${post?.post?.userId}`);
  };

  const handleChat = async () => {
    const accessToken: any = localStorage.getItem("access_token");
    const data = {
      postId: post?.post?.postId,
    };
    if (accessToken !== null) {
      const res = await createConversation(accessToken, data);

      if (res.status === 200) {
        setSpin(true);
        setTimeout(() => {
          setSpin(false);
        }, 500);
        router.push(`/chat?currentRoom=${post?.post?.postId}`);
      }
    } else {
      setAuthor(true);
      setTimeout(() => {
        setAuthor(false);
      }, 2000);
    }
  };
  return (
    <div className="wrapper-contain">
      {post?.status === "404" ? (
        <NotFound text={"Bài viết không tồn tại"} text2={""}></NotFound>
      ) : (
        <>
          <Breadcrumb
            className="breadcrumb-PD"
            separator=">"
            items={[
              {
                title: "Chợ tốt xe",
                onClick: () => {
                  router.push(`/`);
                },
              },
              {
                title: `Ô tô`,
                onClick: () => {
                  router.push("/mua-ban-oto");
                },
              },
              {
                title: `${post?.post?.post?.cityValueName}`,
                onClick: () => {
                  router.push(`/mua-ban-oto?city=${post?.post?.post?.cityValue}`);
                },
              },
              {
                title: `${post?.post?.post?.districtValueName}`,
                onClick: () => {
                  router.push(`/mua-ban-oto?city=${post?.post?.post?.cityValue}&district=${post?.post?.post?.districtValue}`);
                },
              },
              {
                title: `${post?.post?.post?.value} ${post?.post?.post?.color}, ${post?.post?.post?.model}, ${post?.post?.post?.form}`,
              },
            ]}
          />
          <div className="main-contain">
            <div className="top-main">
              <div className="left-contain">
                <ProductSlide post={post} checkFavPost={checkFavPost}></ProductSlide>
                <div className="intro-desc">
                  <span className="title">Mô tả chi tiết</span>
                  {skeleton ? (
                    <Skeleton.Input style={{ height: "92px" }} block={true} active size="large"></Skeleton.Input>
                  ) : (
                    <>
                      <span className="desc" dangerouslySetInnerHTML={{ __html: post?.post?.post?.introducing }}></span>
                      <span className={` ${hiddenPhone ? "switch-phone" : "unhidden-phone"}`} onClick={handleSwitchPhone}>
                        Nhấn để hiện số: {hiddenPhone ? "098993***" : <b>{post?.post?.userInfo?.phone}</b>}
                      </span>
                    </>
                  )}
                </div>
                <div className="info-detail">
                  <div className="title">Thông số chi tiết</div>
                  <div className="status-car">
                    <span className="top">Tình trạng xe</span>
                    {post?.post?.post?.status === "Đã sử dụng" ? (
                      <>
                        <div className="devide">
                          <div className="left">
                            <span>Số Km đã đi</span>
                            {skeleton ? (
                              <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                            ) : (
                              <span>{post?.post?.post?.km}</span>
                            )}
                          </div>
                          <div className="right">
                            <span>Số đời chủ</span>{" "}
                            {skeleton ? (
                              <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                            ) : (
                              <span>{post?.post?.post?.owner}</span>
                            )}
                          </div>
                        </div>
                        <hr></hr>
                      </>
                    ) : (
                      <></>
                    )}
                    {post?.post?.post?.status === "Đã sử dụng" ? (
                      <>
                        <div className="devide">
                          <div className="left">
                            <span>Loại biển số</span>
                            {skeleton ? (
                              <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                            ) : (
                              <span>{post?.post?.post?.carNumber}</span>
                            )}
                          </div>
                          <div className="right">
                            <span>Kèm phụ kiện</span>
                            {skeleton ? (
                              <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                            ) : (
                              <span>{post?.post?.post?.accessories}</span>
                            )}
                          </div>
                        </div>{" "}
                        <hr></hr>
                      </>
                    ) : (
                      <>
                        <div className="devide">
                          <div className="left">
                            <span>Kèm phụ kiện</span>
                            {skeleton ? (
                              <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                            ) : (
                              <span>{post?.post?.post?.accessories}</span>
                            )}
                          </div>
                        </div>{" "}
                        <hr></hr>
                      </>
                    )}
                    <div className="devide">
                      {" "}
                      <div className="left">
                        <span>Còn hạn đăng kiểm</span>
                        {skeleton ? (
                          <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                        ) : (
                          <span>{post?.post?.post?.registry}</span>
                        )}
                      </div>
                      <div className="right">
                        <span>Xuất xứ</span>
                        {skeleton ? (
                          <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                        ) : (
                          <span>{post?.post?.post?.country}</span>
                        )}
                      </div>
                    </div>{" "}
                    <hr></hr>
                    <div className="devide">
                      <div className="left">
                        <span>Tình trạng</span>
                        {skeleton ? (
                          <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                        ) : (
                          <span>{post?.post?.post?.status}</span>
                        )}
                      </div>
                      <div className="right">
                        <span>Chính sách bảo hành</span> <span>Bảo hành hãng</span>
                      </div>
                    </div>
                  </div>
                  <div className={`detail-car ${lessDetail ? "lessDetail" : ""}`}>
                    <div className="status-car">
                      <span className="top">Thông số kỹ thuật</span>
                      <div className="devide">
                        <div className="left">
                          <span>Hãng</span>
                          {skeleton ? (
                            <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                          ) : (
                            <span>{post?.post?.post?.value}</span>
                          )}
                        </div>
                        <div className="right">
                          <span>Dòng xe</span>
                          {skeleton ? (
                            <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                          ) : (
                            <span>{post?.post?.post?.model}</span>
                          )}
                        </div>
                      </div>
                      <hr></hr>
                      <div className="devide">
                        <div className="left">
                          <span>Năm sản xuất</span>
                          {skeleton ? (
                            <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                          ) : (
                            <span>{post?.post?.post?.dateCar}</span>
                          )}
                        </div>
                        <div className="right">
                          <span>Hộp số</span>
                          {skeleton ? (
                            <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                          ) : (
                            <span>{post?.post?.post?.numberBox}</span>
                          )}
                        </div>
                      </div>{" "}
                      <hr></hr>
                      <div className="devide">
                        {" "}
                        <div className="left">
                          <span>Nhiên liệu</span>
                          {skeleton ? (
                            <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                          ) : (
                            <span>{post?.post?.post?.activeButton}</span>
                          )}
                        </div>
                        <div className="right">
                          <span>Kiểu dáng</span>
                          {skeleton ? (
                            <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                          ) : (
                            <span>{post?.post?.post?.form}</span>
                          )}
                        </div>
                      </div>{" "}
                      <hr></hr>
                      <div className="devide">
                        <div className="left">
                          <span>Số chỗ</span>
                          {skeleton ? (
                            <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                          ) : (
                            <span>{post?.post?.post?.sit}</span>
                          )}
                        </div>
                        <div className="right">
                          <span>Trọng lượng</span>
                          {skeleton ? (
                            <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                          ) : (
                            <span>&gt; 1 tấn</span>
                          )}
                        </div>
                      </div>{" "}
                      <hr></hr>
                      <div className="devide">
                        <div className="left">
                          <span>Trọng tải</span>
                          {skeleton ? (
                            <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                          ) : (
                            <span>2</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleLessDetail}>{lessDetail ? "Xem thêm" : "Thu gọn"}</button>
                </div>
                <div className="advise-buy">
                  <div className="top">
                    <span>Vay mua xe</span>
                    <Image src="/images/veh_partnership_2x.png" alt="" preview={false} width={150.9}></Image>
                  </div>
                  <div className="mid">
                    <div className="advan">
                      <div className="flex">
                        <div className="advan-item">
                          <GiftIcon></GiftIcon> Lãi suất ưu đãi cho khách hàng Chợ Tốt Xe
                        </div>{" "}
                        <div className="advan-item">
                          <TimeIcon></TimeIcon>DUYỆT VAY CẤP TỐC chỉ 05 phút
                        </div>
                      </div>
                      <div className="flex">
                        <div className="advan-item dashed">
                          <PercentIcon></PercentIcon>Vay tối đa 85% giá trị xe
                        </div>{" "}
                        <div className="advan-item dashed">
                          <CarlendarIcon></CarlendarIcon>Thời hạn vay tối đa tới 8 năm
                        </div>
                      </div>
                    </div>
                    <p className="text">
                      Chợ Tốt Xe hợp tác với VP Bank để cung cấp mức lãi suất ưu đãi nhất cho người dùng mua xe trên Chợ Tốt. Tìm hiểu thêm
                      chính sách từ VP Bank <b>tại đây.</b>
                    </p>
                    <button>Tư vấn mua xe</button>
                  </div>
                </div>
              </div>
              <div className="right-contain">
                <div className="card-detail">
                  <h1 className="title">
                    {skeleton ? (
                      <Skeleton.Button block={true} style={{ height: "27px" }} active size="large"></Skeleton.Button>
                    ) : (
                      <> {post?.post?.post?.title}</>
                    )}
                  </h1>
                  <div className="infor">
                    {skeleton ? (
                      <Skeleton.Button block={true} style={{ height: "16.094px" }} active size="large"></Skeleton.Button>
                    ) : (
                      <>
                        <span>{post?.post?.post?.dateCar}</span>
                        {post?.post?.post?.km !== 0 ? (
                          <>
                            {" "}
                            <hr />
                            <span>{formatNumberWithCommas(post?.post?.post?.km)} km</span>{" "}
                          </>
                        ) : (
                          <></>
                        )}
                        <hr /> <span>{post?.post?.post?.activeButton}</span>
                        <hr />
                        <span>{post?.post?.post?.numberBox}</span>
                      </>
                    )}
                  </div>
                  <div className="price">
                    {skeleton ? (
                      <Skeleton.Button block={true} style={{ height: "139.19px" }} active size="large"></Skeleton.Button>
                    ) : (
                      <>
                        <div className="top">
                          <span className="price-num">{formatNumberWithCommas(post?.post?.post?.price)} đ</span>
                          <span className="desc-price">(Trả góp từ 6.22 triệu/tháng)</span>
                        </div>
                        <div className="bottom">
                          <span className="title">Khoảng giá thị trường</span>

                          <span className="text">
                            {" "}
                            Giá được tổng hợp bởi&nbsp;<b>chototxe.com</b>&nbsp;trong 3 tháng gần nhất và chỉ{" "}
                            <b>mang tính chất tham khảo</b>.
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  {skeleton ? (
                    <Skeleton.Button block={true} style={{ height: "59.19px" }} active size="large"></Skeleton.Button>
                  ) : (
                    <div className="address">
                      <div className="detail">
                        {" "}
                        <AddressIcon></AddressIcon>
                        <span className="text">
                          {post?.post?.post?.wardValueName}, {post?.post?.post?.districtValueName}, {post?.post?.post?.cityValueName}
                        </span>
                      </div>
                      <div className="timelapse">
                        <TimeIcon></TimeIcon>
                        <span className="text">{timeAgo(post?.post?.date)}</span>
                      </div>
                    </div>
                  )}
                </div>
                {skeleton ? (
                  <Skeleton.Button block={true} style={{ height: "179.69px" }} active size="large"></Skeleton.Button>
                ) : (
                  <div className="card-user">
                    <div className="info">
                      <Image
                        onClick={handleUser}
                        src={
                          post?.post?.userInfo?.avatar !== "images/empty-avatar.jpg"
                            ? post?.post?.userInfo?.avatar
                            : "/images/empty-avatar.jpg"
                        }
                        alt=""
                        preview={false}
                        width={32}
                        height={32}
                      ></Image>
                      <div className="right-info">
                        <span className="title" onClick={handleUser}>
                          {post?.post?.userInfo?.fullName}
                        </span>
                        <div className="title-bottom">
                          {/* <div className="rate">
                            <StarIcon></StarIcon>{" "}
                            <div className="flex">
                              <span className="star">5</span> <span className="count">(1)</span>
                            </div>
                          </div> */}
                          {/* <hr></hr> */}
                          <span className="selled">{post?.post?.userInfo?.selled} đã bán</span>
                          <hr></hr>
                          <span className="selling">{post?.post?.userInfo?.selling} đang bán</span>
                        </div>
                        <div className="title-bottom-2">
                          {/* <span className="online">Đang hoạt động</span> */}
                          {/* <hr></hr> */}
                          {/* <span className="response">Phản hồi: 78%</span> */}
                        </div>
                      </div>
                    </div>
                    {account?.user?._id === post?.post?.userId ? (
                      <div className="contact">
                        <Link href="/my-ads">
                          <CustomButtonGreen className="phone">
                            <HiddenEyeIcon></HiddenEyeIcon> Đã bán/ Ẩn tin
                          </CustomButtonGreen>
                        </Link>
                        <Link href={`/dang-tin?category=0&id=${post?.post?.postId}`}>
                          <CustomButtonGreen className="chat">
                            <Image
                              src="https://static.chotot.com/storage/chotot-icons/svg/edit-ad.svg"
                              alt=""
                              preview={false}
                              width={24}
                              height={24}
                            ></Image>
                            Sửa tin
                          </CustomButtonGreen>
                        </Link>
                      </div>
                    ) : (
                      <div className="contact">
                        <CustomButtonGreen className="phone" onClick={handleSwitchPhone}>
                          {hiddenPhone ? (
                            <>
                              {" "}
                              <PhoneIcon></PhoneIcon> Gọi điện
                            </>
                          ) : (
                            <b>{post?.post?.userInfo?.phone}</b>
                          )}
                        </CustomButtonGreen>
                        <CustomButtonGreen className="chat" onClick={handleChat}>
                          <ChatIcon></ChatIcon>
                          Chat
                        </CustomButtonGreen>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {post?.relatedPosts?.length > 0 ? (
              <>
                {skeleton ? (
                  <Skeleton.Button block={true} style={{ height: "386px" }} active size="large"></Skeleton.Button>
                ) : (
                  <div className="recommend" style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                    {" "}
                    <div className="top">
                      <span>Tin đăng tương tự</span>
                      <Link href={`/mua-ban-oto?city=${post?.post?.post?.cityValue}&district=${post?.post?.post?.districtValue}`}>
                        <div className="see-all">
                          Xem tất cả <Image src="/icons/right_arrow_blue.svg" alt="" preview={false} width={15} height={15}></Image>
                        </div>
                      </Link>
                    </div>
                    <div className="slide-rec">
                      <Slider {...settings}>
                        {post?.relatedPosts?.map((item: any, index: number) => {
                          return (
                            <div
                              className="rec-item"
                              style={{ width: 200 }}
                              key={index}
                              onClick={() => handleRouterRec(item?.post?.slug, item.postId)}
                            >
                              <div>
                                <Image src={item?.post?.image[0]?.img} alt="" preview={false} height={175} width={175}></Image>
                                <span className="title-rec">{limitTextTitle(item?.post?.title)}</span>
                                <div className="infor-rec">
                                  <span>
                                    {limitTextDescription(
                                      `${item?.post?.dateCar} - ${item?.post?.km === 0 ? "" : `${item?.post?.km} km -`} ${
                                        item?.post?.activeButton
                                      } - ${item?.post?.numberBox} `
                                    )}
                                  </span>
                                </div>
                                <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                              </div>
                              <div className="bottom-rec">
                                <Image src="/icons/pro.svg" alt="" width={16} height={15}></Image>
                                <div className="ellipsis">
                                  <div className="dot"></div>
                                  <span>{timeAgo(item.date)}</span>
                                  <div className="dot"></div>
                                  <span>{item?.post?.districtValueName}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </Slider>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
      <Spin spinning={spin} fullscreen={true}></Spin>{" "}
      <Alert message="Bạn cần phải đăng nhập để nhắn tin với người mua!" type="success" className={author ? "show-alert" : ""} />
    </div>
  );
};
export default ContainPD;
