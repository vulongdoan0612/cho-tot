import CustomButton from "@/components/CustomButton";
import Page from "@/layout/Page";
import { RootState } from "@/redux/store";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { Breadcrumb, Image, Skeleton } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import cookie from "cookie";
import { useFetchHistory } from "@/hooks/useFetchHistory";
import timeAgo from "@/utils/timeAgo";
import formatISOToCustomDate from "@/utils/convertDate";
import CustomButtonGreen from "@/components/CustomButton/green";
import { useState } from "react";

const History = () => {
  const { paymentHistory } = useSelector((state: RootState) => state.payment);
  const router = useRouter();
  const [ske, setSke] = useState(true);

  useFetchHistory({ setSke });

  return (
    <Page style={{ backgroundColor: "#f4f4f4" }} title="Chợ Tốt - Lịch sử giao dịch">
      <div className="fav-wrapper">
        <Breadcrumb
          className="breadcrumb-fav"
          separator=">"
          items={[
            {
              title: "Chợ tốt",
              onClick: () => {
                router.push(`/`);
              },
            },
            {
              title: `Lịch sử giao dịch`,
              onClick: () => {
                router.push(`/history`);
              },
            },
          ]}
        />
        <div className="count">Lịch sử giao dịch</div>
        <div className="fav-list">
          {ske ? (
            <Skeleton.Input active style={{ width: "970px", height: "475px" }}></Skeleton.Input>
          ) : (
            <>
              {paymentHistory?.payments?.length > 0 ? (
                <>
                  {" "}
                  {paymentHistory?.payments?.map((item: any, index: any) => {
                    return (
                      <div className="fav-item" key={index}>
                        <Link href={`/${item?.formPostCheck?.post?.slug}/${item?.postId}`}>
                          <div className="fav-left">
                            <Image src={item?.formPostCheck?.post?.image[0]?.img} alt="" preview={false} width={100} height={100}></Image>
                          </div>
                        </Link>
                        <div className="fav-right">
                          <Link href={`/${item?.formPostCheck?.post?.slug}/${item?.formPostCheck?.postId}`}>
                            <div className="top">
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div className="title">{item?.formPostCheck?.post?.title}</div>
                                <span style={{ textAlign: "right" }}>
                                  Ngày thanh toán: <b>{formatISOToCustomDate(item?.time)}</b>
                                </span>
                              </div>
                              <div className="info">
                                {" "}
                                {item?.formPostCheck?.post?.dateCar} -
                                {item?.formPostCheck?.post?.status !== "Mới"
                                  ? `${
                                      item?.formPostCheck?.post?.km !== 0
                                        ? ` ${formatNumberWithCommas(item?.formPostCheck?.post?.km)} km -`
                                        : ""
                                    }`
                                  : ""}{" "}
                                {item?.formPostCheck?.post?.activeButton} - {item?.formPostCheck?.post?.numberBox}
                              </div>
                              <div className="price">{formatNumberWithCommas(item?.formPostCheck?.post?.price)} đ</div>
                            </div>
                          </Link>
                          <div className="bottom">
                            <div className="address">
                              {item?.formPostCheck?.userInfo?.fullName} - {timeAgo(item?.formPostCheck?.date)} -{" "}
                              {item?.formPostCheck?.post?.districtValueName}
                            </div>
                            <div className="chat">
                              <CustomButtonGreen
                                style={{ background: "#12a154", color: "#fff", fontWeight: "600", borderColor: "#12a154" }}
                              >
                                {item?.amount === "14.73" ? "375.000" : item?.amount === "15.71" ? "400.000" : "675.000"} đ
                              </CustomButtonGreen>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="null-fav-list">
                  <span className="top">Bạn chưa thực hiện giao dịch nào!</span>
                  <Link href="/my-ads" prefetch={false}>
                    <CustomButton>Bắt đầu thực hiện giao dịch</CustomButton>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
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
export default History;
