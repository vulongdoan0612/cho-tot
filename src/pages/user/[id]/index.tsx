import CustomButton from "@/components/CustomButton";
import { AddressIcon, CarlendarIcon, ChatIcon, NullContentIcon, ShareIcon, UserAvatarProfileIcon } from "@/components/CustomIcons";
import { useFetchDataUser } from "@/hooks/useFetchDataUser";
import Page from "@/layout/Page";
import { fetchDataUserProfile } from "@/redux/reducers/profileUser";
import { AppDispatch, RootState } from "@/redux/store";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { Alert, Breadcrumb, Image, InputNumberProps, Spin, Tabs, TabsProps } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";

const DetailUser = () => {
  const { lastJsonMessage }: any = useWebSocket("ws://localhost:8082");
  const router = useRouter();
  const { detailProfileUser } = useSelector((state: RootState) => state.detailProfileUser);
  const dispatch: AppDispatch = useDispatch();
  const { account } = useSelector((state: RootState) => state.auth);
  const [spin, setSpin] = useState(false);
  const [alertShare, setAlertShare] = useState(false);
  const [inputValue, setInputValue] = useState(1);

  useFetchDataUser({ body: router });

  useEffect(() => {
    if (lastJsonMessage && account?._id === lastJsonMessage?.userId) {
      setSpin(true);
      setTimeout(() => {
        setSpin(false);
      }, 500);
      if (lastJsonMessage.action === "refuse" && account?._id === lastJsonMessage?.userId) {
        dispatch(fetchDataUserProfile({ userId: router.query.id }));
      }
      if (lastJsonMessage.action === "delete" && account?._id === lastJsonMessage?.userId) {
        dispatch(fetchDataUserProfile({ userId: router.query.id }));
      }
      if (lastJsonMessage.action === "accept" && account?._id === lastJsonMessage?.userId) {
        dispatch(fetchDataUserProfile({ userId: router.query.id }));
      }
    }
  }, [lastJsonMessage]);

  const onChange: InputNumberProps["onChange"] = (newValue) => {
    setInputValue(15);
  };

  const handleShare = () => {
    setAlertShare(true);
    setTimeout(() => {
      setAlertShare(false);
    }, 2000);
  };

  const handleRouterPost = (slug: string, postId: string) => {
    router.push(`/${slug}/${postId}`);
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
                      <span className="title">{item?.post?.title}</span>
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
              <CustomButton>ĐĂNG TIN NGAY</CustomButton>
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
                      <span className="title">{item?.post?.title}</span>
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
              <CustomButton>ĐĂNG TIN NGAY</CustomButton>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
      <div className="wrapper-detail-user">
        <Breadcrumb
          className="breadcrumb-detail-user"
          separator=">"
          items={[
            {
              title: "Chợ tốt",
            },
            {
              title: `Trang cá nhân ${detailProfileUser?.user?.fullname}`,
            },
          ]}
        />
        <div className="contain-detail-user">
          <div className="left">
            <div className="avatar-top">
              <div className="background">
                <Image src="https://cdn.chotot.com/uac2/26802657_banner" width={302} height={125} alt="" preview={false}></Image>
                <div className="avatar">
                  {" "}
                  <Image
                    src="https://cdn.chotot.com/uac2/26802657"
                    width={92}
                    height={92}
                    preview={false}
                    alt=""
                    className="avatar"
                  ></Image>
                </div>
              </div>
            </div>
            <div className="info">
              <span className="username">{detailProfileUser?.user?.fullname}</span>
              <span className="rate">Chưa có đánh giá</span>
              <span>{detailProfileUser?.user?.introduction}</span>
              <CustomButton onClick={handleShare}>
                <ShareIcon></ShareIcon>Chia sẻ trang của bạn
              </CustomButton>{" "}
              <CustomButton className="edit">Chỉnh sửa trang cá nhân</CustomButton>
            </div>
            <div className="more-info">
              <div className="item-info">
                <ChatIcon></ChatIcon>
                <span>Phản hồi chat: Chưa có thông tin</span>
              </div>
              <div className="item-info">
                <CarlendarIcon></CarlendarIcon>
                <span>Đã tham gia: 1 tháng 13 ngày</span>
              </div>{" "}
              <div className="item-info">
                <AddressIcon></AddressIcon>
                <span>
                  Địa chỉ: {detailProfileUser?.user?.address?.district}, {detailProfileUser?.user?.address?.city}
                </span>
              </div>
            </div>
          </div>
          <div className="right">
            {" "}
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} className="tab-ads" />
          </div>
        </div>
      </div>
      <Spin spinning={spin} fullscreen />
      <Alert message="Đã sao chép liên kết đến trang cá nhân" type="success" className={alertShare ? "show-alert" : ""} />
    </Page>
  );
};
export default DetailUser;
