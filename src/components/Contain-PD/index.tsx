import { Breadcrumb, Image, Skeleton } from "antd";
import {
  AddressIcon,
  ArrowSlideNextIcon,
  ArrowSlidePrevIcon,
  CarlendarIcon,
  ChatIcon,
  GiftIcon,
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

const ContainPD = () => {
  const [hiddenPhone, setHiddenPhone] = useState(true);
  const [lessDetail, setLessDetail] = useState(false);
  const [spin, setSpin] = useState(false);
  const { post, checkFavPost } = useSelector((state: RootState) => state.postsData);
  const { loading } = useSelector((state: RootState) => state.countDownLoading);

  const router = useRouter();
  useFetchPost({ setSpin, body: router });
  useFetchCheckFavPost({
    body: router,
  });
  const handleSwitchPhone = () => {
    setHiddenPhone((prev) => !prev);
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
  const handleRouterRec = (rec: any, postId: any) => {
    router.push(`/${rec}/${postId}`);
  };
  return (
    <div className="wrapper-contain">
      <Breadcrumb
        className="breadcrumb-PD"
        separator=">"
        items={[
          {
            title: "Chợ tốt xe",
          },
          {
            title: `Ô tô`,
          },
          {
            title: `Ô tô TP Hồ Chí Minh`,
          },
          {
            title: `Ô tô Quận 7`,
          },
          {
            title: `Honda CRV, bản 2.0 AT, Màu Bạc/Kem`,
          },
          //   cityName !== "" ? { title: cityName } : {},
          //   districtName !== "" ? { title: districtName } : {},
        ]}
      />
      <div className="main-contain">
        <div className="top-main">
          <div className="left-contain">
            <ProductSlide post={post} checkFavPost={checkFavPost}></ProductSlide>
            <div className="intro-desc">
              <span className="title">Mô tả chi tiết</span>
              {loading ? (
                <Skeleton.Input style={{ height: "92px" }} block={true} active size="large"></Skeleton.Input>
              ) : (
                <>
                  <span className="desc">{post?.post?.post?.introducing}</span>
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
                <div className="devide">
                  <div className="left">
                    <span>Số Km đã đi</span>
                    {!loading ? (
                      <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                    ) : (
                      <span>{post?.post?.post?.km}</span>
                    )}
                  </div>
                  <div className="right">
                    <span>Số đời chủ</span>{" "}
                    {loading ? (
                      <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                    ) : (
                      <span>{post?.post?.post?.owner}</span>
                    )}
                  </div>
                </div>
                <hr></hr>
                <div className="devide">
                  <div className="left">
                    <span>Loại biển số</span>
                    {loading ? (
                      <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                    ) : (
                      <span>{post?.post?.post?.carNumber}</span>
                    )}
                  </div>
                  <div className="right">
                    <span>Kèm phụ kiện</span>
                    {loading ? (
                      <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                    ) : (
                      <span>{post?.post?.post?.accessories}</span>
                    )}
                  </div>
                </div>{" "}
                <hr></hr>
                <div className="devide">
                  {" "}
                  <div className="left">
                    <span>Còn hạn đăng kiểm</span>
                    {loading ? (
                      <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                    ) : (
                      <span>{post?.post?.post?.registry}</span>
                    )}
                  </div>
                  <div className="right">
                    <span>Xuất xứ</span>
                    {loading ? (
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
                    {loading ? (
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
                      {!loading ? (
                        <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                      ) : (
                        <span>{post?.post?.post?.value}</span>
                      )}
                    </div>
                    <div className="right">
                      <span>Dòng xe</span>
                      {loading ? (
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
                      {loading ? (
                        <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                      ) : (
                        <span>{post?.post?.post?.dateCar}</span>
                      )}
                    </div>
                    <div className="right">
                      <span>Hộp số</span>
                      {loading ? (
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
                      {loading ? (
                        <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                      ) : (
                        <span>{post?.post?.post?.activeButton}</span>
                      )}
                    </div>
                    <div className="right">
                      <span>Kiểu dáng</span>
                      {loading ? (
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
                      {loading ? (
                        <Skeleton.Input style={{ height: "16px", width: "250px" }} block={true} active size="large"></Skeleton.Input>
                      ) : (
                        <span>{post?.post?.post?.sit}</span>
                      )}
                    </div>
                    <div className="right">
                      <span>Trọng lượng</span>
                      {loading ? (
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
                      {loading ? (
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
                <Image
                  src="https://static.chotot.com/storage/chotot-icons/png/veh_partnership_2x.png"
                  alt=""
                  preview={false}
                  width={150.9}
                ></Image>
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
              <h1 className="title">Honda CRV, bản 2.0 AT, Màu Bạc/Kem</h1>
              <div className="infor">
                <span>{post?.post?.post?.dateCar}</span>
                <hr />
                <span>{post?.post?.post?.km} km</span>
                <hr /> <span>{post?.post?.post?.activeButton}</span>
                <hr />
                <span>{post?.post?.post?.numberBox}</span>
              </div>
              <div className="price">
                <div className="top">
                  <span className="price-num">{formatNumberWithCommas(post?.post?.post?.price)} đ</span>
                  <span className="desc-price">(Trả góp từ 6.22 triệu/tháng)</span>
                </div>
                <div className="bottom">
                  <span className="title">Khoảng giá thị trường</span>

                  <span className="text">
                    {" "}
                    Giá được tổng hợp bởi&nbsp;<b>chototxe.com</b>&nbsp;trong 3 tháng gần nhất và chỉ <b>mang tính chất tham khảo</b>.
                  </span>
                </div>
              </div>
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
                  <span className="text">Đăng 7 phút trước</span>
                </div>
              </div>
            </div>
            <div className="card-user">
              <div className="info">
                <Image
                  src="https://xe.chotot.com/_next/image?url=https%3A%2F%2Fcdn.chotot.com%2Fuac2%2F23367792&w=1920&q=75"
                  alt=""
                  width={32}
                  height={32}
                ></Image>
                <div className="right-info">
                  <span className="title">{post?.post?.userInfo?.fullName}</span>
                  <div className="title-bottom">
                    <div className="rate">
                      <StarIcon></StarIcon>{" "}
                      <div className="flex">
                        <span className="star">5</span> <span className="count">(1)</span>
                      </div>
                    </div>
                    <hr></hr>
                    <span className="selled">{post?.post?.userInfo?.selled} đã bán</span>
                    <hr></hr>
                    <span className="selling">{post?.post?.userInfo?.selling} đang bán</span>
                  </div>
                  <div className="title-bottom-2">
                    <span className="online">Đang hoạt động</span>
                    <hr></hr>
                    <span className="response">Phản hồi: 78%</span>
                  </div>
                </div>
              </div>
              <div className="contact">
                <CustomButtonGreen className="phone">
                  <PhoneIcon></PhoneIcon> Gọi điện
                </CustomButtonGreen>
                <CustomButtonGreen className="chat">
                  <ChatIcon></ChatIcon>
                  Chat
                </CustomButtonGreen>
              </div>
            </div>
          </div>
        </div>
        <div className="recommend">
          {" "}
          <div className="top">
            <span>Tin đăng tương tự</span>
            <div className="see-all">
              Xem tất cả{" "}
              <Image
                src="https://static.chotot.com/storage/icons/svg/right_arrow_blue.svg"
                alt=""
                preview={false}
                width={15}
                height={15}
              ></Image>
            </div>
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
                            `${item?.post?.dateCar} - ${item?.post?.km} km - ${item?.post?.activeButton} - ${item?.post?.numberBox} `
                          )}
                        </span>
                      </div>
                      <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                    </div>
                    <div className="bottom-rec">
                      <Image src="https://static.chotot.com/storage/icons/owner/pro.svg" alt="" width={16} height={15}></Image>
                      <div className="ellipsis">
                        <div className="dot"></div>
                        <span>2 tuần trước</span> <div className="dot"></div>
                        <span>{item?.post?.districtValueName}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      {/* <Spin spinning={spin} fullscreen={true}></Spin> */}
    </div>
  );
};
export default ContainPD;
