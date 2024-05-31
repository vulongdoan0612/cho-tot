import CustomButton from "@/components/CustomButton";
import { AddedFavouritePostIcon } from "@/components/CustomIcons";
import { useFetchFavList } from "@/hooks/useFetchFavList";
import Page from "@/layout/Page";
import { fetchDataFavList } from "@/redux/reducers/posts";
import { AppDispatch, RootState } from "@/redux/store";
import { createConversation } from "@/services/chat";
import { removeFavPost } from "@/services/favPost";
import formatNumberWithCommas from "@/utils/formatMoneyWithDot";
import { Breadcrumb, Image } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cookie from "cookie";
import { getPostCheckList } from "@/services/formPost";
import { useFetchHistory } from "@/hooks/useFetchHistory";
import timeAgo from "@/utils/timeAgo";
import formatISOToCustomDate from "@/utils/convertDate";
import CustomButtonGreen from "@/components/CustomButton/green";

const History = () => {
  const { paymentHistory } = useSelector((state: RootState) => state.payment);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [favList, setFavList] = useState([]);

  useFetchHistory();

  const handleToggleFav = async (index: any, postId: string) => {
    const newFavList: any = [...favList];
    newFavList[index] = !newFavList[index];
    setFavList(newFavList);
    const token = localStorage.getItem("access_token");
    if (token) {
      const updateField = {
        postId: postId,
      };
      try {
        await removeFavPost(String(token), updateField);
      } finally {
        dispatch(fetchDataFavList());
      }
    }
  };

  const handleChat = async (item: any) => {
    const accessToken: any = localStorage.getItem("access_token");
    const data = {
      postId: item?.postId,
    };
    const res = await createConversation(accessToken, data);

    if (res.status === 200) {
      router.push(`/chat?currentRoom=${item?.postId}`);
    }
  };
  return (
    <Page style={{ backgroundColor: "#f4f4f4" }}>
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
          {paymentHistory?.payments?.length > 0 ? (
            <>
              {" "}
              {paymentHistory?.payments?.map((item: any, index: any) => {
                console.log(item);
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
                            <span>
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
                          <CustomButtonGreen style={{ background: "#12a154", color: "#fff", fontWeight: "600", borderColor: "#12a154" }}>
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
              <Link href="/my-ads">
                <CustomButton>Bắt đầu thực hiện giao dịch</CustomButton>
              </Link>
            </div>
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
