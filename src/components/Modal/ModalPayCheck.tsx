import { Image } from "antd";
import CustomModal from "../CustomModal";
import CustomButtonGreen from "../CustomButton/green";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { useEffect, useState } from "react";
import { getConfig, postPayment } from "@/services/payment";
import useDidMountEffect from "@/utils/customUseEffect";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";

const ModalPayCheck = ({ modal, handleCancleModal, price, setAlertAvatar, setSpin }: any) => {
  const { postService } = useSelector((state: RootState) => state.postsData);

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [sdkReady, setSdkReady] = useState(false);
  const addPayPalScript = async () => {
    const token = localStorage.getItem("access_token");
    const data = await getConfig(String(token));
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data?.data?.clientId}&currency=VND"`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  useDidMountEffect(() => {
    if (!window.paypal) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  const handleApprove = async (order: any) => {
    handleCancleModal();
    const token = localStorage.getItem("access_token");
    const data = {
      postId: postService?.post?.postId,
      amount: order?.purchase_units[0]?.amount?.value,
      time: order?.create_time,
      idCheck: order.id,
    };
    const res = await postPayment(String(token), data);
    console.log(res);
    if (res?.data?.status === "SUCCESS") {
      setPaidFor(true);
    }
  };
  if (paidFor) {
    setAlertAvatar("Chúc mừng bạn đã thanh toán dịch vụ chúng tôi thành công !");
    setTimeout(() => {
      setAlertAvatar("");
      setTimeout(() => {
        setSpin(false);
        router.push("/my-ads");
      }, 1000);
    }, 3000);
    setSpin(true);
  }
  if (error !== null) {
    setAlertAvatar(error);
    setTimeout(() => {
      setAlertAvatar("");
    }, 3000);
  }
  return (
    <CustomModal
      title="Xác nhận đơn hàng"
      open={modal}
      onCancel={handleCancleModal}
      style={{ textAlign: "center", color: "white" }}
      centered
      className="modal-paycheck"
    >
      <div className="carInfo">
        <Image src={postService?.post?.post?.image[0].img} alt="" preview={false} width={88} height={88}></Image>
        <div className="info-car">
          <span className="name">{postService?.post?.post?.title}</span>
          <span className="price">{formatNumberWithCommas(postService?.post?.post?.price)} đ</span>
        </div>
      </div>
      <hr></hr>
      <div className="wrapper-service-info-paycheck">
        <div className="service">
          <div className="left">
            <Image
              src="https://static.chotot.com/storage/default_images/pty/pos/pos-icon-bump2.png"
              alt=""
              width={20}
              height={20}
              preview={false}
            ></Image>
            <div className="service-info">
              <span className="title">Đẩy tin thường</span>
              <ul className="list-info">
                <li>Dự kiến bắt đầu ngày 22/05/2024 lặp lại trong vòng 7 ngày</li>
                <li>Đẩy tin lên trang đầu ngay sau khi thanh toán</li>
              </ul>
              <div className="price">{price === 1 ? "675.000" : price === 2 ? "375.000" : price === 3 ? "400.000" : "0"} đ</div>
            </div>
          </div>
          {/* <div className="right">
            <span>
              <Image
                src="https://static.chotot.com.vn/storage/default_images/project/pty/trash.svg"
                width={24}
                height={24}
                alt=""
                preview={false}
              ></Image>
            </span>
          </div> */}
        </div>
      </div>
      <div className="help">Đối với tin đăng thuộc Gói Pro không được duyệt, Chợ Tốt hoàn trả tin đăng vào Gói Pro của khách hàng.</div>
      <div className="checkout">
        <div className="total">
          <span>TỔNG TIỀN</span>
          <b>{price === 1 ? "675.000" : price === 2 ? "375.000" : price === 3 ? "400.000" : "0"} đ</b>
        </div>
        {sdkReady && (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: "Test",
                    amount: {
                      value: price === 1 ? "26.51" : price === 2 ? "14.73" : price === 3 ? "15.71" : "0",
                      currency_code: "USD",
                    },
                  },
                ],
                intent: "CAPTURE",
              });
            }}
            onClick={(data, actions) => {
              const hasAlreadyBoughtCourse = false;
              if (hasAlreadyBoughtCourse) {
                return actions.reject();
              } else {
                return actions.resolve();
              }
            }}
            onApprove={async (data, actions) => {
              const order = await actions.order?.capture();
              handleApprove(order);
            }}
            onError={(err: any) => {
              setError(err);
            }}
            onCancel={() => console.log("Cancle")}
          />
        )}
        {/* <CustomButtonGreen>Thanh toán</CustomButtonGreen> */}
      </div>
    </CustomModal>
  );
};
export default ModalPayCheck;
