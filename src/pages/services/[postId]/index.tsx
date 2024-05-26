import CustomButtonGreen from "@/components/CustomButton/green";
import { LetterIIcon } from "@/components/CustomIcons";
import ModalPayCheck from "@/components/Modal/ModalPayCheck";
import { useFetchPost } from "@/hooks/useFetchPost";
import { useFetchPostService } from "@/hooks/useFetchPostService";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { Alert, Checkbox, CheckboxProps, Image, Spin } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cookie from "cookie";
import NotFound from "@/components/404";
import Link from "next/link";

const ServicesPost = () => {
  const { postService } = useSelector((state: RootState) => state.postsData);
  const { account } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const [selectedCheckbox, setSelectedCheckbox] = useState(1);
  const [modal, setModal] = useState(false);
  const [alertAvatar, setAlertAvatar] = useState("");
  const [spin, setSpin] = useState(false);

  useFetchPostService({ body: router });

  // Hàm để xử lý khi hộp kiểm được thay đổi
  const onChangeCheckBox = (index: number) => {
    if (selectedCheckbox === index) {
      // Nếu hộp kiểm đã được chọn, bỏ chọn nó
      setSelectedCheckbox(0);
    } else {
      // Chọn hộp kiểm mới
      setSelectedCheckbox(index);
    }
  };
  const handlePaycheck = () => {
    if (selectedCheckbox !== 0) {
      setModal(true);
    }
  };
  const handleCancleModal = () => {
    setModal(false);
  };
  return (
    <Page style={{ backgroundColor: "#f4f4f4", position: "relative" }}>
      {postService?.post?.userId !== account?.user?._id ? (
        <NotFound></NotFound>
      ) : (
        <>
          <div className="services-wrapper">
            <div className="car">
              <span className="title">Dịch vụ bán nhanh hơn</span>
              <div className="right-car">
                <Image src={postService?.post?.post?.image[0].img} alt="" preview={false} width={88} height={88}></Image>
                <div className="info-car">
                  <span className="name">{postService?.post?.post?.title}</span>
                  <span className="price">{formatNumberWithCommas(postService?.post?.post?.price)} đ</span>
                </div>
              </div>
            </div>
            <div className="combo">
              <span className="title">Combo ưu đãi</span>
              <span className="desc">Đa dạng mốc thời gian và loại hình sử dụng, giúp bạn tìm ra lựa chọn phù hợp</span>
              <div className="item-combo">
                <Checkbox checked={selectedCheckbox === 1} onChange={() => onChangeCheckBox(1)}></Checkbox>
                <div className="flag">
                  <span className="content">Combo bán nhanh</span>
                  <div className="flag-small"></div>
                </div>
                <Image
                  src="https://static.chotot.com/storage/default_images/pty/pos/pos-3.png"
                  alt=""
                  className="image-combo"
                  width={72}
                  height={72}
                  preview={false}
                ></Image>
                <div className="right-info">
                  <span className="top">Tin nổi bật + Đẩy tin</span>
                  <span className="middle">Bao gồm Tin nổi bật - Nhiều hình ảnh và Đẩy tin tự động mỗi ngày</span>
                  <div className="bottom">
                    <span>675.000 đ</span>
                  </div>
                </div>
              </div>
              {postService?.post?.post?.image?.length < 5 ? (
                <span className="warn-pay">
                  Vui lòng chỉnh sửa bài viết trên 4 tấm ảnh xe để sử dụng dịch vụ này.{" "}
                  <Link href={`/dang-tin?category=0&id=${postService?.post?.postId}`}>Tới trang sửa bài viết</Link>
                </span>
              ) : (
                <></>
              )}
            </div>{" "}
            <div className="combo-cheap">
              <div className="combo position">
                <span className="title">Đẩy tin</span>
                <span className="desc">Đẩy tin đăng lên đầu trang tìm kiếm như một tin mới để tăng khả năng tiếp cận</span>
                <div className="item-combo">
                  <Checkbox checked={selectedCheckbox === 2} onChange={() => onChangeCheckBox(2)}></Checkbox>

                  <Image
                    src="https://static.chotot.com/storage/default_images/pty/pos/pos-3.png"
                    alt=""
                    className="image-combo"
                    width={72}
                    height={72}
                    preview={false}
                  ></Image>
                  <div className="right-info">
                    <span className="top">Đẩy tin thường</span>
                    <span className="middle">Đẩy tin ngay 1 lần hoặc lặp lại mỗi ngày, bắt đầu từ thời điểm thanh toán</span>
                    <div className="bottom">
                      <span>375.000 đ</span>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="combo position">
                <span className="title">Nâng cấp giao diện tin đăng</span>
                <span className="desc">Tăng kích thước hiển thị tin đăng, nổi bật hơn để thu hút khách hàng click xem tin</span>
                <div className="item-combo">
                  <Checkbox checked={selectedCheckbox === 3} onChange={() => onChangeCheckBox(3)}></Checkbox>

                  <Image
                    src="https://static.chotot.com/storage/default_images/pty/pos/pos-3.png"
                    alt=""
                    className="image-combo"
                    width={72}
                    height={72}
                    preview={false}
                  ></Image>
                  <div className="right-info">
                    <span className="top">Tin nổi bật - Nhiều hình ảnh</span>
                    <span className="middle">Gấp đôi kích thước hiển thị, tăng tỉ lệ khách hàng liên hệ</span>
                    <div className="bottom">
                      <span>400.000 đ</span>
                    </div>
                  </div>
                </div>
                {postService?.post?.post?.image?.length < 5 ? (
                  <span className="warn-pay">
                    Vui lòng chỉnh sửa bài viết trên 4 tấm ảnh xe để sử dụng dịch vụ này.{" "}
                    <Link href={`/dang-tin?category=0&id=${postService?.post?.postId}`}>Tới trang sửa bài viết</Link>
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="checkount-number">
            <div className="checkount">
              <div className="left">
                <span>Tổng tiền</span>
                <b>
                  {selectedCheckbox === 1
                    ? "675.000 đ"
                    : selectedCheckbox === 2
                    ? "375.000 đ"
                    : selectedCheckbox === 3
                    ? "400.000 đ"
                    : "0 đ"}
                </b>
              </div>
              <CustomButtonGreen
                className={`${selectedCheckbox === 0 || postService?.post?.post?.image?.length < 5 ? "disable-custom-green" : ""}`}
                onClick={handlePaycheck}
              >
                Thanh toán
              </CustomButtonGreen>
            </div>
          </div>
          <ModalPayCheck
            modal={modal}
            handleCancleModal={handleCancleModal}
            price={selectedCheckbox}
            setAlertAvatar={setAlertAvatar}
            setSpin={setSpin}
          ></ModalPayCheck>{" "}
          <Alert message={alertAvatar} type="success" style={{ bottom: "unset" }} className={alertAvatar !== "" ? "show-alert" : ""} />
          <Spin fullscreen spinning={spin}></Spin>
        </>
      )}
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

  // Lấy dữ liệu từ máy chủ dựa trên token hoặc các thông tin khác nếu cần
  // Ví dụ:
  // const data = await fetchDataFromServer(token);

  return {
    props: {
      // Truyền dữ liệu cần thiết xuống component
      // Ví dụ:
      // data: data
    },
  };
};
export default ServicesPost;
