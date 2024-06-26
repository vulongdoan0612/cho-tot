import CustomButton from "@/components/CustomButton";
import {
  AddressIcon,
  CameraIcon,
  CarlendarIcon,
  ChatIcon,
  NullContent2Icon,
  NullContentIcon,
  PlusUserIcon,
  ShareIcon,
  UserAvatarProfileIcon,
} from "@/components/CustomIcons";
import { useFetchDataUser } from "@/hooks/useFetchDataUser";
import Page from "@/layout/Page";
import { fetchDataUserProfile } from "@/redux/reducers/profileUser";
import { AppDispatch, RootState } from "@/redux/store";
import { updateAvatar, updateBanner } from "@/services/user";
import formatISOToCustomDate from "@/utils/convertDate";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { limitTextDescription, limitTextTitle } from "@/utils/limitText";
import timeAgo from "@/utils/timeAgo";
import type { RcFile, UploadProps } from "antd/es/upload/interface";
import { Alert, Breadcrumb, Image, Skeleton, Spin, Tabs, TabsProps, Upload } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import { fetchDataUser } from "@/redux/reducers/auth";
import Link from "next/link";

const DetailUser = () => {
  const { lastJsonMessage }: any = useWebSocket("wss://cho-tot-be.onrender.com:443");
  const router = useRouter();
  const { detailProfileUser } = useSelector((state: RootState) => state.detailProfileUser);
  const dispatch: AppDispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.auth);
  const [spin, setSpin] = useState(true);
  const [alertShare, setAlertShare] = useState(false);
  const [alertAvatar, setAlertAvatar] = useState(false);
  const [alertAvatar2, setAlertAvatar2] = useState(false);
  const [alertAvatar4, setAlertAvatar4] = useState(false);
  const [developing, setDeveloping] = useState(false);
  const [spinFull, setSpinFull] = useState<any>(false);

  useFetchDataUser({ body: router, setSpin, setSpinFull });

  useEffect(() => {
    setSpinFull(true);
    setSpin(true);
    if (lastJsonMessage && account?.user?._id === lastJsonMessage?.userId) {
      if (lastJsonMessage.action === "refuse" && account?.user?._id === lastJsonMessage?.userId) {
        dispatch(fetchDataUserProfile({ userId: router.query.id, setSpin, setSpinFull }));
      }
      if (lastJsonMessage.action === "delete" && account?.user?._id === lastJsonMessage?.userId) {
        dispatch(fetchDataUserProfile({ userId: router.query.id, setSpin, setSpinFull }));
      }
      if (lastJsonMessage.action === "accept" && account?.user?._id === lastJsonMessage?.userId) {
        dispatch(fetchDataUserProfile({ userId: router.query.id, setSpin, setSpinFull }));
      }
    }
  }, [lastJsonMessage]);

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000${router.asPath}`);
    setAlertShare(true);
    setTimeout(() => {
      setAlertShare(false);
    }, 2000);
  };

  const handleRouterPost = (slug: string, postId: string) => {
    router.push(`/${slug}/${postId}`);
  };

  const handleChange: UploadProps["onChange"] = async (info) => {
    setSpinFull(true);
    setAlertAvatar(true);
    setTimeout(() => {
      setAlertAvatar(false);
    }, 3000);
    const token = localStorage.getItem("access_token");
    const response = await updateAvatar(String(token), { avatar: info.file.originFileObj as RcFile });
    if (response?.data?.status === "SUCCESS") {
      dispatch(fetchDataUserProfile({ userId: router.query.id, setSpin, setSpinFull }));
      dispatch(fetchDataUser({ setSke: setSpin }));
    }
  };
  const handleChangeBanner: UploadProps["onChange"] = async (info) => {
    setSpinFull(true);
    setAlertAvatar(true);
    setTimeout(() => {
      setAlertAvatar(false);
    }, 3000);
    const token = localStorage.getItem("access_token");
    const response = await updateBanner(String(token), { banner: info.file.originFileObj as RcFile });
    if (response?.data?.status === "SUCCESS") {
      dispatch(fetchDataUserProfile({ userId: router.query.id, setSpin, setSpinFull }));
      dispatch(fetchDataUser({ setSke: setSpin }));
    }
  };
  const beforeUpload = (file: any) => {
    const isPNG = file.type === "image/png";
    const isJPGE = file.type === "image/jpeg";
    const isGIF = file.type === "image/gif";
    const isJPG = file.type === "image/jpg";
    const isWEBP = file.type === "image/webp";

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      setAlertAvatar4(true);
      setTimeout(() => {
        setAlertAvatar4(false);
      }, 3000);
      return Upload.LIST_IGNORE;
    }

    if (!isGIF && !isJPGE && !isPNG && !isJPG && !isWEBP) {
      setAlertAvatar2(true);
      setTimeout(() => {
        setAlertAvatar2(false);
      }, 3000);
    }
    return isPNG || isJPGE || isGIF || isJPG || isWEBP || Upload.LIST_IGNORE;
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Đang hiển thị",
      children: (
        <>
          {detailProfileUser?.acceptedPosts?.length > 0 ? (
            <div className="tab-on-view">
              {" "}
              {detailProfileUser?.acceptedPosts?.map((item: any, index: number) => {
                return (
                  <div key={index} className="tab-item" onClick={() => handleRouterPost(item?.post?.slug, item?.postId)}>
                    <div className="picture">
                      <Image src={item?.post?.image[0]?.img} alt="" width={183} height={183} preview={false}></Image>
                    </div>{" "}
                    <div className="bottom">
                      <span className="title">{limitTextTitle(item?.post?.title)}</span>{" "}
                      <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                      <div className="info">
                        <UserAvatarProfileIcon></UserAvatarProfileIcon> <span>·</span> <span>{timeAgo(item.date)}</span>·
                        <span>{item?.post?.cityValueName}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="null-content">
              {account?.user?._id === router?.query?.id ? (
                <>
                  <NullContentIcon></NullContentIcon>
                  <h5>Bạn chưa có tin đăng nào</h5>
                  <Link href="/dang-tin">
                    <CustomButton>ĐĂNG TIN NGAY</CustomButton>
                  </Link>
                </>
              ) : (
                <>
                  <NullContent2Icon></NullContent2Icon>
                  <h5>Bạn chưa có tin đăng nào</h5>
                  <Link href="/dang-tin">
                    <CustomButton>ĐĂNG TIN NGAY</CustomButton>
                  </Link>
                </>
              )}
            </div>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Đã bán",
      children: (
        <>
          {detailProfileUser?.hiddenPost?.length > 0 ? (
            <div className="tab-on-view">
              {detailProfileUser?.hiddenPost?.map((item: any, index: number) => {
                return (
                  <div key={index} className="tab-item">
                    <div className="picture">
                      <Image src={item?.post?.image[0]?.img} alt="" width={183} height={183} preview={false}></Image>
                    </div>{" "}
                    <div className="bottom">
                      <span className="title">{limitTextDescription(item?.post?.title)}</span>
                      <span className="price">{formatNumberWithCommas(item?.post?.price)} đ</span>
                      <div className="info">
                        <UserAvatarProfileIcon></UserAvatarProfileIcon> <span>·</span> <span>1 tháng trước</span>·
                        <span>Tp Hồ Chí Minh</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="null-content">
              <NullContentIcon></NullContentIcon>
              <h5>Bạn chưa có tin đăng nào</h5>
              <Link href="/dang-tin">
                <CustomButton>ĐĂNG TIN NGAY</CustomButton>
              </Link>
            </div>
          )}
        </>
      ),
    },
  ];
  const handleFollow = () => {
    setDeveloping(true);
    setTimeout(() => {
      setDeveloping(false);
    }, 2000);
  };
  const handleRouterChat = (pathname: string) => {
    if (router?.pathname !== pathname) {
      setSpinFull(true);
    }
    router.push(pathname);
  };
  return (
    <Page
      style={{ backgroundColor: "#f4f4f4" }}
      title="Chợ Tốt Xe Official Mall - Chợ Tốt - Website Mua Bán, Rao Vặt Trực Tuyến Hàng Đầu Của Người Việt"
    >
      <div className="wrapper-detail-user">
        <Breadcrumb
          className="breadcrumb-detail-user"
          separator=">"
          items={[
            {
              title: "Chợ tốt",
              onClick: () => {
                router.push(`/`);
              },
            },
            {
              title: `Trang cá nhân ${detailProfileUser?.user?.fullname !== undefined ? detailProfileUser?.user?.fullname : "..."}`,
              onClick: () => {
                router.push(`/user/${router.query.id}`);
              },
            },
          ]}
        />
        <div className="contain-detail-user">
          <div className="left">
            <div className="avatar-top">
              {spin ? (
                <Skeleton.Button block={true} style={{ height: "125px" }} active size="large"></Skeleton.Button>
              ) : (
                <div className="background">
                  <div className="content-banner">
                    {" "}
                    {detailProfileUser?.user?.banner === null ? (
                      <div className="null-banner"></div>
                    ) : (
                      <Image src={detailProfileUser?.user?.banner} width={302} height={125} alt="" preview={false}></Image>
                    )}
                    {account?.user?._id === router?.query?.id ? (
                      <Upload showUploadList={false} onChange={handleChangeBanner} beforeUpload={beforeUpload}>
                        <span className="camera">
                          <CameraIcon></CameraIcon>
                        </span>
                      </Upload>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="avatar">
                    {" "}
                    <div className="content-avatar">
                      <Image
                        src={detailProfileUser?.user?.avatar === null ? "/images/empty-avatar.jpg" : detailProfileUser?.user?.avatar}
                        width={92}
                        height={92}
                        preview={false}
                        alt=""
                      ></Image>
                      {account?.user?._id === router?.query?.id ? (
                        <Upload name="avatar" onChange={handleChange} fileList={[]} listType="picture" beforeUpload={beforeUpload}>
                          <span className="camera">
                            <CameraIcon></CameraIcon>
                          </span>
                        </Upload>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="info">
              {spin ? (
                <Skeleton.Button block={true} style={{ height: "20.69px" }} active size="large"></Skeleton.Button>
              ) : (
                <span className="username">{detailProfileUser?.user?.fullname}</span>
              )}
              {spin ? (
                <Skeleton.Button
                  block={true}
                  style={{ height: `${account?.user?._id === router?.query?.id ? "76px" : "34.5px"}` }}
                  active
                  size="large"
                ></Skeleton.Button>
              ) : (
                <>
                  <span dangerouslySetInnerHTML={{ __html: detailProfileUser?.user?.introduction }}></span>
                  {account?.user?._id === router?.query?.id ? (
                    <>
                      {" "}
                      <CustomButton onClick={handleShare}>
                        <ShareIcon></ShareIcon>Chia sẻ trang của bạn
                      </CustomButton>{" "}
                      <CustomButton
                        className="edit"
                        onClick={() => handleRouterChat("/user/settings/profile")}
                        style={{ cursor: "pointer" }}
                      >
                        Chỉnh sửa trang cá nhân
                      </CustomButton>
                    </>
                  ) : (
                    <>
                      <CustomButton onClick={handleFollow}>
                        <PlusUserIcon></PlusUserIcon>Theo dõi
                      </CustomButton>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="more-info">
              <div className="item-info">
                <ChatIcon></ChatIcon>
                <span>Phản hồi chat: Chưa có thông tin</span>
              </div>
              <div className="item-info">
                <CarlendarIcon></CarlendarIcon>
                <span style={{ display: "flex", textWrap: "nowrap", gap: "4px" }}>
                  Đã tham gia:
                  {spin ? (
                    <Skeleton.Button style={{ height: "16.09px", width: "160px" }} block={true} active size="large"></Skeleton.Button>
                  ) : (
                    <>&nbsp;{formatISOToCustomDate(detailProfileUser?.user?.dateJoin)}</>
                  )}
                </span>
              </div>{" "}
              {detailProfileUser?.user?.address?.district !== undefined && detailProfileUser?.user?.address?.city !== undefined ? (
                <div className="item-info">
                  <AddressIcon></AddressIcon>
                  <div style={{ display: "flex", textWrap: "nowrap", gap: "4px" }}>
                    Địa chỉ:
                    {spin ? (
                      <Skeleton.Button style={{ height: "16.09px", width: "160px" }} block={true} active size="large"></Skeleton.Button>
                    ) : (
                      <>
                        &nbsp;
                        {limitTextDescription(`${detailProfileUser?.user?.address?.district},${detailProfileUser?.user?.address?.city}`)}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {spin ? (
            <Spin spinning={spin}></Spin>
          ) : (
            <div className="right">
              {" "}
              <Tabs defaultActiveKey="1" items={items} className="tab-ads" />
            </div>
          )}
        </div>
      </div>
      <Spin spinning={spinFull} fullscreen></Spin>
      <Alert message="Đã sao chép liên kết đến trang cá nhân" type="success" className={alertShare ? "show-alert" : ""} />
      <Alert message="Tính năng đang phát triển" type="success" className={developing ? "show-alert" : ""} />{" "}
      <Alert message="Bạn chỉ có thể tải lên tệp PNG, JPEG, hoặc GIF!" type="success" className={alertAvatar2 ? "show-alert" : ""} />
      <Alert message="Ảnh của bạn sẽ được cập nhật trong vài phút." type="success" className={alertAvatar ? "show-alert" : ""} />{" "}
      <Alert message="Hình ảnh phải nhỏ hơn 2MB!" type="success" className={alertAvatar4 ? "show-alert" : ""} />
    </Page>
  );
};
export default DetailUser;
