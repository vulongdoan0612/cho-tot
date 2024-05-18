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

const FavPage = () => {
  const router = useRouter();
  const { favPostList } = useSelector((state: RootState) => state.postsData);
  const dispatch: AppDispatch = useDispatch();
  const [favList, setFavList] = useState([]);
  useFetchFavList();

  useEffect(() => {
    if (favPostList && favPostList.favouritePosts) {
      const initialFavList = favPostList.favouritePosts.map(() => true);
      setFavList(initialFavList);
    }
  }, [favPostList]);

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
    console.log(item);
    const data = {
      postId: item?.postId,
    };
    const res = await createConversation(accessToken, data);

    if (res.status === 200) {
      router.push(`/chat`);
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
            },
            {
              title: `Tin đăng đã lưu`,
            },
          ]}
        />
        <div className="count">
          Tin đăng đã lưu ({favPostList?.favouritePosts?.length === undefined ? "0" : favPostList?.favouritePosts?.length} / 100)
        </div>
        <div className="fav-list">
          {favPostList?.favouritePosts?.length === undefined ? (
            <div className="null-fav-list">
              <span className="top">Bạn chưa lưu tin đăng nào!</span>
              <span className="mid">
                Hãy bấm nút &nbsp;
                <Image src="/icons/save-ad.svg" alt="" height={22} width={22}></Image>&nbsp; ở tin đăng để lưu và xem lại sau.
              </span>
              <a href="/mua-ban-oto">
                <CustomButton>Bắt đầu tìm kiếm</CustomButton>
              </a>
            </div>
          ) : (
            <>
              {" "}
              {favPostList?.favouritePosts?.map((item: any, index: any) => {
                return (
                  <div className="fav-item" key={index}>
                    <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                      <div className="fav-left">
                        <Image src={item?.post?.image[0]?.img} alt="" preview={false} width={100} height={100}></Image>
                      </div>
                    </Link>
                    <div className="fav-right">
                      <Link href={`/${item?.post?.slug}/${item?.postId}`}>
                        <div className="top">
                          <div className="title">{item?.post?.title}</div>
                          <div className="info">
                            {" "}
                            {item?.post?.dateCar} - {item?.post?.km} km - {item?.post?.activeButton} - {item?.post?.numberBox}
                          </div>
                          <div className="price">{formatNumberWithCommas(item?.post?.price)} đ</div>
                        </div>
                      </Link>
                      <div className="bottom">
                        <div className="address">
                          {item?.userInfo?.fullName} 1 giờ trước {item?.post?.districtValueName}
                        </div>
                        <div className="chat">
                          <button onClick={() => handleChat(item)}>
                            <Image src="/images/chat.png" alt="" preview={false} width={20} height={20}></Image>
                            Chat
                          </button>{" "}
                          <div className="add-fav">
                            <AddedFavouritePostIcon onClick={() => handleToggleFav(index, item.postId)} className="fav" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </Page>
  );
};
export default FavPage;
